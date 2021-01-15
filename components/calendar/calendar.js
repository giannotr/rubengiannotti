import { useRef, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TypeInsurance from 'type-insurance';
import mod from '../../utility/mod';
import getClassNames from '../../utility/get-class-names';
import { useSwipeable } from 'react-swipeable';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import ErrorDisplay from '../error-display/error-display';
import SubmitFeedback from '../submit-feedback/submit-feedback';
import { SubmitButtonWithCaptcha } from '../buttons/buttons';
import Loader from '../loader/loader';
import Triangle from '../../assets/icons/triangle.svg';
import Arrow from '../../assets/icons/arrow.svg';
import styles from './calendar.module.scss';

const transitionDuration = parseInt(styles.transitionDuration, 10);

const RECAPTCHA_PUBLIC = process.env.RECAPTCHA_PUBLIC;
const VERIFY_CAPTCHA_ENDPOINT = process.env.VERIFY_CAPTCHA_ENDPOINT;
const MAILING_ENDPOINT = process.env.MAILING_ENDPOINT;

const MAX_LOOKAHEAD = 28927182167;// in ms = 11 months

const weekDayShorthands = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

const getMonthVerbose = month => {
	const { number } = new TypeInsurance(month);

	switch(number) {
		case 0:
			return 'Januar';
		case 1:
			return 'Februar';
		case 2:
			return 'März';
		case 3:
			return 'April';
		case 4:
			return 'Mai';
		case 5:
			return 'Juni';
		case 6:
			return 'Juli';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'Oktober';
		case 10:
			return 'November';
		case 11:
			return 'Dezember';
		default:
			throw new Error('The month hast to be a number between 1 and 12');
	}
}

const firstDayOfTheMonth = (month, year) => {
	const date = new Date(year, month, 1);
	return date.toLocaleDateString('en-GB', { weekday: 'long' });
}

const getMonthOffset = (month, year) => {
	switch(firstDayOfTheMonth(month, year)) {
		case 'Monday':
			return 0;
		case 'Tuesday':
			return 1;
		case 'Wednesday':
			return 2;
		case 'Thursday':
			return 3;
		case 'Friday':
			return 4;
		case 'Saturday':
			return 5;
		case 'Sunday':
			return 6;
		default:
			return 0;
	}
}

const getMonthDaysAmount = (month, year) => {
	return month === 1 ? year % 4 !== 0 ? 28 : 29 : month < 7 ? month % 2 !== 0 ? 30 : 31 : month % 2 !== 0 ? 31 : 30;
}

/*
const getMonthDaysAmount = (month, year) => {
	return month === 1
		? year % 4 !== 0
			? 28
			: 29
		: month < 6
			? month % 2 === 0
				? 30
				: 31
			: month % 2 === 0
				? 31
				: 30;
}
*/

const dateFormat = (year, month, day) => {
	return `${day}. ${getMonthVerbose(month)} ${year}`;
}

/*
function withBypass(condition, fn) {
	if(condition) return null;
	fn();
}

function withTransition(duration, setter, fn) {
	setter(true);
	setTimeout(() => {
		fn();
		setter(false);
	}, duration);
}
*/

const inputSchema = Yup.object().shape({
	email: Yup.string().email('Ungültige E-Mail-Adresse').required('Erforderlich'),
	selectedTime: Yup.string(),
});

const initialValues = {
	selectedTime: '',
	email: '',
}

const postConfigGCP = {
	headers: {
		'Content-Type': 'application/json',
	}
}

// https://dev.to/max_frolov_/react-hooks-usereducer-complex-state-handling-243k

/*
const initialState = {
	transitioning: false,
	timesExpanded: false,
	timeSelected: false,
	captchaVerified: false,
	submitSuccess: false,
	currentIdx: -1,
	scheduleData: [],
	calendarData: {
		month: -1,
		year: -1,
		day: -1
	},
}

const handleActions = {
	toggleTransition: store => ({
		...store,
		transitioning: !store.transitioning,
	}),
	toggleTimes: store => ({
		...store,
		timesExpanded: !store.timesExpanded,
	}),
	toggleSuccess: store => ({
		...store,
		submitSuccess: !store.submitSuccess,
	}),
	setTimeSelected: (store, { timeSelected }) => ({
		...store,
		timeSelected,
	}),
	setCaptchaVerified: (store, { captchaVerified }) => ({
		...store,
		captchaVerified,
	}),
	setCurrentIdx: (store, { currentIdx }) => ({
		...store,
		currentIdx,
	}),
	setScheduleData: (store, { scheduleData }) => ({
		...store,
		scheduleData,
	}),
	setCalendarData: (store, { fieldName, value }) => ({
		...store,
		calendarData: { ...store.calendarData, [fieldName]: value },
	}),
}

const reducer = (store, action) => (
	Boolean(handleActions[action.type])
		? handleActions[action.type](store, action)
		: store
);
*/

function CalendarHead({ content }) {
	return <div className={getClassNames(['calendar__cell', 'calendar__cell--head'], styles)}>{content}</div>;
}

CalendarHead.propTypes = {
	content: PropTypes.string.isRequired,
}

function AvailableTimes({ timesArray, timesRendered, currentValue, setter }) {
	return(
		<>
			<div className={styles['calendar__form__scroll']}>
				{timesRendered && timesArray.map((time, idx) => (
					<label key={idx} className={styles['calendar__radio__container']}>
						<Field
							id={idx}
							type="radio"
							name="selectedTime"
							value={time + ''}
							checked={currentValue === time + ''}
						/>
						<span className={styles["calendar__radio__mark"]}></span>
						{time + ''}
					</label>
				))}
			</div>
			<button type="proceed" onClick={() => currentValue && setter(true)} data-content="Weiter">
				Weiter
			</button>
		</>
	);
}

AvailableTimes.propTypes = {
	timesArray: PropTypes.array,
	timesRendered: PropTypes.bool,
	currentValue: PropTypes.string.isRequired,
	setter: PropTypes.func.isRequired,
}

AvailableTimes.defaultProps = {
	timesArray: [],
	timesRendered: true,
}

// [TODO]: rework state? reducer?
export default function Calendar({ schedule }) {
	const [transitioning, setTransitioing] = useState(false);
	const [timesExpanded, setTimesExpanded] = useState(false);
	const [timeSelected, setTimeSelected] = useState(false);
	const [captchaVerified, setCaptchaVerified] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [data, setData] = useState([]);
	const [currentIdx, setCurrentIdx] = useState(-1);
	const [month, setMonth] = useState(-1);
	const [year, setYear] = useState(-1);
	const [day, setDay] = useState(-1);

	/*
	const [state, dispatch] = React.useReducer(
		reducer,
		initialState,
		undefined,
	)
	*/

	const now = useRef(null);
	const formRef = useRef(null);

	const offset = useMemo(() => getMonthOffset(month, year), [month, year]);

	const mobileHandlers = useSwipeable({
		onSwipedLeft: () => handleIncrement(),
		onSwipedRight: () => handleDecrement(),
	});

	useEffect(() => {
		const date = new Date();
		now.current = date;
		setMonth(date.getMonth());
		setYear(date.getFullYear());
	}, []);

	useEffect(() => {
		const { months } = schedule;

		let _data = [];

		months.forEach(dataset => {
			if(parseInt(dataset.year) === year && parseInt(dataset.month) - 1 === month) {
				if(dataset.hasOwnProperty('availableDates')) {
					_data = dataset.availableDates;
				}
			}
		});

		setData(_data);
	}, [month, year]);

	const handleIncrement = () => {
		const { current } = now;
		const selectedDate = new Date(year, month);
		if(selectedDate.getTime() - current.getTime() > MAX_LOOKAHEAD) return null;

		setTransitioing(true);
		setTimeout(() => {
			setMonth(month => mod(month + 1, 12));
			if(month === 11) setYear(year => year + 1);
			setTransitioing(false);
		}, transitionDuration);
	}

	const handleDecrement = () => {
		const { current } = now;
		const selectedDate = new Date(year, month);
		if(selectedDate.getTime() - current.getTime() <= 0) return null;

		setTransitioing(true);
		setTimeout(() => {
			setMonth(month => mod(month - 1, 12));
			if(month === 0) setYear(year => year - 1);
			setTransitioing(false);
		}, transitionDuration);
	}

	const handleClickDate = day => {
		setDay(day);
		setCurrentIdx(data.findIndex(n => Number(n.day) === day));
		setTimesExpanded(true);
	}

	const handleBack = resetForm => {
		if(!timeSelected) {
			setTimesExpanded(false);
			setSubmitSuccess(0);
			resetForm();
		}

		setTimeSelected(false);
	}

	const handleCaptchaChange = async value => {
		const data = { 'g-recaptcha-response': value };
		const response = await axios.post(VERIFY_CAPTCHA_ENDPOINT, data, postConfigGCP);
		setCaptchaVerified(response.data.success);
	}

	const handleSubmit = async values => {
		const data = {
			subject: 'Buchungsanfrage für Unterricht (rubengiannotti.com)',
			year,
			month,
			day,
			...values
		};

		const response = await axios.post(MAILING_ENDPOINT, data, postConfigGCP);
		setSubmitSuccess(response.data.success);
	}

	const isValidDate = month > -1 && year > -1 && day > -1;

	const cls = `
		${styles['calendar']}
		${month > -1 && year > -1 ? styles['calendar--loaded'] : ''}
		${transitioning ? styles['calendar--transition'] : ''}
	`;
	const monthCls = `
		${styles['calendar__month']}
		${transitioning ? styles['calendar__month--transition'] : ''}
	`;
	const timesCls = `
		${styles['calendar__times']}
		${timesExpanded ? styles['calendar__times--expanded'] : ''}
	`;
	const filledCellCls = `
		${styles['calendar__cell']}
		${transitioning ? styles['calendar__cell--transition'] : ''}
	`;
	const availableCellCls = `
		${getClassNames(['calendar__cell', 'calendar__cell--available'], styles)}
		${transitioning ? styles['calendar__cell--transition'] : ''}
	`;

	return(
		<div className={cls} {...mobileHandlers}>
			<div className={monthCls}>
				{month > -1 && getMonthVerbose(month)} {year > -1 && year}
			</div>
			<div
				className={getClassNames(['calendar__control', 'calendar__control__prev'], styles)}
				onClick={handleDecrement}
			>
				<Triangle />
			</div>
			<div
				className={getClassNames(['calendar__control', 'calendar__control__next'], styles)}
				onClick={handleIncrement}
			>
				<Triangle />
			</div>
			{weekDayShorthands.map(shorthand => <CalendarHead content={shorthand} />)}
			{[...Array(42).keys()].map(idx => {
				if(idx < offset || idx > getMonthDaysAmount(month, year) + offset - 1) {
					return <div key={idx} className={getClassNames(['calendar__cell', 'calendar__cell--empty'], styles)} />
				} else if(data.map(date => Number(date.day)).includes(idx + 1 - offset)) {
					return <div key={idx} className={availableCellCls} onClick={() => handleClickDate(idx + 1 - offset)}>{idx + 1 - offset}</div>
				} else {
					return <div key={idx} className={filledCellCls}>{idx - offset + 1}</div>
				}
			})}
			<div className={timesCls}>
				<Formik
					initialValues={initialValues}
					validationSchema={inputSchema}
					onSubmit={handleSubmit}
				>
					{formProps => {
						const { values, touched, errors, resetForm } = formProps;
						return(
							<>
								<div className={styles['calendar__times__close']} onClick={handleBack.bind(null, resetForm)}>
									<Arrow />
								</div>
								<div className={styles['calendar__times__heading']}>
									{isValidDate && dateFormat(year, month, day)}
								</div>
								<div className={styles['calendar__times__description']}>
									{!timeSelected ? 'Verfügbare Termine:' : `Ausgewählter Termin: ${values.selectedTime}`}
								</div>
								<Form className={styles['calendar__form']} ref={formRef}>
									{!timeSelected
										? <AvailableTimes
												timesArray={data[currentIdx]?.times}
												timesRendered={data.length > 0 && currentIdx > -1}
												currentValue={values.selectedTime}
												setter={setTimeSelected}
											/>
										: <>
												<Field name="email" type="text" placeholder="Email" />
												<ErrorDisplay forName="email" touched={touched} errors={errors} />
												<SubmitButtonWithCaptcha
													captchaVerified={captchaVerified}
													apikey={RECAPTCHA_PUBLIC}
													onCaptchaChange={handleCaptchaChange}
												>
													Buchungsanfrage abschicken
												</SubmitButtonWithCaptcha>
												<SubmitFeedback
													{...formProps}
													submitSuccess={submitSuccess}
													loader={<Loader />}
													cssStyles={styles}
													cls="contact__form__notification"
													clsSuccess="contact__form__notification--success"
													clsFailure="contact__form__notification--failure"
													feedbackSuccess="Vielen Dank für Ihre Anfrage!"
													feedbackFailure="Leider ist leider etwas schief gegangen..."
												/>
											</>
									}
								</Form>
							</>
						)
					}}
				</Formik>
			</div>
		</div>
	);
}

Calendar.propTypes = {
	schedule: PropTypes.shape({
		months: PropTypes.arrayOf(PropTypes.shape({
			year: PropTypes.string.isRequired,
			month: PropTypes.string.isRequired,
			availableDates: PropTypes.arrayOf(PropTypes.shape({
				day: PropTypes.string.isRequired,
				times: PropTypes.arrayOf(PropTypes.string),
			}))
		}))
	})
}

Calendar.defaultProps = {
	schedule: { months: [] },
}
