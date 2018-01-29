import React from 'react';
import { StandardButton } from '../StandardButton';

export const VerificationBox = (props) => {
	let{content} = props;
	return(
		<div className = {'verification-box ' + (content.cssClass ? content.cssClass : '')}>
			{content.text.map((w, i) => {
				return(
					<div key = {i}>
					{/*}
						<span>{w.area}
						</span>
					*/}
						<span className = {w.css}>
						{w.content} {w.area ? '('+w.area+')' :null}
						</span>
					</div>
				);
			})
			}
			<StandardButton
				cssClass = 'standard-button'
				type = 'button'
				itemClicked = 'closeVerificationBox'
				name = 'okay!'
			/>
		</div>
	);
}