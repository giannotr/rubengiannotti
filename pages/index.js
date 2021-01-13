import { useState } from 'react';
import Head from 'next/head';
import { Wrapper, Content, Overlay, Modal } from '../components/containers/containers';
import GlitchText from '../components/glitch-text/glitch-text';
import GlitchIcon from '../components/glitch-icon/glitch-icon';
import GlitchImage from '../components/glitch-image/glitch-image';
import SocialIcons from '../components/social-icons/social-icons';
import Playlists from '../components/playlists/playlists';
import Sound from '../assets/icons/sound.svg';
import styles from './route-styles/index.module.scss';

const image = '/img/intro.png';

// TODO: IF phone: landscape advise (for better usability)
// [TODO]: Helper/pointer animation at page load: neutral overlay => clip out highlighted area with red text beneath
export default function Home() {
	const [soundExpanded, setSoundExpanded] = useState(false);

	const handleClickSound = () => {
		setSoundExpanded(!soundExpanded);
	}

	return(
		<Wrapper id="home">
			<Head>
				<title>RUBEN GIANNOTTI / Trompeter &amp; Komponist</title>
			</Head>
			<Content>
				<h1 className={styles['title']}>
					<GlitchText crt>Ruben Giannotti</GlitchText>
					<span><GlitchText>Trompeter &amp; Komponist</GlitchText></span>
				</h1>
				<div className={styles['sound-container']} onClick={handleClickSound}>
					<GlitchIcon>
						<Sound />
					</GlitchIcon>
				</div>
				<div className={styles['social-container']}>
					<SocialIcons />
				</div>
			</Content>
			<GlitchImage
				imgSrc={image}
				imgAlt="Ruben Giannotti in profile view playing the trumpet with glitch effect"
			/>
			<Modal
				expanded={soundExpanded}
				setExpanded={setSoundExpanded}
				title="Sound"
			>
				<Playlists />
			</Modal>
			<Overlay expanded={soundExpanded} />
		</Wrapper>
	);
}
