import React from 'react';

export const CloseButton = (props) => {
	let {
		itemClicked,
		handleClick
	} = props;
	return(
		<button
			type = 'button'
			className = 'close-button'
			data-item-clicked = {itemClicked}
			onClick = {handleClick}
			title = 'close'
		><div className = 'close-content'>&times;</div>
		</button>
	);
}