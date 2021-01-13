import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import GlitchText from '../glitch-text/glitch-text';
import Cross from '../../assets/icons/cross.svg';
import styles from './containers.module.scss';

export function Wrapper(props) {
	const { background, backgroundOverlay, children } = props;

	const sty = {
		background: `
			${background ? `url(${background})` : '#2d2727'}
			${backgroundOverlay ? 'rgba(2, 2, 2, 0.75)' : ''}
		`,
	}

	return(
		<div
			className={styles['wrapper']}
			style={sty}
			{...omit(props, ['background', 'backgroundOverlay', 'children'])}
		>
			{children}
		</div>
	);
}

export function Content(props) {
	return(
		<div {...props} className={styles['content']}>{props.children}</div>
	);
}

export function PadContent(props) {
	return(
		<div {...props} className={styles['pad-content']}>{props.children}</div>
	);
}

export const ScrollContent = React.forwardRef((props, ref) => {
	const { bypass, height, offset, transparent, style, children } = props;

	const sty = {
		height: bypass ? 'auto' : height ? height : `calc(100vh - ${offset ? offset : '0'} - 50px)`,
		overflowY: `${bypass ? 'hidden' : 'auto'}`,
		...style,
	}

	const cls = `${styles['scroll-content']} ${transparent ? styles['transparent'] : ''}`;

	return(
		<div
			className={cls}
			style={sty}
			ref={ref}
			{...omit(props, ['bypass', 'height', 'offset', 'transparent', 'style', 'children'])}
		>
			{children}
		</div>
	);
});

export function Overlay(props) {
	const { expanded, children } = props;

	const cls = `${styles['overlay']} ${expanded ? styles['expanded'] : ''}`

	return(
		<div className={cls} {...omit(props, ['expanded', 'children'])}>
			{children}
		</div>
	);
}

export function ModalContent(props) {
	const { expanded, style, children } = props;

	const sty = {
		opacity: `${expanded ? '1' : '0'}`,
		pointerEvents: `${expanded ? 'auto' : 'none'}`,
		transition: `all .25s ease-in ${expanded ? '.5s' : '.175s'}`,
		...style,
	}

	return(
		<div
			className={styles['modal-content']}
			style={sty}
			{...omit(props, ['expanded', 'style', 'children'])}
		>
			{children}
		</div>
	);
}

export function ModalHeader(props) {
	return(
		<div {...props} className={styles['modal-header']}>{props.children}</div>
	);
}

export function Modal({ expanded, setExpanded, title, children }) {
	const [iconCls, setIconCls] = useState('');

	const handleClickCross = () => {
		setIconCls('animated');
		setExpanded(false);
		setTimeout(() => {
			setIconCls('');
		}, 1000);
	}

	return(
		<ModalContent expanded={expanded}>
			<ModalHeader>
				<h3 style={{margin: '0 32px'}}><GlitchText>{title}</GlitchText></h3>
				<Cross className={styles[iconCls]} onClick={handleClickCross} />
			</ModalHeader>
			{children}
		</ModalContent>
	);
}

Modal.propTypes = {
	expanded: PropTypes.bool,
	setExpanded: PropTypes.func,
	title: PropTypes.string,
	children: PropTypes.any,
}

Modal.defaultProps = {
	expanded: false,
	setExpanded: () => {},
	title: '',
	chidren: '',
}
