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
	let tierOne = ['fields', 'assumptions'];
	let tierTwo = [['purchasePrice', 'income', 'expenses'],['financing', 'other']];
	let tierThree = [[[],['rental', 'retail', 'other'],['carryingCosts', 'utilities', 'other']],[]];
	return(
		<div
			className = {'ipc-form-ad' + (view === 'showForm' ? ' open' : '')}
			data-item-clicked = 'closeForm'
			onClick = {handleClick}
		>
			<div className = {'cover' + (view === 'showForm' ? ' display-ipcform' : ' remove-ipcform')}>
				<CloseButton
					itemClicked = 'closeForm'
					handleClick = {handleClick}
				/>
				<div className = 'content'>
					<div>
						<p>
							welcome to Jonathon Nagatani's
							<br/>
							Investment Property Capitalization Rate Calculator
						</p>
						<p>
							Please complete the following fields (if known or estimated), then click "verify & calculate."
						</p>
					</div>
					<div>
						<form onSubmit = {(event) => handleSubmit(event)}>
							<i className="fa fa-question-circle-o" aria-hidden="true"></i>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}