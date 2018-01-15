import React from 'react';
import { InputsSection } from './InputsSection';

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
			< InputsSection
				id = {content.name ? content.name + '-value'+ i : content.field + i}
				i = {i}
				section = {section}
				value = {content.value}	
				handleChange = {handleChange}
			/>
			:
			null
		}
		{ content.value.monthly === '' || content.value.monthly ? 
			< InputsSection
				id = {content.name + '-valueMonthly'+i}
				i = {i}
				section = {section}
				period = 'monthly'
				value = {content.value}
				handleChange = {handleChange}
			/>
			:
			null
		}
		{ content.value.annual === '' || content.value.annual ? 
			< InputsSection
				id = {content.name + '-valueAnnual'+i}
				i = {i}
				section = {section}
				period = 'annual'
				value = {content.value}
				handleChange = {handleChange}
			/>
			:
			null
		}
			<i
				className="fa fa-question-circle-o"
				aria-hidden="true"
			></i>
		</div>
	);
}