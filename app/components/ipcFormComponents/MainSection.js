import React from 'react';
import { SectionHeader } from './SectionHeader';
import { SectionBody } from './SectionBody';

export const MainSection = (props) => {
	let {
		sectionTitle,
		sectionT2,
		icon,
		fields,
		fieldsGuide,
		handleChange,
		tierTwo,
		sectionOpen,
		handleMouseEnter,
		handleMouseLeave
	} = props;
	return(
		<div className = 'main-section'>
			<SectionHeader
				title = {sectionTitle}
				icon = {icon}
				sectionOpen = {sectionOpen}
			/>
			<SectionBody
				sectionT2 = {sectionT2}
				guide = {fieldsGuide}
				fields = {fields}
				handleChange = {handleChange}
				sectionOpen = {sectionOpen}
				handleMouseEnter = {handleMouseEnter}
				handleMouseLeave = {handleMouseLeave}
			/>
		</div>
	);
}