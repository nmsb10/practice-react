import React from 'react';
import { Tooltip } from '../Tooltip';
import { NameContainer } from './NameContainer';
import { InputsContainer } from './InputsContainer';

export const NameInputsContainer = (props) => {
	let{
		fields,
		section,
		specificSection,
		handleChange
	} = props;
	return(
		<div>
			{fields[specificSection].map( (content, i) => {
				let removeSpanTitle = 'remove section: ' + content.name;
				let alertTooltip = {
					request: 'closeAlertTT',
					key: i,
					section: specificSection
				};
				return(
				<div className = 'name-inputs' key = {i}>
				{/*	
					<span
						className = {content.required ? 'hidden' : 'close'}
						title = {removeSpanTitle}
						data-item-clicked = {content.required ? 'invalid' : 'removeSection'}
						data-key = {i}
						data-section = {specificSection}
					>&times;</span>
				
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
				*/}
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
				</div>
				);
			})
			}
		</div>
	);
}