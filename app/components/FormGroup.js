import React from 'react';

export class FormGroup extends React.Component {
	constructor(props){
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	handleInputChange(e){
		this.props.handleInputChange(e);
	}
	render(){
		let { info, section } =this.props;
		return(
			<div>
			{info.map( (contents, i) => {
				return(
					<div className="form-group ttt-container" key = {i}>
						<span className="tooltiptext ttt-bottom">{contents.tooltip}</span>
						<label htmlFor = {contents.name}>
							<span>{contents.name}:</span>
							<span className = {!contents.validEntry ? 'val-mes': 'hidden'}>{contents.vmes}</span>
						</label>
						<input
							type='text'
							id={contents.name}
							data-key = {i}
							data-property-name = {contents.name}
							data-section = {section}
							value = {contents.value}
							placeholder = {contents.placeholder}
							onChange = {this.handleInputChange}
						/>
					</div>
				);
			})}
			</div>
		);
	}
}