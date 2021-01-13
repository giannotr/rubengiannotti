import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import useWindowSize from '../hooks/use-window-size';
import getClassNames from '../utility/get-class-names';
import { targetBlank } from '../utility/base-styles';
import { Wrapper, Content, PadContent, ScrollContent } from '../components/containers/containers';
import SectionHeading from '../components/section-heading/section-heading';
import GlitchText from '../components/glitch-text/glitch-text';
import GlitchIcon from '../components/glitch-icon/glitch-icon';
import Circle from '../assets/icons/circle.svg';
import Refresh from '../assets/icons/refresh.svg';
import Sound from '../assets/icons/sound.svg';
import * as compositions from '../assets/data/compositions.json';
import * as arrangements from '../assets/data/arrangements.json';
import styles from './route-styles/opera.module.scss';

const compositionsData = compositions.default;
const arrangementsData = arrangements.default;

const { twoColumnBreakpoint, headingHeight, twoColumnScrollOffset } = styles;

const Opus = ({ title, opus, instrumentation, audioSrc }) => {
	return(
		<div className={styles['opus-container']}>
			<div className={styles['opus-icon']}><Circle /></div>
			<div className={styles['opus-top-row']}>{title}</div>
			<div className={styles['opus-bottom-row']}><b>op. {opus}</b> {instrumentation ? `// ${instrumentation}` : ''}</div>
			{audioSrc && <div className={getClassNames(['opus-icon', 'audio'], styles)}>
				<a href={audioSrc} {...targetBlank}><GlitchIcon><Sound /></GlitchIcon></a>
			</div>}
		</div>
	);
}

Opus.propTypes = {
	title: PropTypes.string.isRequired,
	opus: PropTypes.string.isRequired,
	instrumentation: PropTypes.string,
	audioSrc: PropTypes.string,
}

Opus.defaultProp = {
	instrumentation: '',
	audioSrc: '',
}

const Arrangement = ({ title, composer, instrumentation, compYear, audioSrc }) => {
	return(
		<div className={styles['opus-container']}>
			<div className={styles['opus-icon']}><Refresh /></div>
			<div className={styles['opus-top-row']}>{title}</div>
			<div className={styles['opus-bottom-row']}>{composer} ({compYear}) {`//`} {instrumentation}</div>
			{audioSrc && <div className={getClassNames(['opus-icon', 'audio'], styles)}>
				<a href={audioSrc} {...targetBlank}><GlitchIcon><Sound /></GlitchIcon></a>
			</div>}
		</div>
	);
}

Arrangement.propTypes = {
	title: PropTypes.string.isRequired,
	composer: PropTypes.string.isRequired,
	instrumentation: PropTypes.string.isRequired,
	compYear: PropTypes.string.isRequired,
	audioSrc: PropTypes.string,
}

Arrangement.defaultProps = {
	audioSrc: '',
}

const fillWidth = {
	width: '100%',
}

const fillSpace = {
	...fillWidth,
	height: '100%',
}

export default function Opera() {
	const { width } = useWindowSize();
	const isLrgDevice = width <= parseInt(twoColumnBreakpoint, 10);

	return(
		<Wrapper id="opera">
			<Head>
				<title>RUBEN GIANNOTTI / Opera</title>
			</Head>
			<Content>
				<PadContent style={fillSpace}>
					<div className={styles['heading-position']}>
						<SectionHeading height={headingHeight}>Opera</SectionHeading>
					</div>
					<ScrollContent offset={headingHeight} bypass={!isLrgDevice}>
						<div className={styles['opera-container']}>
							<div className={styles['opera-tile']}>
								<h3><GlitchText>Kompositionen</GlitchText></h3>
								<ScrollContent offset={twoColumnScrollOffset} bypass={isLrgDevice} style={fillWidth}>
									{compositionsData.map((props, index) => (
										<Opus key={index} {...props} />
									))}
								</ScrollContent>
							</div>
							<div className={styles['opera-tile']}>
								<h3><GlitchText>Arrangements</GlitchText></h3>
								<ScrollContent offset={twoColumnScrollOffset} bypass={isLrgDevice} style={fillWidth}>
									{arrangementsData.map((props, index) => (
										<Arrangement key={index} {...props} />
									))}
								</ScrollContent>
							</div>
						</div>
					</ScrollContent>
				</PadContent>
			</Content>
		</Wrapper>
	);
}
