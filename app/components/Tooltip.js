import React from 'react';

export const Tooltip = (props) => {
	let { content, inputName, displayType, alertTooltip} = props;
	let cssClass = 'tooltiptext';
	switch(content.location){
		case 'bottom':
			content.cssClassAdd === 'calc' ? cssClass = 'calc-tooltip' : '';
			cssClass += ' ttt-bottom';
			break;
		case 'top':
			content.cssClassAdd === 'calc' ? cssClass = 'calc-tooltip' : ''; 
			cssClass += ' ttt-top';
			break;
		case 'right':
			cssClass += ' ttt-right';
			break;
		case 'left':
			content.cssClassAdd === 'calc' ? cssClass = 'calc-tooltip' : ''; 
			cssClass += ' ttt-left';
			break;
		case 'right-alert':
			cssClass =  'ttt-alert ttt-right';
			content.showVmes ? cssClass += ' alert-visible' : '';
			break;
		default:
			break;
	}
	return(
		<span className= {cssClass}>
			{displayType === 'alert' && content.vmes ?
			<div>
				<span>you tried entering:</span>
				<span className = 'invalid-value'>{content.invalidValue}</span>
				<span>this value must be:</span>
				<ul className = ''>
				{content.vmes.map( (alertContent, i) => {
					return(
						<li key = {i}>{alertContent}</li>
					);
				})
				}
				</ul>
				<span
					className = 'close-alert'
					data-item-clicked = {alertTooltip.request}
					data-key = {alertTooltip.key}
					data-section = {alertTooltip.section}
				>okay
				</span>
			</div>
			:
			displayType === 'calculation' ?
			<div>
				{content.figures.map((number, i) => {
					let sign = '';
					if(i!==0){
						if(content.sign === 'plus'){
							sign = '+ ';
						}else if(content.sign === 'multiply'){
							sign = 'x ';
						}else if(content.sign === 'subtract'){
							sign = '- ';
						}else if(content.sign === 'divide'){
							sign = '/ ';
						}
					}
					return(
						<span key = {i} className = 'figures'>{number ? sign+number : ''}</span>
					);
				})}
				<span className = 'total'>{content.textEnd !== '%' ? '= $' : '= '}{content.total}{content.textEnd === '%' ? '%' : ''}</span>
			</div>
			:
			content.textStart + ' ' + inputName + ' ' + content.textEnd
			}
		</span>
	);
}