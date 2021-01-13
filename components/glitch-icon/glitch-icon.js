import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import styles from './glitch-icon.module.scss';

export default function GlitchIcon (props) {
	return <div className={styles['glitch-icon']} {...omit(props, ['children'])}>{props.children}</div>;
}

GlitchIcon.propTypes = {
	children: PropTypes.element,
}

GlitchIcon.defaultProps = {
	children: <Fragment />,
}
