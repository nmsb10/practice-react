import React from 'react';

export const StandardButton = (props) => {
	let{
		name,
		cssClass,
		type,
		id,
		handleClick,
		itemClicked,
		title
	} = props;
	return(
		<button
			type = {type}
			className = {cssClass}
			id = {id}
			onClick = {handleClick}
			data-item-clicked = {itemClicked}
			title = {title}
		>{name}
		</button>
	);
}