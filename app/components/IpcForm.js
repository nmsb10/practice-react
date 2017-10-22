import React from 'react';
import {FormGroup} from './FormGroup';
import {WordLine} from './WordLine';

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
							<div className = 'subtitle-container'>
								<span className = 'subtitle'>Rental: Retail</span>
								<i
									className= 'fa fa-plus fai-add-more'
									aria-hidden="true"
									data-item-clicked = 'addToSection'
									data-section = 'income.retail'
									title = 'add a source of retail rental income'
									onClick = {onClick}
								>
								</i>
							</div>
							<FormGroup
								info = {fields.income.retail}
								section = 'income.retail'
								onChange = {handleInputChange}
								onClick = {onClick}
							/>
							<div className = 'subtitle-container'>
								<span className = 'subtitle'>Other</span>
								<i
									className= 'fa fa-plus fai-add-more'
									aria-hidden="true"
									data-item-clicked = 'addToSection'
									data-section = 'income.other'
									title = 'add a source of other income'
									onClick = {onClick}
								>
								</i>
							</div>
							<FormGroup
								info = {fields.income.other}
								section = 'income.other'
								onChange = {handleInputChange}
								onClick = {onClick}
							/>
							<div className = 'subtitle-container'>
								<span className = 'subtitle'>Rental: Residential</span>
								<i
									className= 'fa fa-plus fai-add-more'
									aria-hidden="true"
									data-item-clicked = 'addToSection'
									data-section = 'income.rental'
									title = 'add a source of (residential) rental income'
									onClick = {onClick}
								>
								</i>
							</div>
							<FormGroup
								info = {fields.income.rental}
								section = 'income.rental'
								onChange = {handleInputChange}
								onClick = {onClick}
							/>
						</div>
						<div className = 'content-section'>
							<div className = 'word-line-centered'>
								<div className = 'word-line'>
									<div className = 'capitalize wl-text wl-ipc-form'>expenses
									</div>
								</div>
							</div>
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
						{/*
							when a label has attribute 'for' this makes the input with which it is associated clickable
							htmlFor is necessary because in React, the for attribute in a label is htmlFor (like an html element has className instead of class)
							for the inputs attributes, use defaultValue instead of value because defaultValue allows you to edit the default values
							(otherwise if you use value, must have an onchange handler)
							onChange function: cannot write only `this.updateInput(event)` because in updateInput, this is not defined. As a result, must bind this function to the input. es5 would be this.updateInput(event).bind(this)
							so need to use the es6 syntax and use the "fat arrow" to find this onChange function to this input
							as a result, need to have onChange = {(event) => this.updateInput(event)}
							the first `(event) =>` is passed into the function from the input element
						*/}
					{/*
						http://fontawesome.io/examples/#animated
						http://fontawesome.io/icons/
					*/}
						<i className ="fa fa-spinner fa-pulse fa-3x" aria-hidden = 'true'></i>
						<button
							type="submit"
							className=''
							id="runSearch"
							>
							get answers
						</button>	
					</div>
				</form>
			</div>
		);
	}
}