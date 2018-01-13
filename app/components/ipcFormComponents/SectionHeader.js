import React from 'react';

export const SectionHeader = (props) => {
	let {
		title,
		icon
	} = props;
	return(
		<div className = 'ms-header'>
			{icon ?
				<i className={icon} aria-hidden="true">
				</i>
				:
				null
			}
			{title}
			<i
				className= "fa fa-chevron-up fai-up"
				aria-hidden="true"
				data-item-clicked = 'minimizeSection'
				data-key = ''
				data-section = ''
			>
			</i>
		</div>
	);
}