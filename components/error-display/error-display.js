import React from 'react';
import PropTypes from 'prop-types';
import styles from './error-display.module.scss';

export default function ErrorDisplay({ forName, touched, errors, style }) {
	const sty = Object.keys(style).length ? { style } : {};

	return(
		<div className={styles['error-display']} {...sty}>
			{touched[forName] && errors[forName] ? errors[forName] : ''}
		</div>
	);
}

ErrorDisplay.propTypes = {
	forName: PropTypes.string.isRequired,
	touched: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	style: PropTypes.object,
}

ErrorDisplay.defaultProps = {
	style: {},
}
