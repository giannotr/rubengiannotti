import React from 'react';
import PropTypes from 'prop-types';
import styles from './video-background.module.scss';

// [TODO]: add case for neither youtube nor vimeo (assumption => video is castable through HTML5 <video>)
// [TODO]: remove vimeo volume notification and play button and progress
export default function VideoBackground({ src, fallbackImg, bypassVideo, children }) {
	// recognizes youtube and vimeo
	const srcRegex = /https:\/\/w*\.*(youtu\.be|youtube\.com|player\.vimeo\.com)+\/(embed|video)\/([\w\d-_]+)/i;
	const [full, domain, api, id] = src.match(srcRegex);

	let endpoint;

	if(full && id) {
		if(['youtube.com', 'youtu.be'].includes(domain) && api === 'embed') {
			endpoint = `${full}?controls=0&showinfo=0&autoplay=1&loop=1&playlist=${id}&rel=0&mute=1`;
		} else if(domain === 'player.vimeo.com' && api === 'video') {
			endpoint = `${full}?byline=0&portrait=0&title=0&fun=0&autoplay=1&loop=1&muted=1`;
		}
		
	}

	return(
		<div className={styles['video-background']} style={{
			backgroundImage: `url(${fallbackImg})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
		}}>
			<div className={styles['video-foreground']}>
				<iframe
					src={endpoint}
					frameBorder="0"
					allow="autoplay; fullscreen"
					allowFullScreen
					style={{
						opacity: bypassVideo ? '0' : '1',
					}}
				/>
				<div className={styles['video-background-gradient']} />
				<div className={styles['video-background-content']}>{children}</div>
			</div>
		</div>
	);
}

VideoBackground.propTypes = {
	src: PropTypes.string.isRequired,
	fallbackImg: PropTypes.string,
	bypassVideo: PropTypes.bool,
	children: PropTypes.any,
}

VideoBackground.defaultProps = {
	fallbackImg: '',
	bypassVideo: false,
	children: '',
}
