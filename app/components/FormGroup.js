import React from 'react';
import { Tooltip } from './Tooltip';

export class FormGroup extends React.Component {
	render(){
		let { info, section, handleInputChange, onClick} =this.props;//think of section as the path of the formFields object. then key = which array is displayed in that object following that path
		return(
			<div className = 'form-group-container'>
				{info.map( (contents, i) => {
					return(
						<div className="form-group"
							key = {i}
							onClick = {onClick}
						>
							<span
								className = {contents.required ? 'hidden' : 'close'}
								title = 'remove this section'
								data-item-clicked = {contents.required ? 'invalid' : 'removeSection'}
								data-key = {i}
								data-section = {section}
							>&times;</span>
							<div
								className = {contents.isOpen ? 'minimize-div' : 'open-div'}
								data-item-clicked = 'minimizeSection'
								data-key = {i}
								data-section = {section}
								title = {contents.isOpen ? 'minimize this section' : 'display this section'}
							>
								<i
									className={contents.isOpen ? "fa fa-chevron-up fai-up" : "fa fa-chevron-up fai-up-rotated"}
									aria-hidden="true"
									data-item-clicked = 'minimizeSection'
									data-key = {i}
									data-section = {section}
								>
								</i>
							</div>
							<div className = {contents.isOpen ? 'ttt-container inputs-container' : 'inputs-cont-closed'}>
								<Tooltip
									location = {contents.ttLoc}
									text = {contents.tooltip}
								/>
								<div className = 'section-name'>
									<div>
										<input
											type='text'
											id={contents.name}
											value = {contents.name}
											placeholder = 'source name'
											onChange = {handleInputChange}
										/>
										<label htmlFor = {contents.name}>
											<span>{contents.name}:</span>
											<span className = {!contents.validEntry ? 'val-mes': 'hidden'}>{contents.vmes}</span>
										</label>
									</div>
									
								</div>
								<div className = 'top'>
									<label htmlFor = {contents.name}>
										<span>{contents.name}:</span>
										<span className = {!contents.validEntry ? 'val-mes': 'hidden'}>{contents.vmes}</span>
									</label>
								</div>
								<div className = 'bottom input-wrapper'>
									<span className = 'input-contents'>{contents.preEntry}</span>
									<span className = 'input-contents'>
										<input
											type='text'
											id={contents.name}
											data-key = {i}
											data-property-name = {contents.name}
											data-section = {section}
											value = {contents.value}
											placeholder = {contents.placeholder}
											onChange = {handleInputChange}
										/>
									</span>
									<span className = 'input-contents'>{contents.postEntry}</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}