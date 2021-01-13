import React, { useRef, useEffect  } from 'react';
import useWindowSize from '../../hooks/use-window-size';

const colorsGlitch = [
	'#c72c41',
	'#ff009d',
	'#00ffea',
	'#ff5b00',
	'#d1cfe2',
	'#d0535e',
];

const glitch = (ctx, width, height, setAnim) => {
	setAnim(window.requestAnimationFrame(() => glitch(ctx, width, height, setAnim)));

	ctx.clearRect(0, 0 , width, height);

	for (let i = 0; i < 900; i++) {
		ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.01})`;
		ctx.fillRect(
			Math.floor(Math.random() * width),
			Math.floor(Math.random() * height),
			Math.floor(Math.random() * 15) + 1,
			Math.floor(Math.random() * 15) + 1,
		);

		ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
		ctx.fillRect(
			Math.floor(Math.random() * width),
			Math.floor(Math.random() * height),
			Math.floor(Math.random() * 15) + 1,
			Math.floor(Math.random() * 15) + 1,
		);
	}

	ctx.fillStyle = colorsGlitch[Math.floor(Math.random() * 40)];
	ctx.fillRect(
		Math.random() * width,
		Math.random() * height,
		Math.random() * width / 9,
		Math.random() * height / 9,
	);
}

export default function GlitchOverlay({ active }) {
	const canvas = useRef(null);
	const anim = useRef(null);
	const windowSize = useWindowSize();

	const setAnim = val => {
		anim.current = val;
	}

	useEffect(() => {
		const ctx = canvas.current.getContext('2d');
		const { width, height } = windowSize;

		glitch(ctx, width, height, setAnim);

		if(!active && window) {
			window.cancelAnimationFrame(anim.current);
		}

		if(window) {
			return () => window.cancelAnimationFrame(anim.current);
		}
	}, [active]);

	const canvasProps = {
		ref: canvas,
		style: {
			display: active ? 'block' : 'none',
			position: 'absolute',
			top: '0',
			left: '0',
			opacity: active ? '1': '0',
			zIndex: active ? '9999' : '-1',
		},
		...windowSize,
	}

	return <canvas {...canvasProps} />;
}
