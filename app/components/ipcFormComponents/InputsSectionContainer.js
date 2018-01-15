import React from 'react';
import { Tooltip } from '../Tooltip';
import { NameContainer } from './NameContainer';
import { InputsContainer } from './InputsContainer';

export const InputsSectionContainer = (props) => {
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
				<div className = 'inputs-section' key = {i}>
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
					
					
				{/*
					<label htmlFor = {content.name ? content.name+i : content.field+i}>
						<span className = 'label-span'>label span here</span>
					</label>
					<div className = ''>
						<span className = 'contents'>{content.value.preEntry}{content.preEntry ? 'contents-wrapper ta-left' : content.postEntry ? 'contents-wrapper ta-right' : 'contents-wrapper'}</span>
						<span className = 'input-span'>
							<input
								className = ''
								type='text'
								id={content.name ? content.name+i : content.field+i}
								data-key = ''
								data-section = ''
								data-validate = ''
								value = {content.value.amount? content.value.amount : content.value.monthly}
								placeholder = {content.value.placeholder}
								onChange = {handleChange}
							/>
						</span>
						<span className = 'contents'>{content.value.postEntry}</span>
					</div>
				*/}
					<i
						className="fa fa-question-circle-o"
						aria-hidden="true"
					></i>
				</div>
				);
			})
			}
		</div>
	);
}