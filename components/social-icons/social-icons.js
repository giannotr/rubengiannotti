import React from 'react';
import { targetBlank } from '../../utility/base-styles';
import GlitchIcon from '../glitch-icon/glitch-icon';
import Instagram from '../../assets/icons/instagram.svg';
import Facebook from '../../assets/icons/facebook.svg';
import Youtube from '../../assets/icons/youtube.svg';
import Twitter from '../../assets/icons/twitter.svg';
import styles from './social-icons.module.scss';

function GlitchLink(props) {
	return(
		<GlitchIcon>
			<a {...props} {...targetBlank}>
				{props.children}
			</a>
		</GlitchIcon>
	);
}

export default function SocialIcons() {
	return(
		<div className={styles['social-icons-container']}>
			<GlitchLink href="https://www.instagram.com/rubengiannotti/">
				<Instagram />
			</GlitchLink>
			<GlitchLink href="https://www.facebook.com/ruben.giannotti">
				<Facebook />
			</GlitchLink>
			<GlitchLink href="https://twitter.com/rubengiannotti">
				<Twitter />
			</GlitchLink>
			<GlitchLink href="https://www.youtube.com/channel/UCBvbyatXygz41b17JKiQnZw">
				<Youtube />
			</GlitchLink>
		</div>
	);
}
