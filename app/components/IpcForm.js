import React from 'react';
import {FormGroup} from './FormGroup';
import {WordLine} from './WordLine';
import {IpcFormSubsection} from './IpcFormSubsection';

export class IPCForm extends React.Component{
	render(){
		let {
			fields,
			handleInputChange,
			handleSubmit,
			onClick
		} = this.props;
		return(
			<div className = 'ipc-form-container'>
				<form onSubmit = {(event) => handleSubmit(event)}>
					<div className = 'content'>
						<div className = 'content-section'>
							<WordLine
								location = 'ipcForm'
								content = 'purchase price details'
							/>
							<FormGroup
								info = {fields.purchasePrice}
								section = 'purchasePrice'
								onChange = {handleInputChange}
								onClick = {onClick}
							/>
						</div>
						<div className = 'content-section'>
							<WordLine
								location = 'ipcForm'
								content = 'income'
							/>
							<IpcFormSubsection
								subtitle = 'Rental: Retail'
								section = 'income.retail'
								enableAdd = 'true'
								enableAddTitle = 'add a source of retail rental income'
								onClick = {onClick}
								onChange = {handleInputChange}
								contentArr = {fields.income.retail}
							/>
							<IpcFormSubsection
								subtitle = 'Other'
								section = 'income.other'
								enableAdd = 'true'
								enableAddTitle = 'add a source of other income'
								onClick = {onClick}
								onChange = {handleInputChange}
								contentArr = {fields.income.other}
							/>
							<IpcFormSubsection
								subtitle = 'Rental: Residential'
								section = 'income.rental'
								enableAdd = 'true'
								enableAddTitle = 'add a source of (residential) rental income'
								onClick = {onClick}
								onChange = {handleInputChange}
								contentArr = {fields.income.rental}
							/>
						</div>
						<div className = 'content-section'>
							<WordLine
								location = 'ipcForm'
								content = 'expenses'
							/>
							<IpcFormSubsection
								subtitle = 'Carrying Costs'
								section = 'expenses.carryingCosts'
								enableAdd = 'true'
								enableAddTitle = 'add a different carrying cost'
								onClick = {onClick}
								onChange = {handleInputChange}
								contentArr = {fields.expenses.carryingCosts}
							/>
							<IpcFormSubsection
								subtitle = 'Utilities'
								section = 'expenses.utilities'
								enableAdd = 'true'
								enableAddTitle = 'add another utilities expense'
								onClick = {onClick}
								onChange = {handleInputChange}
								contentArr = {fields.expenses.utilities}
							/>
							<IpcFormSubsection
								subtitle = 'Other'
								section = 'expenses.other'
								enableAdd = 'true'
								enableAddTitle = 'add a miscellaneous expense'
								onClick = {onClick}
								onChange = {handleInputChange}
								contentArr = {fields.expenses.other}
							/>
						</div>
						{/*
							<div className = 'form-group'>
								<label htmlFor = 'typ'>property type:</label>
								{/* use value attribute to set the default select html element value
								<select
									value = {spfields.typ}
									className=''
									id="typ"
									onChange = {(event) => this.handleInputChange(event)}
								>
									<option value='AT'>attached (condo, townhome)</option>
									<option value='DE'>detached (single family home)</option>
								</select>
							</div>
						*/}
						<button
							type="submit"
							className=''
							id="runSearch"
							>
							verify & calculate
						</button>	
					</div>
				</form>
			</div>
		);
	}
}