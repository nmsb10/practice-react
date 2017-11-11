import React from 'react';

export const InfoAlert = (props) => {
	let {content, onClick} = props;
	return(
		<div className = {content.cssClass ? content.cssClass : 'hidden'}>
			{content.text.map((w, i) => {
				return(
					<span key = {i} className = {w.css}>
						{w.content}
					</span>
				);
			})
			}
			<button type = 'button' onClick = {onClick}>okay</button>
		</div>
	);
}