import React from 'react';

export const InputsContainer = (props) => {
	let {
		handleChange,
		section,
		content,
		i
	} = props;
	return(
		<div className = 'inputs-container'>
		{ content.value.amount === '' || content.value.amount ?
			<div className = 'input-label-container'>
				<div className = 'section-value-wrapper'>
					<span className = 'contents'>{content.value.preEntry}</span>
					<span className = 'input-container'>
						<input
							type='text'
							id={content.name + '-value'+ i}
							data-key = {i}
							data-request = 'changeFieldValue'
							data-section = {section}
							value = {content.value.amount}
							placeholder = {content.value.placeholder}
							onChange = {handleChange}
						/>
					</span>
					<span className = 'contents'>{content.value.postEntry}</span>
				</div>
				<label htmlFor = {content.name + '-value' + i}>
					<span className = 'label-span'>???</span>
				</label>
			</div>
			:
			null
		}
		{ content.value.monthly === '' || content.value.monthly ? 
			<div className = 'input-label-container'>
				<div className = 'section-value-wrapper'>
					<span className = 'contents'>{content.value.preEntry}</span>
					<span className = 'input-container'>
						<input
							type='text'
							id={content.name + '-valueMonthly'+i}
							data-key = {i}
							data-request = 'changeFieldValue'
							data-val-period = 'monthly'
							data-section = {section}
							value = {content.value.monthly}
							placeholder = {content.value.placeholder}
							onChange = {handleChange}
						/>
					</span>
					<span className = 'contents'>{content.value.postEntry}</span>
				</div>
				{/*
					when a label has attribute 'for' this makes the input with which it is associated clickable
					htmlFor is necessary because in React, the for attribute in a label is htmlFor (like an html element has className instead of class)
					for the inputs attributes, use defaultValue instead of value because defaultValue allows you to edit the default values
					(otherwise if you use value, must have an onchange handler)
					onChange function: cannot write only `this.updateInput(event)` because in updateInput, this is not defined. As a result, must bind this function to the input. es5 would be this.updateInput(event).bind(this)
					so need to use the es6 syntax and use the "fat arrow" to find this onChange function to this input
					as a result, need to have onChange = {(event) => this.updateInput(event)}
					the first `(event) =>` is passed into the function from the input element
				*/}
				<label htmlFor = {content.name + '-valueMonthly' + i}>
					<span className = 'label-span'>monthly</span>
				</label>
			</div>
			:
			null
		}
		{ content.value.annual === '' || content.value.annual ?
			<div className = 'input-label-container'>
				<div className = 'section-value-wrapper'>
						<span className = 'contents'>{content.value.preEntry}</span>
						<span className = 'input-container'>
							<input
								type='text'
								id={content.name + '-valueAnnual'+i}
								data-key = {i}
								data-request = 'changeFieldValue'
								data-val-period = 'annual'
								data-section = {section}
								value = {content.value.annual}
								placeholder = {content.value.placeholder}
								onChange = {handleChange}
							/>
						</span>
						<span className = 'contents'>{content.value.postEntry}</span>
					</div>
					<label htmlFor = {content.name + '-valueAnnual' + i}>
						<span className = 'label-span'>annual</span>
					</label>
			</div>
			:
			null
		}
		</div>
	);
}