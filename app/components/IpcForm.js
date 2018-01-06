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
			handleClick
		} = this.props;
		return(
			<div className = 'ipc-form-container'>
				<form onSubmit = {(event) => handleSubmit(event)}>
					<div className = 'content'>
						<a
							href = 'https://youtu.be/pEM41vtIT4Y'
							target = '_blank'
							title = 'view the calculator demo on YouTube'
						>view calculator demonstration
						</a>
						<div className = 'content-section'>
							<WordLine
								location = 'ipcForm'
								content = 'purchase price details'
							/>
							<FormGroup
								info = {fields.price.purchasePrice}
								section = 'purchasePrice'
								handleChange = {handleInputChange}
								handleClick = {handleClick}
							/>
						</div>
						<div className = 'content-section'>
							<WordLine
								location = 'ipcForm'
								content = 'income'
							/>
							<IpcFormSubsection
								subtitle = 'Rental: Residential'
								section = 'income.rental'
								enableAdd = 'true'
								enableAddTitle = 'add a source of (residential) rental income'
								handleClick = {handleClick}
								handleChange = {handleInputChange}
								contentArr = {fields.income.rental}
							/>
							<IpcFormSubsection
								subtitle = 'Rental: Retail'
								section = 'income.retail'
								enableAdd = 'true'
								enableAddTitle = 'add a source of retail rental income'
								handleClick = {handleClick}
								handleChange = {handleInputChange}
								contentArr = {fields.income.retail}
							/>
							<IpcFormSubsection
								subtitle = 'Other'
								section = 'income.other'
								enableAdd = 'true'
								enableAddTitle = 'add a source of other income'
								handleClick = {handleClick}
								handleChange = {handleInputChange}
								contentArr = {fields.income.other}
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
								handleClick = {handleClick}
								handleChange = {handleInputChange}
								contentArr = {fields.expenses.carryingCosts}
							/>
							<IpcFormSubsection
								subtitle = 'Utilities'
								section = 'expenses.utilities'
								enableAdd = 'true'
								enableAddTitle = 'add another utilities expense'
								handleClick = {handleClick}
								handleChange = {handleInputChange}
								contentArr = {fields.expenses.utilities}
							/>
							<IpcFormSubsection
								subtitle = 'Other'
								section = 'expenses.other'
								enableAdd = 'true'
								enableAddTitle = 'add a miscellaneous expense'
								handleClick = {handleClick}
								handleChange = {handleInputChange}
								contentArr = {fields.expenses.other}
							/>
						</div>
						{/*
							<div className = 'form-group'>
								<label htmlFor = 'typ'>property type:</label>
								{/* use value attribute to set the default select html element value
								<select
									value = {fields.value}
									className=''
									id="typ"
									onChange = {(event) => this.handleInputChange(event)}
								>
									<option value='spaghetti'>spaghetti</option>
									<option value='gnocchi'>gnocchi</option>
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