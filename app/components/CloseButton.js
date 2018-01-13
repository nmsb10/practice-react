import React from 'react';

export const CloseButton = (props) => {
	let {
		itemClicked,
		handleClick
	} = props;
	//need to have data-item-clicked attribute for both parent and child element because chrome and firefox register a different element when clicked
	return(
		<button
			type = 'button'
			className = 'close-button'
			onClick = {handleClick}
			data-item-clicked = {itemClicked}
			title = 'close'
		>
			<div
				className = 'close-content'
				data-item-clicked = {itemClicked}
			><span>&times;</span>
			</div>
		</button>
	);
}