import React, { useState } from 'react';
import Head from 'next/head';
import Link  from 'next/Link';
import axios from 'axios';
import getClassNames from '../utility/get-class-names';
import isProduction from '../utility/is-production';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import ErrorDisplay from '../components/error-display/error-display';
import { SubmitButtonWithCaptcha } from '../components/buttons/buttons';
import SubmitFeedback from '../components/submit-feedback/submit-feedback';
import { Wrapper, Content, PadContent } from '../components/containers/containers';
import SectionHeading from '../components/section-heading/section-heading';
import Loader from '../components/loader/loader';
import SocialIcons from '../components/social-icons/social-icons';
import { fullSize } from '../utility/base-styles';
import styles from './route-styles/contact.module.scss';

const RECAPTCHA_PUBLIC = process.env.RECAPTCHA_PUBLIC;
const GCP_VERIFY_CAPTCHA_ENDPOINT = isProduction() ? process.env.GCP_VERIFY_CAPTCHA_ENDPOINT : 'http://localhost:8010/proxy/verify-captcha';
const GCP_MAILING_ENDPOINT = isProduction() ? process.env.GCP_MAILING_ENDPOINT : 'http://localhost:8010/proxy/contact-form';
// works if a proxy is set up: lcp --proxyUrl https://us-central1-rubengiannotti-contact-form.cloudfunctions.net

const portrait = '/img/rg-portrait.jpg';

const isSubmitReady = values => {
	return values.name && values.email && values.gdpr;
}

const contentSty = {
	...fullSize,
	maxWidth: '1500px',
	zIndex: '1',
}

const inputSchema = Yup.object().shape({
	name: Yup.string().required('Erforderlich'),
	email: Yup.string().email('Ungültige E-Mail-Adresse').required('Erforderlich'),
	subject: Yup.string(),
	message: Yup.string(),
	gdpr: Yup.bool().oneOf([true], 'Bitte aktivieren Sie diese Checkbox'),
});

const initialValues = {
	name: '',
	email: '',
	subject: '',
	message: '',
	gdpr: false,
}

const postConfigGCP = {
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	}
}

// AWS
// POST
//const mailingEndpoint = 'https://hxvp5ugdda.execute-api.us-east-1.amazonaws.com/dev/sendMail';
// GET
//const listEndpoint = 'https://hxvp5ugdda.execute-api.us-east-1.amazonaws.com/dev/list';

// [TODO]: add fixed height container for loader and progress notifications
export default function Contact() {
	const [captchaVerified, setCaptchaVerified] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const handleCaptchaChange = async value => {
		const data = { 'g-recaptcha-response': value };
		const response = await axios.post(GCP_VERIFY_CAPTCHA_ENDPOINT, data, postConfigGCP);
		setCaptchaVerified(response.data.success);
	}

	const handleSubmit = async (values, { resetForm }) => {
		const response = await axios.post(GCP_MAILING_ENDPOINT, values, postConfigGCP);
		const { success } = response.data;
		setSubmitSuccess(success);
		if(success) resetForm();
	}

	return(
		<Wrapper id="contact" background={portrait} backgroundOverlay>
			<Head>
				<title>RUBEN GIANNOTTI / Kontakt</title>
			</Head>
			<Content>
				<PadContent style={contentSty}>
					<div className={styles['scroll-invisible']}>
						<SectionHeading style={{margin: '40px 20px'}}>Kontakt</SectionHeading>
						<div className={styles['contact-container']}>
							<div className={getClassNames(['contact-column', 'left'], styles)}>
								<Formik
									initialValues={initialValues}
									validationSchema={inputSchema}
									onSubmit={handleSubmit}
								>
									{formProps => {
										const { values, errors, touched, isSubmitting } = formProps;
										return(
											<Form className={styles['form-styled']}>
												<Field name="name" type="text" placeholder="Name" />
												<ErrorDisplay forName="name" touched={touched} errors={errors} />
												<Field name="email" type="text" placeholder="Email" />
												<ErrorDisplay forName="email" touched={touched} errors={errors} />
												<Field name="subject" type="text" placeholder="Betreff" />
												<div className={styles['text-area-container']}>
													<Field name="message" type="text" as="textarea" placeholder="Nachricht" />
												</div>
												<label type="checkbox-label">
													<Field type="checkbox" name="gdpr" />
													<div>
														Hiermit bestätige ich, die&nbsp;
														<a href="/imprint#disclaimer-privacy" data-content="Datenschutzbestimmungen">Datenschutzbestimmungen</a>&nbsp;
														gelesen zu haben, und erkläre mich mit ihnen einverstanden.
													</div>
												</label>
												<ErrorDisplay forName="gdpr" touched={touched} errors={errors} style={{
													transform: 'translate(0, 6px)',
												}} />
												<SubmitButtonWithCaptcha
													captchaVerified={captchaVerified}
													apikey={RECAPTCHA_PUBLIC}
													onCaptchaChange={handleCaptchaChange}
													className={isSubmitReady(values) && !submitSuccess ? '' : styles['disable-animation']}
													disabled={isSubmitting}
												>
													Senden
												</SubmitButtonWithCaptcha>
												<SubmitFeedback
													{...formProps}
													submitSuccess={submitSuccess}
													loader={<Loader />}
													cssStyles={styles}
													cls="notification"
													clsSuccess="success"
													clsFailure="failure"
													feedbackSuccess="Vielen Dank für Ihre Nachricht!"
													feedbackFailure="Leider ist leider etwas schief gegangen..."
												/>
											</Form>
										);
									}}
								</Formik>
							</div>
							<div className={getClassNames(['contact-column', 'right'], styles)}>
								Wenn Sie mich für ein Konzert buchen oder für eine Komposition oder Arrangement beauftragen wollen,
								zögern Sie nicht, mich zu kontaktieren.
								Unterricht in Trompete, Komopsition oder Musiktheorie
								erteile ich sowohl offline als auch online.
								Nehmen Sie dazu gerne ebenfalls über die Form Kontakt mit mir auf
								oder nutzen Sie speziell für Online-Unterricht mein&nbsp;
								<a href="/lessons" data-content="Buchungssystem">Buchungssystem</a>.
								In den sozialen Medien beantowrte ich auch allgemeinere Fragen.
								<div style={{margin: '15px 0 0 0'}}><SocialIcons /></div>
							</div>
						</div>
					</div>
				</PadContent>
				<div className={styles['left-hand-side-gradient']} />
			</Content>
		</Wrapper>
	);
}
