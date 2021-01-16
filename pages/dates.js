import React, { useState, useRef, Fragment } from 'react';
import Head from 'next/head';
import simpleHash from '../utility/simple-hash';
import getClassNames from '../utility/get-class-names';
import { targetBlank } from '../utility/base-styles';
import { Wrapper, Content, PadContent, ScrollContent } from '../components/containers/containers';
import SectionHeading from '../components/section-heading/section-heading';
import Loader from '../components/loader/loader';
import * as concerts from '../assets/data/concerts.json';
import styles from './route-styles/dates.module.scss';

const backgroundPicture = '/img/trumpet_wall.jpg';

const data = concerts.default;

const { headingHeight, headFootHeight } = styles;

const marginLeft = {
	margin: '0 0 0 10px',
}

const timeOptions = {
	hour: 'numeric',
	minute: 'numeric',
};

const Row = ({ datetimeObj, artist, venue, address, link, canceled }) => {
	return(
		<a className={styles['row']} href={link} {...targetBlank}>
			<div className={`${getClassNames(['column', 'datetime'], styles)} ${canceled ? styles['canceled'] : ''}`}>
				{datetimeObj.toLocaleDateString('en-gb')}
				&#44;&nbsp;
				{new Intl.DateTimeFormat('en-gb', timeOptions).format(datetimeObj)}
			</div>
			<div className={`${getClassNames(['column', 'artist'], styles)} ${canceled ? styles['canceled'] : ''}`}>
				{artist}
			</div>
			<div className={`${getClassNames(['column', 'venue'], styles)} ${canceled ? styles['canceled'] : ''}`}>
				{venue}, {address}
			</div>
		</a>
	);
}

export default function Dates() {
	const [tableLength, setTableLength] = useState(11);
	const [datesLoading, setDatesLoading] = useState(false);
	const [datesShort, setDatesShort] = useState(true);
	const [scroll, setScroll] = useState(0);

	const scrollable = useRef(null);

	const checkDatesShort = () => {
		const [scroller] = scrollable.current.childNodes;

		if(scroller) {
			const { scrollHeight, clientHeight } = scroller;
			setDatesShort(clientHeight - scrollHeight >= 0);
		}
	}

	const requestNewData = () => {
		if(datesShort) setDatesShort(false);

		const [scroller] = scrollable.current.childNodes;

		setScroll(scroller.scrollTop);
		setDatesLoading(true);

		setTimeout(() => {
			setDatesLoading(false);
			setTableLength(tableLength + 20);
			checkDatesShort();
		}, 750);
	}

	const handleScroll = () => {
		const [scroller] = scrollable.current.childNodes;
		const { scrollHeight, clientHeight, scrollTop } = scroller;
		const endOfTable = scrollHeight - clientHeight;
		if(scrollTop >= endOfTable && tableLength < data.length) requestNewData();
	}

	const tableSty = {
		background:
			`${datesShort
				? 'transparent'
				: 'linear-gradient(90deg, rgba(255,255,255,0) 75%, rgba(199,44,65,0.02) 90%, rgba(45,39,39,1) 100%)'
			}`,
	}

	const scrollablaOffset = datesShort ? headFootHeight : headingHeight;

	return(
		<Wrapper id="dates" background={backgroundPicture} backgroundOverlay>
			<Head>
				<title>RUBEN GIANNOTTI / Termine</title>
			</Head>
			<Content onScroll={handleScroll}>
				<PadContent style={{zIndex: '1'}}>
					<SectionHeading height={headingHeight} style={marginLeft}>Termine</SectionHeading>
					<div ref={scrollable}>
						<ScrollContent offset={scrollablaOffset} style={marginLeft}>
							<div className={styles['table']} style={tableSty}>
								{data.map((gig, idx) => {
									const { datetime } = gig;
									const datetimeObj = new Date(datetime);
									const rowProps = { datetimeObj, ...gig };
									if(idx <= tableLength) {
										return(
											<Row key={idx} {...rowProps} />
										);
									} else {
										return <Fragment key={idx} />;
									}
								})}
							</div>
							{datesLoading &&
								<div
									className={styles['loader-container']}
									style={{
										transform: `translate(0, ${scroll}px)`,
									}}
								>
									<Loader />
								</div>
							}
						</ScrollContent>
					</div>
					{datesShort && <div className={styles['expand-container']} onClick={requestNewData}>
						<span></span><span></span><span></span>
						Mehr Termine Anzeigen
					</div>}
				</PadContent>
				<div className={styles['right-hand-side-gradient']} />
			</Content>
		</Wrapper>
	);
}
