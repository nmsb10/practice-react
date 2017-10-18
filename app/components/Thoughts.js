import React from 'react';

export const Thoughts = (props) => {
	let {thoughts} = props;
	let thought = thoughts.currentSelection !== null ? thoughts.currentSelection.q : '[brace yourself for impact]';
	return(
		<div className = 'thoughts-container'>
			<div className = {thoughts.cssClass}>
			{thought}
			</div>
			<span className = 'detail-note'>thoughts</span>
		</div>
	);
}