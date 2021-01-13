import React, { useState } from 'react';
import Head from 'next/head';
import Link  from 'next/Link';
import useWindowSize from '../hooks/use-window-size';
import Carousel from 'react-items-carousel';
import { Button, ChevronLeft, ChevronRight } from '../components/buttons/buttons';
import GlitchText from '../components/glitch-text/glitch-text';
import styles from './route-styles/projects.module.scss';

const rgjo = '/img/rgjo.jpg';
const bcjp = '/img/bcjp.jpg';
const pnp = '/img/pnp.jpg';
const kvrr = '/img/kvrr.jpg';
const o3 = '/img/o3.jpg';
const am = '/img/am.jpg';

const backgroundImage = src => {
	return {
		background: `url(${src}) rgba(10, 10, 10, 0.5)`,
	}
}

const ProjectContainer = ({ bgSrc, children }) => {
	return(
		<div className={styles['project-container']} style={backgroundImage(bgSrc)}>
			{children}
		</div>
	);
}

const chevronWidth = 40;

// [TODO]: Maria für MBO anfragen
export default function Projects() {
	const [currentProject, setCurrentProject] = useState(0);
	
	const { width } = useWindowSize();

	const numberOfCards = Math.ceil(width / 1024);
	
	return (
		<div id="projects" className={styles['projects']}>
			<Head>
				<title>RUBEN GIANNOTTI / Projekte</title>
			</Head>
			<Carousel
				infiniteLoop={true}
				gutter={0}
				activePosition="center"
				chevronWidth={chevronWidth}
				disableSwipe={false}
				alwaysShowChevrons={false}
				numberOfCards={numberOfCards ? numberOfCards : 1}
				slidesToScroll={1}
				outsideChevron={false}
				showSlither={true}
				firstAndLastGutter={true}
				requestToChangeActive={setCurrentProject}
				activeItemIndex={currentProject}
				leftChevron={<ChevronLeft />}
				rightChevron={<ChevronRight />}
			>
				<ProjectContainer bgSrc={rgjo}>
					<h3><GlitchText>ruben giannotti_jazz orchestra</GlitchText></h3>
					Eine Synthese aus Big Band Jazz, Neosoul und generativer Elektronik.
					<Link href="/jazz-orchestra"><Button>Mehr Informationen</Button></Link>
				</ProjectContainer>
				<ProjectContainer bgSrc={bcjp}>
					<h3><GlitchText>Berlin Cool Jazz Project</GlitchText></h3>
					Seit jeher inspiriert von der Klangwelt des "West Coast Jazz",
					versammelte Bandleader Michael Rowalska im Juni 2014 ein Kollektiv
					aus Musikern der Berliner Jazzszene um dich,
					das sich der Kultivierung und Weiterentwicklung
					des kammermusikalisch swingenden Cool Jazz angenommen hat.
					<Button href="http://www.bcjp.de/">
						Mehr Informationen
					</Button>
				</ProjectContainer>
				<ProjectContainer bgSrc={pnp}>
					<h3><GlitchText>Porno &amp; Piano</GlitchText></h3>
					Hinter dem genüsslichen Titel verbirgt sich eine einmalige Kombination aus
					Text und Musik, Diskurs und Sinnlichkeit, Rollenspiel und Gesellschaftsanalyse.
					<Button href="http://pornoundpiano.de/">
						Mehr Informationen
					</Button>
				</ProjectContainer>
				<ProjectContainer bgSrc={kvrr}>
					<h3><GlitchText>Roter Rummel: Arsenal</GlitchText></h3>
					Stummfilmvertonungen und Bühnenmusiken angelehnt an den Surrealismus Dsiga Wertows und Sergei Eisensteins
					kuratiert zu einem Konzertformat mit dem Orchester der Komischen Oper Berlin.
					<Button href="https://www.komische-oper-berlin.de/programm/a-z/stummfilm-roter-rummel/">
						Mehr Informationen
					</Button>
				</ProjectContainer>
				<ProjectContainer bgSrc={o3}>
					<h3><GlitchText>orpheus III</GlitchText></h3>
					... steht gleichermaßen für einen in die Jazzkultur eingebetteten Archaismus
					und die Auflösung der großen Genregrenze zwischen Klassik und Jazz.
					<Button href="http://www.orpheus3.de/">
						Mehr Informationen
					</Button>
				</ProjectContainer>
				<ProjectContainer bgSrc={am}>
					<h3><GlitchText>Anna Margolina</GlitchText></h3>
					Eine der vielsetigsten lyrischen Stimmen dieser Zeit,
					die sich darauf spezialisiert Jiddische Melodien in Jazztypen zu transformieren.
					<Button href="https://www.margolinamusic.com/">
						Mehr Informationen
					</Button>
				</ProjectContainer>
			</Carousel>
		</div>
	);
}
