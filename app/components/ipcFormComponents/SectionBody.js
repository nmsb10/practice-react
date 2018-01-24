import React from 'react';
import { WordLine } from '../WordLine';
import { NameInputsContainer } from './NameInputsContainer';

export const SectionBody = (props) => {
	let{
		sectionT2,
		mainObj,
		guide,
		fields,
		handleChange,
		sectionOpen,
		handleMouseEnter,
		handleMouseLeave
	} = props;
	let height = 0, heightClass = 'height';
	guide.map( (len, i) => {
		height += fields[len.name].length;
	});
	switch(height){
		case 0:
		case 1:
			heightClass += 1;
			break;
		case 2:
		case 3:
		case 4:
		case 5:
			heightClass += 2;
			break;
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
			heightClass += 3;
			break;
		case 13:
		case 14:
		case 15:
		case 16:
		case 17:
		case 18:
		case 19:
			heightClass += 4;
			break;
		default:
			heightClass += 5;
			break;
	}
	return(
		<div className = {'ms-body ' + (sectionOpen.bool ? 'open ' +heightClass : 'closed ' ) + ''}>
			{guide.map( (content, i) => {
				content.section = sectionT2.concat('.', content.name, '.', mainObj);
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
							handleMouseEnter = {handleMouseEnter}
							handleMouseLeave = {handleMouseLeave}
						/>
					</div>
				);
			})}
		</div>
	);
}