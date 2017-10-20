import React from 'react';
import {DisplayAgainButton} from './DisplayAgainButton';

export const Testimonials = (props) => {
	let{content, onClick} = props;
	let testimonial = content.currentSelection !== null ? content.currentSelection.quote : 'testimonials for Jonathon Nagatani...';
	let source = content.currentSelection !== null ? content.currentSelection.source : 'satisfied client';
	let style = content.cssClass === '' ? 'testimonial-content tes-con-reg-animation' : content.cssClass;
	return(
		<div className = 'testimonials-container'>
			{!content.displaying ?
				<DisplayAgainButton
					onClick = {onClick}
				/>
				:
				<div className = {style}>
					<span className = 'testimonial'>
						"{testimonial}"
					</span>
					<span className = 'source'>
						~{source}
					</span>
				</div>
			}
			<span className = 'detail-note'>testimonials for Jonathon Nagatani</span>
		</div>
	);
}