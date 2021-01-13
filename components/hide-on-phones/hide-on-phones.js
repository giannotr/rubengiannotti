import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import styles from './hide-on-phones.module.scss';

export default function HideOnPhones(props) {
	const { currentRoute, excludedRoutes, children } = props;
	const bypass = excludedRoutes.includes(currentRoute);
	const cls = `${styles['hide-on-phones']} ${bypass ? styles['bypass'] : ''}`;

	return(
		<div className={cls} {...omit(props, ['currentRoute', 'excludedRoutes', 'children'])}>
			{children}
		</div>
	);
}

HideOnPhones.propTypes = {
	currentRoute: PropTypes.string,
	excludedRoutes: PropTypes.arrayOf(PropTypes.string),
}

HideOnPhones.defaultProps = {
	currentRoute: '',
	excludedRoutes: [],
}
