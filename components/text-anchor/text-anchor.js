import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

export default function TextAnchor(props) {
	const { children } = props;
	return <a data-content={children} {...omit(props, ['children'])}>{children}</a>;
}

TextAnchor.propTypes = {
	children: PropTypes.string.isRequired,
}
