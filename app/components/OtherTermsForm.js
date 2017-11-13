import React from 'react';

export const OtherTermsForm = (props) => {
	let{terms, section, title, handleChange} = props;
	return(
		<div className = 'form-container'>
			<span className = 'capitalize'>{title}</span>
			<form>
				{terms.map( (content, i) => {
					return(							
						<div className = 'input-container' key = {i} title = {content.title || content.field}>
							<label htmlFor = {content.field}>
								<span className = 'label-span'>{content.field}</span>
							</label>
							<div className = {content.preEntry ? 'contents-wrapper ta-left' : content.postEntry ? 'contents-wrapper ta-right' : 'contents-wrapper'}>
								<span className = 'contents'>{content.preEntry}</span>
								<span className = 'input-span'>
									<input
										className = {content.preEntry ? 'ta-left' : content.postEntry ? 'ta-right' : ''}
										type='text'
										id={content.field}
										data-key = {i}
										data-section = {section}
										data-validate = {content.valueType}
										value = {content.amount}
										placeholder = {content.notice || content.field}
										onChange = {handleChange}
									/>
								</span>
								<span className = 'contents'>{content.postEntry}</span>
							</div>
						</div>
					);
				})
				}
			</form>
		</div>
	);
}