import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import styles from './section-heading.module.scss';

export default function SectionHeading(props) {
	const { height, style, children } = props;

	const sty = {
		height: `${height ? height : 'auto'}`,
		...style,
	}
	
	return(
		<h2
			className={styles['section-heading']}
			style={sty}
			{...omit(props, ['height', 'style', 'children'])}
		>
			{children}
		</h2>
	);
}

SectionHeading.propTypes = {
	height: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.any,
}

SectionHeading.defaultProps = {
	height: '30px',
	style: {},
	children: <></>,
}
