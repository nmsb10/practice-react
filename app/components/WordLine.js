import React from 'react';

export const WordLine = (props) => {
	let {
		content
	} = props;
	let cssClass = 'capitalize wl-text';
	let insideClassName = content.location === 'ipcForm' ? cssClass + ' wl-ipc-form' : cssClass;
	return(
		<div className = 'word-line-centered'>
			<div className = 'word-line'>
				<div
					className = {insideClassName}
					data-item-clicked = {content.itemClicked}
					data-section = {content.section}
					title = {content.title}
				>
					<span
						data-section = {content.section}
						data-item-clicked = {content.itemClicked}
					>{content.displayName ? content.displayName : content.name}</span>
					{content.location === 'ms-body' ?
					<i
						className= 'fa fa-plus'
						aria-hidden="true"
						data-section = {content.section}
						data-item-clicked = {content.itemClicked}
					></i>
					:
					null
					}
				</div>
			</div>
		</div>
	);
}