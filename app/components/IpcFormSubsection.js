import React from 'react';
import {FormGroup} from './FormGroup';

export const IpcFormSubsection = (props) => {
	let{subtitle, enableAdd, enableAddTitle, section, onClick, onChange, contentArr} = props;
	return(
		<div>
			<div className = 'subtitle-container'>
				<span className = 'subtitle'>{subtitle}</span>
				{enableAdd === 'true' ?
					<i
						className= 'fa fa-plus fai-add-more'
						aria-hidden="true"
						data-item-clicked = 'addToSection'
						data-section = {section}
						title = {enableAddTitle}
						onClick = {onClick}
					>
					</i>:
					<i className = 'hidden'></i>
				}
			</div>
			<FormGroup
				info = {contentArr}
				section = {section}
				onChange = {onChange}
				onClick = {onClick}
			/>
		</div>
	);
}