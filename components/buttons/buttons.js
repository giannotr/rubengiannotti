import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import ReCAPTCHA from 'react-google-recaptcha';
import simpleHash from '../../utility/simple-hash';
import { targetBlank } from '../../utility/base-styles';
import Triangle from '../../assets/icons/triangle.svg';
import styles from './buttons.module.scss';

const extractTextContent = element => {
	if(typeof element === 'string') {
		return element;
	} else {
		return extractTextContent(element.props.children);
	}
}

export function Button(props) {
	const { href, children, target, rel } = props;

	const tgt = target ? { target, rel } : {...targetBlank}

	const splitText = extractTextContent(children).split('').map(char => (
		<span key={simpleHash(char)} style={{animationDelay: `${Math.random() + .25}s`}}>{char}</span>
	));

	const innerText = href ? <a href={href} {...tgt}>{splitText}</a> : splitText;

	return(
		<div className={styles['button-wrapper']} {...omit(props, ['href', 'children'])}>
			<div className={styles['button-container']}>
				{innerText}
			</div>
		</div>
	);
}

Button.propTypes = {
	children: PropTypes.any,
	href: PropTypes.string,
}

Button.defaultProps = {
	children: '',
	href: '',
}

export function SubmitButtonWithCaptcha({
	captchaVerified,
	apikey,
	onCaptchaChange,
	className,
	disabled,
	children,
}) {
	return(
		<>
			{captchaVerified
				? <button
						type="submit"
						data-content={children}
						className={className}
						disabled={disabled}
					>
						{children}
					</button>
				: <ReCAPTCHA
						theme="dark"
						style={{margin: '20px auto'}}
						sitekey={apikey}
						onChange={onCaptchaChange}
					/>
			}
		</>
	);
}

SubmitButtonWithCaptcha.propTypes = {
	captchaVerified: PropTypes.bool.isRequired,
	apikey: PropTypes.string.isRequired,
	onCaptchaChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	children: PropTypes.string.isRequired,
}

SubmitButtonWithCaptcha.defaultProps = {
	className: '',
	disabled: false,
}

export function ChevronLeft() {
	return <div className={styles['chevron-container__left']}><Triangle /></div>;
}

export function ChevronRight() {
	return <div className={styles['chevron-container__right']}><Triangle /></div>;
}
