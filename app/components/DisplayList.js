import React from 'react';

export const DisplayList = (props) => {
	let {type, title, index, content, handleClick} = props;
	// let listCssClass = content.open ? '' : 'hidden';
	let listCssClass = '';
	return(
		<div className = 'display-list-component'>
			<button
				type = 'button'
				data-item = {type}
				data-key = {index}
				onClick = {handleClick}
			>{type === 're' && !content.open ? <i className="fa fa-home" aria-hidden="true"></i> : ''}{content.open ? 'hide' : 'view'} {title}</button>
			<ul className = {listCssClass}>
				{content.array.map((item, i) => {
					return(
						<li
							key = {i}
							className = {content.cssClass}
						>{item}
						</li>
					);
				})}
			</ul>
		</div>
	);
}