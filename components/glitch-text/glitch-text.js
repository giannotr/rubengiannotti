import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import styles from './glitch-text.module.scss';

export default function GlitchText(props) {
	const { crt, children } = props;
	const __cls = `glitch-text${crt ? '-crt' : ''}`;

	return(
		<div className={styles[__cls]} data-content={children} {...omit(props, ['crt', 'children'])}>
			{children}
		</div>
	);
}

GlitchText.propTypes = {
	children: PropTypes.string,
	crt: PropTypes.bool,
}

GlitchText.defaultProps = {
	children: '',
	crt: false,
}
