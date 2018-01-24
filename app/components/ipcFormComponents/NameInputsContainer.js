import React from 'react';
import { Tooltip } from '../Tooltip';
import { NameContainer } from './NameContainer';
import { InputsContainer } from './InputsContainer';

export const NameInputsContainer = (props) => {
	let{
		fields,
		section,
		specificSection,
		handleChange,
		handleMouseEnter,
		handleMouseLeave
	} = props;
	return(
		<div>
			{fields[specificSection].map( (content, i) => {
				let removeSpanTitle = 'remove the ' + content.name + ' input field';
				let alertTooltip = {
					request: 'closeAlertTT',
					key: i,
					section: section
				};
				return(
				<div className = {'name-inputs ' + (content.tooltip && content.tooltip.visible ? 'display-ttt' : '')} key = {i}>			
					<Tooltip
						content = {content.tooltip ? content.tooltip : ''}
						inputName = {content.name ? content.name : ''}
						displayType = 'normal'
					/>
					<Tooltip
						content = {content.validation ? content.validation : ''}
						displayType = 'alert'
						alertTooltip = {alertTooltip}
					/>
					< NameContainer
						handleChange = {handleChange}
						section = {section}
						name = {content.name}
						i = {i}
						field = {content.field}
					/>
					< InputsContainer
						handleChange = {handleChange}
						section = {section}
						content = {content}
						i = {i}
					/>
					<span
						className = {content.required || section === 'financing.terms' || section === 'other.terms' ? 'hidden' : 'close'}
						title = {removeSpanTitle}
						data-item-clicked = {content.required ? 'invalid' : 'removeSection'}
						data-key = {i}
						data-section = {section}
					>&times;</span>
					<i
						className = {'fa fa-question-circle-o ' + (content.tooltip && content.tooltip.visible ? 'fa-question-selected' : '')}
						aria-hidden="true"
						onMouseEnter = {handleMouseEnter}
						onMouseLeave = {handleMouseLeave}
						data-item-clicked = 'displayTooltip'
						data-key = {i}
						data-section = {section}
					></i>
				</div>
				);
			})
			}
		</div>
	);
}