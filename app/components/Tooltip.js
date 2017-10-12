import React from 'react';

export const Tooltip = (props) => {
	let {location, text } = props;
	let cssClass = 'tooltiptext';
	return(
		<span className= {location === 'bottom' ? cssClass + ' ttt-bottom' : cssClass + ' ttt-top'}>{text}
		</span>
	);
}