import React from 'react';

export const WordLine = (props) => {
	let {location, content } = props;
	let cssClass = 'capitalize wl-text';
	return(
		<div className = 'word-line-centered'>
			<div className = 'word-line'>
				<div className = {location === 'ipcForm' ? cssClass + ' wl-ipc-form' : cssClass}>{content}
				</div>
			</div>
		</div>
	);
}