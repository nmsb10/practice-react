import React from 'react';

export const SectionHeader = (props) => {
	let {
		title,
		icon,
		sectionOpen
	} = props;
	return(
		<div className = {'ms-header ' + (sectionOpen.bool ? 'open' : 'closed' )}>
			{icon ?
				<i className={icon} aria-hidden="true">
				</i>
				:
				null
			}
			<span className = 'title'>{title}</span>
			<i
				className= { 'fa fa-chevron-up ' + (sectionOpen.bool ? '' : 'fai-up-rotated')}
				aria-hidden="true"
				data-item-clicked = 'minimizeSection'
				data-key1 = {sectionOpen.key.t1}
				data-key2 = {sectionOpen.key.t2}
				title = {sectionOpen.bool ? 'minimize the ' + title + ' section' : 'display the ' + title + ' section'}
			>
			</i>
		</div>
	);
}