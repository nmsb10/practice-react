import React from 'react';
import { SectionHeader } from './SectionHeader';
import { SectionBody } from './SectionBody';

export const MainSection = (props) => {
	let {
		sectionTitle,
		icon,
		fields,
		fieldsGuide,
		fieldsBool,
		handleChange
	} = props;
	console.log(fields);
	console.log(fieldsGuide);
	return(
		<div className = 'main-section'>
			<SectionHeader
				title = {sectionTitle}
				icon = {icon}
			/>
			<SectionBody
				guide = {fieldsGuide}
				fields = {fields}
				handleChange = {handleChange}
			/>
		</div>
	);
}