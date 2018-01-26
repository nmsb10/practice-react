import React from 'react';

export const NameContainer = (props) => {
	let {
		handleChange,
		section,
		name,
		i,
		field,
		tooltip,
		handleMouseEnter,
		handleMouseLeave
	} = props;
	return(
		<div className = 'name-container'>
			<div className = 'name'>
				{name ?
				<input
					className = ''
					type='text'
					title = {name}
					id={name}
					data-key = {i}
					data-request = 'changeFieldName'
					data-section = {section}
					value = {name}
					placeholder = {name}
					onChange = {handleChange}
				/>
				:
				<label htmlFor = {field+i}>
					<span className = 'label-span'>{field}</span>
				</label>
				}
			</div>
			<i
				className = {'fa fa-question-circle-o ' + (tooltip && tooltip.visible ? 'fa-question-selected' : '')}
				aria-hidden="true"
				onMouseEnter = {handleMouseEnter}
				onMouseLeave = {handleMouseLeave}
				data-item-clicked = 'displayTooltip'
				data-key = {i}
				data-section = {section}
			></i>
		</div>
	);
}