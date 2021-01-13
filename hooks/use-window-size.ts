import { useState, useEffect } from 'react';

function throttle(callback: Function, limit: number) {
	let wait = false;

	return () => {
		if(!wait) {
			callback.apply(null, []);
			wait = true;
			
			setTimeout(() => {
				wait = false;
			}, limit);
		}
	}
}

interface Dimensions {
	width: number,
	height: number,
}

export default function useWindowSize(t = 100): Dimensions {
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	const handleResize = () => {
		throttle(() => {
			setWindowSize({
				width: window?.innerWidth,
				height: window?.innerHeight,
			});
		}, t)();
	}

	useEffect(() => {
		let cleanup = null;

		if(window) {
			handleResize();
			
			window.addEventListener('resize', handleResize, {   
				capture: true,
				passive: true,
			});

			cleanup = () => {
				window.removeEventListener('resize', handleResize);
			}

			window.addEventListener('beforeunload', cleanup, true);
		}

		return () => {
			if(window && typeof cleanup === 'function') {
				cleanup();
				window.removeEventListener('beforeunload', cleanup);
			} 
		}
	}, []);

	return windowSize;
}
