import React from 'react';
import { WordLine } from '../WordLine';
import { NameInputsContainer } from './NameInputsContainer';

export const SectionBody = (props) => {
	let{
		sectionT2,
		guide,
		fields,
		handleChange
	} = props;
	return(
		<div className = 'ms-body'>
			{guide.map( (content, i) => {
				content.section = sectionT2.concat('.',content.name);
				content.itemClicked = 'addToSection';
				content.location = 'ms-body';
				return(
					<div key = {i}>
						{content.allowAdd ?
							<WordLine
								content = {content}
							/>
							:
							null
						}
						< NameInputsContainer
							fields = {fields}
							section = {content.section}
							specificSection = {content.name}
							handleChange = {handleChange}
						/>
					</div>
				);
			})}
		</div>
	);
}