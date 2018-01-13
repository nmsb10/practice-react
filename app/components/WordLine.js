import React from 'react';

export const WordLine = (props) => {
	let {location, content } = props;
	let cssClass = 'capitalize wl-text';
	return(
		<div className = 'word-line-centered'>
			<div className = 'word-line'>
				<div
					className = {location === 'ipcForm' ? cssClass + ' wl-ipc-form' : cssClass}

				>
					<span>{content}</span>
					{location === 'ms-body' ?
					<i
						className= 'fa fa-plus fai-add-more'
						aria-hidden="true"
						data-item-clicked = 'addToSection'
						data-section = ''
						title = ''
						onClick = ''
					></i>
					:
					null
					}
				</div>
			</div>
		</div>
	);
}