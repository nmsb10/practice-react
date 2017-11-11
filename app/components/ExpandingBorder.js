import React from 'react';
import { Link } from 'react-router-dom';

export const ExpandingBorder = (props) => {
	let { content } = props;
	return(
		<div className = 'ex-bor-container'>
			{content.elementType === 'button' &&
				<button className = {content.cssClass.content ? content.cssClass.content : 'ex-bor-content'}>
					{content.text}
				</button>
			}
			{content.elementType === 'li' &&
				<li className = {content.cssClass.content ? content.cssClass.content : 'ex-bor-content'}>
					{content.text}
				</li>
			}
			{content.elementType === 'Link' &&
				<Link
					to = {content.linkTo}
					className = {content.cssClass.content ? content.cssClass.content : 'ex-bor-content'}
					data-page-name = {content.dataPageName}
				>{content.name}
				</Link>
			}
			<div className = {content.cssClass.border ? content.cssClass.border : 'expanding-border'}>
			</div>
		</div>
	);
}