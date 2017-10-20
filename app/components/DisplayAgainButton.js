import React from 'react';

export const DisplayAgainButton = (props) => {
	let{onClick} = props;
	return(
		<button 
			className = 'displayAgainButton'
			id = 'showTestimonialsButton'
			onClick = {onClick}
		>show testimonials again
		</button>
	);
}