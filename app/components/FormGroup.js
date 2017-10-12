import React from 'react';
import { Tooltip } from './Tooltip';

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
			<div className = 'form-group-container'>
				{info.map( (contents, i) => {
					return(
						<div className="form-group ttt-container input-container" key = {i}>
							<span className = 'close'>x</span>
							<Tooltip
								location = {contents.ttLoc}
								text = {contents.tooltip}
							/>
							<div className = 'top'>
								<label htmlFor = {contents.name}>
									<span>{contents.name}:</span>
									<span className = {!contents.validEntry ? 'val-mes': 'hidden'}>{contents.vmes}</span>
								</label>
							</div>
							<div className = 'bottom'>
								<span>{contents.preEntry}</span>
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
								<span>{contents.postEntry}</span>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}