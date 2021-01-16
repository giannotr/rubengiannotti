import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import simpleHash from '../utility/simple-hash';
import getClassNames from '../utility/get-class-names';
import useWindowSize from '../hooks/use-window-size';
import InstagramEmbed from 'react-instagram-embed';
import { Wrapper, Content, PadContent, ScrollContent } from '../components/containers/containers';
import SectionHeading from '../components/section-heading/section-heading';
import Loader from '../components/loader/loader';
import * as youtubeFeed from '../assets/data/youtube-feed.json';
import * as instagramFeed from '../assets/data/instagram-feed.json';
import styles from './route-styles/media.module.scss';

const youtubeFeedData = youtubeFeed.default;
const instagramFeedData = instagramFeed.default;

const YOUTUBE_EMBED_ENDPOINT = process.env.YOUTUBE_EMBED_ENDPOINT;
const INSTAGRAM_EMBED_ENDPOINT = process.env.INSTAGRAM_EMBED_ENDPOINT;
const INSTAGRAM_PUBLIC = process.env.INSTAGRAM_PUBLIC;
const INSTAGRAM_SECRET = process.env.INSTAGRAM_SECRET;

const youtubeEmbedConfig = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';

const { headingHeight, instagramWidth } = styles;

const YoutubeEmbed = ({ videoId }) => {
	const [loaded, setLoaded] = useState(false);
	const { width } = useWindowSize();

	const handleLoad = () => {
		setTimeout(() => {
			setLoaded(true);
		}, 150);
	}

	return(
		<div className={`${styles['media-element']} ${loaded ? styles['loaded'] : ''}`}>
			<iframe
				title={`Youtube embed (#${videoId})`}
				width={width < 1025 ? '100%' : '800'}
				height="450"
				src={`${YOUTUBE_EMBED_ENDPOINT}/${videoId}`}
				frameBorder="0"
				allow={youtubeEmbedConfig}
				allowFullScreen
				onLoad={handleLoad}
			/>
			{loaded
				? <></>
				: <div className={styles['media-loader']}><Loader /></div>
			}
		</div>
	);
}

const fullWidth = {
	width: '100%',
}

export default function Media() {
	const { width } = useWindowSize();
	const ytThreshhold = width < 500 ? 2 : 4;
	const instaThreshhold = width < 500 ? 4 : 8;

	return(
		<Wrapper id="media">
			<Head>
				<title>RUBEN GIANNOTTI / Media</title>
			</Head>
			<Content>
				<PadContent style={fullWidth}>
					<SectionHeading height={headingHeight} style={{margin: '0 0 0 20px'}}>Media</SectionHeading>
					<ScrollContent offset={headingHeight}>
						<div className={styles['media-wrapper']}>
							<div className={getClassNames(['media-container', 'videos'], styles)}>
								{youtubeFeedData.map(({ id }) => (
									idx < ytThreshhold
										? <YoutubeEmbed key={simpleHash(id)} videoId={id} />
										: <Fragment key={simpleHash(id)} />
								))}
							</div>
							<div className={getClassNames(['media-container', 'instagram'], styles)}>
								{instagramFeedData.map(({ id }) => (
									idx < instaThreshhold
										? <InstagramEmbed
												key={simpleHash(id)}
												id={id}
												url={`${INSTAGRAM_EMBED_ENDPOINT}/${id}/`}
												clientAccessToken={`${INSTAGRAM_PUBLIC}|${INSTAGRAM_SECRET}`}
												maxWidth={parseInt(instagramWidth, 10)}
												hideCaption={true}
												containerTagName='div'
												protocol=''
												injectScript
											/>
										: <Fragment key={simpleHash(id)} />
								))}
							</div>
						</div>
					</ScrollContent>
				</PadContent>
			</Content>
		</Wrapper>
	);
}
