import React from 'react';
import {FormGroup} from './FormGroup';

export class IPCForm extends React.Component{
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	//form event handlers
	handleSubmit(event){
		event.preventDefault();
		this.props.calculate();
	}
	handleInputChange(e){
		this.props.updateForm(e.target);
	}
	render(){
		let {
			fields,
		} = this.props;
		return(
			<form className = 'search-form-1' onSubmit = {(event) => this.handleSubmit(event)}>
				<div className = 'sf-content'>
					<div>purchase price information</div>
					<FormGroup
						info = {fields.purchasePrice}
						section = 'purchasePrice'
						handleInputChange = {this.handleInputChange}
					/>
					<div>subject property income information</div>
					<div>retail income</div>
					<FormGroup
						info = {fields.income.retail}
						section = 'income.retail'
						handleInputChange = {this.handleInputChange}
					/>
					<div>other income</div>
					<FormGroup
						info = {fields.income.other}
						section = 'income.other'
						handleInputChange = {this.handleInputChange}
					/>
					<div>rental income</div>
					<FormGroup
						info = {fields.income.rental}
						section = 'income.rental'
						handleInputChange = {this.handleInputChange}
					/>
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
					<button
						type="submit"
						className=''
						id="runSearch"
						>
						get answers
					</button>	
				</div>
			</form>
		);
	}
}