import React from 'react';

export class IPCForm extends React.Component{
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	//form event handlers
	handleSubmit(event){
		event.preventDefault();
		this.props.calculate();
	}
	render(){
		let {
			handleInputChange,
			fields,
			vmes
		} = this.props;
		return(
			<form onSubmit = {(event) => this.handleSubmit(event)}>
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
				<div className = 'sf-content'>
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
					<div className="form-group">
						<label htmlFor = 'incomeRental'>rental income:</label><span>{fields.income.rental[0].vmes}</span>
						<input
							type='text'
							id="incomeRental"
							data-property-name = 'income.rental[0].amount'
							value = {fields.income.rental[0].amount}
							placeholder = '-0-'
							onChange = {handleInputChange}
						/>
					</div>
				{/*
					<div className="form-group">
						<label htmlFor = 'strName'>street name:</label>
						<input
							type="text"
							id="strName"
							value = {spfields.strName}
							placeholder = 'street name'
							onChange = {(event) => this.handleInputChange(event)}
						/>
						<div>{streetNameMes}</div>
					</div>
					<div className="form-group">
						<label htmlFor = 'unit'>unit number:</label>
						<input
							type="text"
							id="unit"
							value = {spfields.unit}
							placeholder = 'unit number'
							onChange = {(event) => this.handleInputChange(event)}
						/>
						<div>{unitMes}</div>
					</div>
					<div className="form-group">
						<label htmlFor = 'asf'>approximate square feet:</label>
						<input
							type="text"
							id="asf"
							value = {spfields.asf}
							placeholder = 'square feet'
							onChange = {(event) => this.handleInputChange(event)}
						/>
						<div>{asfMes}</div>
					</div>
					<div className="form-group">
						<label htmlFor = 'asmDues'>monthly assessments: $</label>
						<input
							type="text"
							id="asmDues"
							value = {spfields.asmDues}
							placeholder = 'monthly assessments'
							onChange = {(event) => this.handleInputChange(event)}
						/>
						<div>{allOthersMes}</div>
					</div>
					<div className="form-group">
						<label htmlFor = 'propTax'>property taxes: $</label>
						<input
							type="text"
							id="propTax"
							value = {spfields.propTax}
							placeholder = 'property taxes'
							onChange = {(event) => this.handleInputChange(event)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor = 'bds'># bedrooms:</label>
						<input
							type="text"
							id="bds"
							value = {spfields.bds}
							placeholder = '# bedrooms'
							onChange = {(event) => this.handleInputChange(event)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor = 'bathF'># full bathrooms:</label>
						<input
							type="text"
							id="bathF"
							value = {spfields.bathF}
							placeholder = '# full bathrooms'
							onChange = {(event) => this.handleInputChange(event)}
						/>
					</div>
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