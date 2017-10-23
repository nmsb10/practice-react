import React from 'react';
import { Tooltip } from './Tooltip';

export class FormGroup extends React.Component {
	render(){
		let { info, section, onChange, onClick} =this.props;//think of section as the path of the formFields object. then key = which array is displayed in that object following that path
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
							<div className = {contents.isOpen ? 'ttt-container inputs-container' : 'inputs-container closed'}>
								<Tooltip
									content = {contents.tooltip}
									displayType = 'normal'
								/>
								<Tooltip
									content = {contents.validation}
									displayType = 'alert'
								/>
								<div className = 'section-name'>
									<div className = 'name-input-container'>
										<input
											className = ''
											type='text'
											id={contents.name}
											data-key = {i}
											data-request = 'changeFieldName'
											data-section = {section}
											value = {contents.name}
											placeholder = {contents.name}
											onChange = {onChange}
										/>
										<label htmlFor = {contents.name}>
											<span className = 'label-span'>{contents.name}</span>
										</label>
									</div>
								</div>
								{
									contents.hasMonthlyAnnual === false ?
									<div className = {contents.validation.validEntry ? 'section-value-wrapper svw-highlighted' : 'section-value-wrapper'}>
										<span className = 'contents'>{contents.value.preEntry}</span>
										<span className = 'contents'>
											<input
												type='text'
												id={contents.name + '-value'}
												data-key = {i}
												data-request = 'changeFieldValue'
												data-section = {section}
												value = {contents.value.amount}
												placeholder = {contents.value.placeholder}
												onChange = {onChange}
											/>
										</span>
										<span className = 'contents'>{contents.value.postEntry}</span>
									</div>
									:
									<div>
										<div className = 'input-label-container'>
											<div className = {contents.validation.validEntry ? 'section-value-wrapper svw-highlighted' : 'section-value-wrapper'}>
												<span className = 'contents'>{contents.value.preEntry}</span>
												<span className = 'contents'>
													<input
														type='text'
														id={contents.name + '-valueMonthly'}
														data-key = {i}
														data-request = 'changeFieldValue'
														data-val-period = 'monthly'
														data-section = {section}
														value = {contents.value.monthly}
														placeholder = {contents.value.placeholder}
														onChange = {onChange}
													/>
												</span>
												<span className = 'contents'>{contents.value.postEntry}</span>
											</div>
											<label htmlFor = {contents.name + '-valueMonthly'}>
												<span className = 'label-span'>monthly</span>
											</label>
										</div>
										<div className = 'input-label-container'>
											<div className = {contents.validation.validEntry ? 'section-value-wrapper svw-highlighted' : 'section-value-wrapper'}>
												<span className = 'contents'>{contents.value.preEntry}</span>
												<span className = 'contents'>
													<input
														type='text'
														id={contents.name + '-valueAnnual'}
														data-key = {i}
														data-request = 'changeFieldValue'
														data-val-period = 'annual'
														data-section = {section}
														value = {contents.value.annual}
														placeholder = {contents.value.placeholder}
														onChange = {onChange}
													/>
												</span>
												<span className = 'contents'>{contents.value.postEntry}</span>
											</div>
										</div>
										<label htmlFor = {contents.name + '-valueAnnual'}>
											<span className = 'label-span'>annual</span>
										</label>
									</div>
								}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}