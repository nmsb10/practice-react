import React from 'react';

export const ExpandingBorder = (props) => {
	let { elementType, text } = props;
	return(
		<div className = 'ex-bor-container'>
			{elementType === 'button' &&
				<button className = 'ex-bor-content'>
					{text}
				</button>
			}
			{elementType === 'li' &&
				<li className = 'ex-bor-content'>
					{text}
				</li>
			}
			<div className = 'expanding-border'>
			</div>
		</div>
	);
}