import React, { useState } from 'react';
import useWindowSize from '../../hooks/use-window-size';
import Carousel from 'react-items-carousel';
import { ChevronLeft, ChevronRight } from '../buttons/buttons';
import styles from './playlists.module.scss';

export default function Playlists() {
	const [soundIndex, setSoundIndex] = useState(0);
	const { width, height } = useWindowSize();

	const playerHeight = parseInt(height, 10) < 820 && parseInt(width, 10) < 1000 ?
		`${.6 * parseInt(height, 10)}px`
		:
		`${.4 * parseInt(height, 10)}px`;

	return(
		<div className={styles['playlist-container']}>
			<Carousel
				infiniteLoop={true}
				gutter={0}
				activePosition="center"
				chevronWidth={25}
				disableSwipe={false}
				alwaysShowChevrons={false}
				numberOfCards={width ? Math.ceil(parseInt(width, 10) / 1000) : 1}
				slidesToScroll={1}
				outsideChevron={true}
				showSlither={true}
				firstAndLastGutter={true}
				requestToChangeActive={setSoundIndex}
				activeItemIndex={soundIndex}
				leftChevron={<ChevronLeft />}
				rightChevron={<ChevronRight />}
			>
				<div className={styles['playlist-item']}>
					<iframe
						title="kayak-player"
						src="https://open.spotify.com/embed/album/5aVkeGtjmMxdu96scwLSjA?si=gKSmfqo8TS21R94oq-XfUQ"
						width="100%"
						height={playerHeight}
						frameBorder="0"
						allowtransparency="true"
						allow="encrypted-media"
					/>
				</div>
				<div className={styles['playlist-item']}>
					<iframe
						title="fragment-player"
						src="https://open.spotify.com/embed/album/6ydRiTj8E9OmQLBY8j6sRb?si=rsyWf7OxQBOy-1Ri-dDIoA"
						width="100%"
						height={playerHeight}
						frameBorder="0"
						allowtransparency="true"
						allow="encrypted-media"
					/>
				</div>
				<div className={styles['playlist-item']}>
					<iframe
						title="spectrum-player"
						width="100%"
						height={playerHeight}
						scrolling="no"
						frameBorder="no"
						allow="autoplay"
						src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/587628120&color=%23ff5b00&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
					/>
				</div>
			</Carousel>
		</div>
	);
}
