import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import getClassNames from '../utility/get-class-names';
import useRefs from '../hooks/use-refs';
import useWindowSize from '../hooks/use-window-size';
import { Wrapper, Content, PadContent, ScrollContent } from '../components/containers/containers';
import VideoBackground from '../components/video-background/video-background';
import GlitchText from '../components/glitch-text/glitch-text';
import { Button, ChevronLeft, ChevronRight } from '../components/buttons/buttons';
import Carousel from 'react-items-carousel';
import ContentsFollower from '../components/contents-follower/contents-follower';
import HideOnPhones from '../components/hide-on-phones/hide-on-phones';
import { targetBlank } from '../utility/base-styles';
import Cross from '../assets/icons/cross.svg';
import Rotate from '../assets/icons/rotate-screen.svg';
import Mouse from '../assets/icons/mouse.svg';
import Spotify from '../assets/icons/spotify.svg';
import Apple from '../assets/icons/apple.svg';
import Deezer from '../assets/icons/deezer.svg';
import Tidal from '../assets/icons/tidal.svg';
import Youtube from '../assets/icons/youtube-verbose.svg';
import styles from './route-styles/jazz-orchestra.module.scss';

// TODO: rename route to avoid naming collision with jazz-orchestra.html?

const rgjoTopView = '/img/rgjo/rgjo-top-view.jpg';
const rgjoRuben = '/img/rgjo/rgjo-ruben-giannotti.jpg';
const rgjoLars = '/img/rgjo/rgjo-lars-seniuk.jpg';
const rgjoCharis = '/img/rgjo/rgjo-charis-karantzas.jpg';

const imgNamespaces = [
	'rgjo-drums',
	'rgjo-reeds',
	'rgjo-brass',
	'rgjo-trumpets',
	'rgjo-pno',
	'rgjo-trombones',
	'rgjo-git',
	'rgjo-solo',
];

const imgGridPath = '/img/rgjo/grid';
const imgCarouselPath = '/img/rgjo/carousel';

const imgGridContent = imgNamespaces.map(n => `${imgGridPath}/${n}-lr.jpg`);
const imgCarouselContent = imgNamespaces.map(n => `${imgCarouselPath}/${n}-hr.jpg`);

const Tags = () => {
	return(
		<div className={styles['tags']}>
			<span>contemporary</span>
			<span>orchestral</span>
			<span>jazz</span>
			<span>neosoul</span>
			<span>postpostbop</span>
		</div>
	);
}

const BuyButtons = () => {
	return(
		<div className={styles['intro-buttons']}>
			<Button href="https://www.amazon.de/fragment-ruben-giannotti-jazz-orchestra/dp/B07QPWYCMV/ref=sr_1_1?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=ruben+giannotti&qid=1570223414&sr=8-1">
				Amazon
			</Button>
			<Button href="https://www.stoa.berlin/">STOA</Button>
		</div>
	);
}

const AboutText = () => {
	return(
		<div className={styles['about-text']}>
			Das hochkarätig besetzte Ensemble wurde 2019 von Ruben Giannotti ins Leben gerufen.
			Im Zentrum dessen steht die fragment-Suite für Big Band,
			in der sich der Komponist intensiv mit Perspektivwechseln
			und der Beziehung zwischen der elektronischen und
			händischen instrumentalen Tonerzeugung beschäftigt hat.
			Das Resultat ist ein organisches Gemenge aus
			"klassischen" Big-Band-Topoi, Beats, Samples und generativen Automaten -
			die sich in jeder Schicht entfalten
			und nicht eineindeutig auf bestimmte Bereiche beschränkt werden.
		</div>
	);
}

const descriptionCaptionFormat = string => {
	return `${string}: `;
}

const BandLineup = () => {
	return(
		<div className={styles['description']}>
			<div className={styles['description__item']} data-caption={descriptionCaptionFormat('Reeds')}>
				Philipp Gerschlauer, Eldar Tsalikov, Peter Ehwald, Finn Wiesner, Tini Thomsen
			</div>
			<div className={styles['description__item']} data-caption={descriptionCaptionFormat('Trompeten')}>
				Tobias Weidinger, Nicolas Boysen, Johannes Böhmer, Florian Menzel
			</div>
			<div className={styles['description__item']} data-caption={descriptionCaptionFormat('Posaunen')}>
				Simon Harrer, Janning Trumann, Johannes Lauer, Felix Konradt
			</div>
			<div className={styles['description__item']} data-caption={descriptionCaptionFormat('Rhythmusgruppe')}>
				Maria Baptist (Klavier),
				Attila Muehl (Gitarre),
				Matthias Eichhorn (Bass),
				Fabian Rösch (Schlagzeug),
				Ruben Giannotti (Electronics)
			</div>
		</div>
	);
}

const Listen = () => {
	return(
		<div className={styles['listen']}>
			<a href="https://open.spotify.com/album/6ydRiTj8E9OmQLBY8j6sRb?si=YuVW4GmAQMScMsEZD5-rvw" {...targetBlank}>
				<Spotify className={styles['spotify']} />
			</a> 
			<a href="https://music.apple.com/us/album/fragment/1478165919?app=apple%20music&ign-mpt=uo%3D4" {...targetBlank}>
				<Apple className={styles['apple']} />
			</a>
			<a href="https://www.deezer.com/us/album/109148092" {...targetBlank}>
				<Deezer className={styles['deezer']} />
			</a>
			<a href="https://tidal.com/browse/album/116500585" {...targetBlank}>
				<Tidal className={styles['tidal']} />
			</a>
			<a href="https://www.youtube.com/channel/UCBvbyatXygz41b17JKiQnZw" {...targetBlank}>
				<Youtube className={styles['youtube']} />
			</a>
		</div>
	);
}

const About = () => {
	return(
		<div className={styles['about']}>
			<AboutText />
			<BandLineup />
			<Listen />
		</div>
	);
}

const PressButtons = () => {
	return(
		<div className={styles['press-buttons']}>
			<Button href="/digital_content/fragment_presskit/fragment_presskit.pdf" {...targetBlank}>
				Presskit (Ger)
			</Button>
			<Button href="/digital_content/fragment_presskit/fragment_presskit-eng.pdf" {...targetBlank}>
				Presskit (Eng)
			</Button>
			<Button href="/digital_content/fragment_pressphoto/fragment-pressphoto.png" {...targetBlank}>
				Pressefoto
			</Button>
			<Button href="/digital_content/fragment_booklet/d4ecf44767ce2716a2604bdbbd1f7b99586a1ca2.pdf" {...targetBlank}>
				Digitales Albumbooklet
			</Button>
		</div>
	);
}

const Video = () => {
	return(
		<div className={styles['video-showcase']}>
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/8FJ8RbvqE-o"
				frameBorder={0}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	);
}

const genImgStyle = path => {
	return {
		style: {
			backgroundImage: `url(${path})`,
		}
	}
}

const Images = props => {
	const {
		currentImg,
		carouselExpanded,
		setCurrentImg,
		setCarouselExpanded,
		handleClickImg
	} = props;

	return(
		<>
			<div className={styles['one-column']}>
				<div className={styles['img-grid']}>
					{imgGridContent.map((src, idx) =>
						<div
							key={idx}
							className={styles['img-grid__item']}
							onClick={() => handleClickImg(idx)}
							{...genImgStyle(src)}
						/>
					)}
				</div>
			</div>
			<div className={`${styles['img-carousel']} ${carouselExpanded ? styles['img-carousel--expanded'] : ''}`}>
				<Carousel
					infiniteLoop={true}
					gutter={0}
					activePosition="center"
					chevronWidth={50}
					disableSwipe={false}
					alwaysShowChevrons={false}
					numberOfCards={1}
					slidesToScroll={1}
					outsideChevron={false}
					showSlither={true}
					firstAndLastGutter={true}
					requestToChangeActive={setCurrentImg}
					activeItemIndex={currentImg}
					leftChevron={<ChevronLeft />}
					rightChevron={<ChevronRight />}
				>
					{imgCarouselContent.map((src, idx) =>
						<div
							key={idx}
							className={styles['img-carousel__item']}
							{...genImgStyle(src)}
						/>
					)}
				</Carousel>
				<div className={styles['img-carousel__close']} onClick={() => setCarouselExpanded(false)}>
					<Cross />
					SCHLIEßEN
				</div>
				<div className={styles['img-carousel__rotate']}>
					<Rotate />
				</div>
			</div>
		</>
	);
}

Images.propTypes = {
	currentImg: PropTypes.number.isRequired,
	carouselExpanded: PropTypes.bool.isRequired,
	setCurrentImg: PropTypes.func.isRequired,
	setCarouselExpanded: PropTypes.func.isRequired,
	handleClickImg: PropTypes.func.isRequired,
}

const StaffMember = ({ name, role, img, link, align }) => {
	return(
		<a className={align} href={link} data-role={role} {...targetBlank}>
			{name}
			<img src={img} alt={`${role}: ${name}`} />
		</a>
	);
}

const CreativeStaff = () => {
	return(
		<div className={styles['creative-staff']}>
			<StaffMember
				name="Ruben Giannotti"
				role="Initiator / Komponist"
				img={rgjoRuben}
				link="http://rubengiannotti.com"
				align={styles['center']}
			/>
			<StaffMember
				name="Lars Seniuk"
				role="Dirigent"
				img={rgjoLars}
				link="https://www.larsseniuk.de/"
				align={styles['right']}
			/>
			<StaffMember
				name="Charis Karantzas"
				role="Tonmeister"
				img={rgjoCharis}
				link="https://www.chariskarantzas.com/"
				align={styles['left']}
			/>
		</div>
	);
}

const scrollSty = {
	width: '100%',
	height: '100%',
	margin: '130px 0 0 0',
}

export default function JazzOrchestra() {
	const [carouselExpanded, setCarouselExpanded] = useState(false);
	const [currentImg, setCurrentImg] = useState(0);
	const { width } = useWindowSize();
	const scrollRef = useRef(null);

	const sectionRefs = useRefs(['landing', 'about', 'press', 'video', 'images', 'staff']);

	const imagesProps = {
		currentImg,
		carouselExpanded,
		setCurrentImg,
		setCarouselExpanded,
		handleClickImg: idx => {
			setCurrentImg(idx);
			setCarouselExpanded(true);
		},
	}

	return(
		<Wrapper id="jazz-orchestra">
			<Head>
				<title>RUBEN GIANNOTTI / ruben giannotti_jazz orchestra</title>
			</Head>
			<HideOnPhones>
				<ContentsFollower
					sections={[
						{ title: 'Landing', ref: sectionRefs.landing},
						{ title: 'About', ref: sectionRefs.about},
						{ title: 'Presse', ref: sectionRefs.press},
						{ title: 'Video', ref: sectionRefs.video},
						{ title: 'Bilder', ref: sectionRefs.images},
						{ title: 'Creative staff', ref: sectionRefs.staff},
					]}
					containerRef={scrollRef}
				/>
			</HideOnPhones>
			<Content>
				{/* [TODO]: use better background video (no captions and titles) and change intro reveal timings in the css module afterwards */}
				{/* "https://player.vimeo.com/video/330967942" */}
				<VideoBackground
					src="https://www.youtube.com/embed/8FJ8RbvqE-o"
					fallbackImg="/img/rgjo.jpg"
					bypassVideo={width < 1025}
				/>
				<ScrollContent ref={scrollRef} style={scrollSty} transparent>
					<PadContent>
						<div className={styles['landing-content']} ref={sectionRefs.landing}>
							<h2 className={styles['title']}><GlitchText crt>ruben giannotti_jazz orchestra</GlitchText></h2>
							<Tags />
							<div className={styles['text']}>
								<b>Album out und verfügbar auf</b>
							</div>
							<BuyButtons />
							<div className={styles['scroll']}>
								<Mouse />
							</div>
						</div>
						<div className={styles['main-content']}>
							<div className={styles['two-column']} ref={sectionRefs.about}>
								<div className={getClassNames(['column', 'left'], styles)}>
									<div className={styles['dark-box']}>
										<h3><GlitchText>Über das Orchester</GlitchText></h3>
										<About />
									</div>
								</div>
								<div className={getClassNames(['column', 'right'], styles)}>
									<img
										className={styles['full-width-img']}
										src={rgjoTopView}
										alt="Band spielt, von höherer Perspektive betrachtet"
									/>
								</div>
							</div>
							<div ref={sectionRefs.press}><PressButtons /></div>
							<div ref={sectionRefs.video}><Video /></div>
							<div ref={sectionRefs.images}><Images {...imagesProps} /></div>
							<div ref={sectionRefs.staff}><CreativeStaff /></div>
						</div>
					</PadContent>
				</ScrollContent>
			</Content>
		</Wrapper>
	);
}
