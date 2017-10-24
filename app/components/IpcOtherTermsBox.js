import React from 'react';

export const IPCOtherTermsBox  = (props) => {
	let {assumptions, onChange} = props;
	return(
		<div className = 'ipc-other-terms hidden'>
			<div>assumptions.financing here
			</div>
			<div>assumptions.other here
			</div>
		</div>
	);
}