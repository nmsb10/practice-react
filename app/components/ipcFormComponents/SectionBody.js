import React from 'react';
import { Tooltip } from '../Tooltip';
import {WordLine} from '../WordLine';

export const SectionBody = (props) => {
	let{
		guide,
		fields,
		handleChange
	} = props;
	return(
		<div className = 'ms-body'>
			{guide.map( (content, i) => {
				return(
					<div key = {i}>
						{content.allowAdd ?
							<WordLine
								location = 'ms-body'
								content = {content.name}
							/>
							:
							null
						}
						<div>
							{fields[content.name].map( (input, j) => {
								return(
								<div className = 'input-container' key = {j} title = 'title here'>
									<label htmlFor = 'htmlFor'>
										<span className = 'label-span'>label span here</span>
									</label>
									<div className = ''>
										<span className = 'contents'>{input.value.preEntry}</span>
										<span className = 'input-span'>
											<input
												className = ''
												type='text'
												id=''
												data-key = ''
												data-section = ''
												data-validate = ''
												value = {input.value.amount? input.value.amount : input.value.monthly}
												placeholder = {input.value.placeholder}
												onChange = {handleChange}
											/>
										</span>
										<span className = 'contents'>{input.value.postEntry}</span>
									</div>
								</div>
								);
							})
							}
						</div>
					</div>
				);
			})}
		</div>
	);
}