import React from 'react';

export const OtherTermsForm = (props) => {
	let{terms, section, title, onChange} = props;
	return(
		<div className = 'terms-form-container'>
			<span className = 'capitalize'>{title}</span>
			<form>
				{terms.map( (content, i) => {
					return(
						<div key = {i} className = '' title = {content.field}>
							<label htmlFor = {content.field}>
								<span className = 'label-span'>{content.field}</span>
							</label>
							<input
								className = ''
								type='text'
								id={content.field}
								data-key = {i}
								data-section = {section}
								data-validate = {content.valueType}
								value = ''
								placeholder = ''
							/>
						{/*
							<input
								className = ''
								type='text'
								id={content.field}
								data-key = {i}
								data-section = {section}
								data-validate = {content.valueType}
								value = {content.amount}
								placeholder = ''
								onChange = {onChange}
							/>
						*/}
						</div>
					);
				})
				}

			</form>
		</div>
	);
}