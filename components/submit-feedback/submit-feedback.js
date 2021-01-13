import React from 'react';
import PropTypes from 'prop-types';
import getClassNames from '../../utility/get-class-names';

export default function SubmitFeedback({
	isSubmitting,
	submitSuccess,
	submitCount,
	loader,
	cssStyles,
	cls,
	clsSuccess,
	clsFailure,
	feedbackSuccess,
	feedbackFailure,
}) {
	return(
		<>
			{!isSubmitting
				? submitSuccess
					? <div className={getClassNames([cls, clsSuccess], cssStyles)}>
							{feedbackSuccess}
						</div>
					: submitCount > 0 && typeof submitSuccess === 'boolean'
						? <div className={getClassNames([cls, clsFailure], cssStyles)}>
								{feedbackFailure}
							</div>
						: ''
				: <div style={{margin: '20px auto'}}>{loader}</div>
			}
		</>
	);
}

SubmitFeedback.propTypes = {
	isSubmitting: PropTypes.bool.isRequired,
	submitSuccess: PropTypes.bool.isRequired,
	submitCount: PropTypes.number,
	loader: PropTypes.node,
	cssStyles: PropTypes.object,
	cls: PropTypes.string,
	clsSuccess: PropTypes.string,
	clsFailure: PropTypes.string,
	feedbackSuccess: PropTypes.string.isRequired,
	feedbackFailure: PropTypes.string.isRequired,
}

SubmitFeedback.defaultProps = {
	submitCount: 0,
	loader: <></>,
	cssStyles: {},
	cls: '',
	clsSuccess: '',
	clsFailure: '',
}
