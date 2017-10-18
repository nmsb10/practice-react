import React from 'react';

export const Thoughts = (props) => {
	let {thoughts} = props;
	let thought = thoughts.current !== null ? thoughts.fullArray[thoughts.current].q : '[brace yourself for impact]';
	return(
		<div className = 'thoughts-container'>
			<div className = {thoughts.cssClass}>
			{thought}
			</div>
			<span className = 'detail-note'>thoughts</span>
		</div>
	);
}