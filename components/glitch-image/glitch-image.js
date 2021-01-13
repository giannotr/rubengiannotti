import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './glitch-image.module.scss';

function isCached(src) {
	let complete = false;

	if(process.browser) {
		var img = new Image();
		img.src = src;
		complete = img.complete;
		img.src = '';
	}
	
	return complete;
}

function ProgressDisplay({ size, progress }) {
  const sty = {
    width: `${size}px`,
    height: `${size}px`,
  }
  
  const radiusOuter = size / 2;
  const radius = radiusOuter - 6;
  const circumference = radius * 2 * Math.PI;
  
  const animSty = {
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: circumference * (1 - progress),
  }
  
  return(
    <div className={styles['progress-display']} style={sty}>
      {Math.round(progress * 100)}
      <svg style={sty} version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle cx={radiusOuter} cy={radiusOuter} r={radius} style={animSty} />
      </svg>
      <svg className={styles['border']} style={sty} version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle cx={radiusOuter} cy={radiusOuter} r={radius} />
      </svg>
    </div>
  );
}

ProgressDisplay.propTypes = {
	size: PropTypes.number,
	progress: PropTypes.number,
}

ProgressDisplay.defaultProps = {
	size: 100,
	progress: 0,
}

export default function GlitchImage({ imgSrc, imgAlt }) {
	const [imgLoaded, setImgLoaded] = useState(false);
	const [progress, setProgress] = useState(0);
  const [increment, setIncrement] = useState(null);

	const img = useRef(null);

	useEffect(() => {
		if(increment) {
			clearInterval(increment);
		}

		if(isCached(imgSrc)) {
			setImgLoaded(true);
			setProgress(1);
		} else {
			if(img) {
				setProgress(0);
		
				let _inc = setInterval(() => {
					const step = Math.random() / 20;
					setProgress(progress => progress + step);
				}, 40);

				setIncrement(_inc);

				setTimeout(() => {
					setImgLoaded(img.current.complete);
				}, 750);
			}
		}
	}, [img]);
  
  useEffect(() => {
    if(progress >= 1) {
      setProgress(1);
      clearInterval(increment);
    }
	}, [progress]);
	
	const isMounted = () => imgLoaded && progress >= 1;

	const imgProps = {
		className: styles['glitch-image__img'],
		style: { backgroundImage: `url(${imgSrc})`},
	}

	return(
		<>
			<div className={`${styles['glitch-image']} ${isMounted() ? styles['img--loaded'] : styles['img--loading']}`}>
				{[0, 1, 2, 3, 4].map(idx => <div key={idx} {...imgProps}></div>)}
				<img
					style={{ display: 'none', zIndex: '-1', }}
					src={imgSrc}
					alt={imgAlt}
					ref={img}
				/>
			</div>
		{isMounted() || isCached()
			? <></>
			: <ProgressDisplay size={150} progress={progress} />
		}
		</>
	);
}

GlitchImage.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	imgAlt: PropTypes.string.isRequired,
}
