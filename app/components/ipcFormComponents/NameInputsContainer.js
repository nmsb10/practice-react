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
						inputName = {content.name ? content.name : content.field ? content.field : ''}
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
						tooltip = {content.tooltip}
						handleMouseEnter = {handleMouseEnter}
						handleMouseLeave = {handleMouseLeave}
					/>
					< InputsContainer
						handleChange = {handleChange}
						section = {section}
						content = {content}
						i = {i}
					/>
					<span
						className = {content.required || section === 'financing.terms.assumptions' || section === 'other.terms.assumptions' ? 'hidden' : 'close'}
						title = {removeSpanTitle}
						data-item-clicked = {content.required || section === 'financing.terms.assumptions' || section === 'other.terms.assumptions' ? 'invalid' : 'removeSection'}
						data-key = {i}
						data-section = {section}
					>&times;</span>
				</div>
				);
			})
			}
		</div>
	);
}