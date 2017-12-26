import React from 'react';
import { CloseButton } from './CloseButton';

export const IpcFormDD = (props) => {
	let {
		view,
		fields,
		assumptions,
		handleClick,
		handleInputChange,
		handleSubmit
	} = props;
	return(
		<div
			className = {'ipc-form-ad' + (view === 'showForm' ? ' open test-modal-open' : '')}
			data-item-clicked = 'closeForm'
			onClick = {handleClick}
		>
			<div className = {'content' + (view === 'showForm' ? ' animate-down' : ' animate-up')}>
				<CloseButton
					itemClicked = 'closeForm'
					handleClick = {handleClick}
				/>
				<div className = 'inside'>
					hello
				</div>
			</div>
		</div>
	);
}