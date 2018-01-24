import React from 'react';

export const InputsSection = (props) => {
	let {
		id,
		i,
		section,
		period,
		value,
		handleChange
	} = props;
	return(
		<div className = 'input-label'>
			<div className = {'input-section' + (value.preEntry ? ' ta-left' : ' ta-right')}>
				<label htmlFor = {id}>
					<span className = ''>{value.preEntry}</span>
				</label>
				<span className = ''>
					<input
						type='text'
						id={id}
						data-key = {i}
						data-request = 'changeFieldValue'
						data-val-period = {period}
						data-section = {section}
						value = {period ? value[period] : value.amount}
						placeholder = {value.notice ? value.notice : value.placeholder}
						onChange = {handleChange}
					/>
				</span>
				<span className = ''>
					<label htmlFor = {id}>{value.postEntry}
					</label>
				</span>
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
			{ period ? 
			<div className = 'label-section'>
				<label htmlFor = {id}>
					<span className = ''>{period}</span>
				</label>
			</div>
				:
				null
			}
		</div>
	);
}