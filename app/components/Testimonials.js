import React from 'react';

export const Testimonials = (props) => {
	let{content} = props;
	let testimonial = content.current !== null ? content.fullArray[content.current].quote : 'testimonials for Jonathon Nagatani...';
	let source = content.current !== null ? content.fullArray[content.current].source : 'source of the testimonial';
	return(
		<div className = 'testimonials-container'>
			<div className = {content.cssClass}>
				<span className = 'testimonial'>
					"{testimonial}"
					{/*
						{content.fullArray[content.current].quote ? '"' + content.fullArray[content.current].quote +'"' : 'testimonials for Jonathon Nagatani...'}
					*/}
				</span>
				<span className = 'source'>
					~{source}
				</span>
			</div>
			<span className = 'detail-note'>testimonials for Jonathon Nagatani</span>
		</div>
	);
}