import React from 'react';
import { Link } from 'react-router-dom';
import { DisplayList } from './DisplayList';

export const RealEstateCards = (props) => {
	let{
		content,
		cssArray,
		handleClick
	} = props;
	return(
		<div className = 're-cards-container'>
			{content.map((card, i) => {
				return(
					<div className = {'re-card' + ' ' + cssArray[i]} key = {i}>
						<span>{card.name}</span>
						{card.type === 'link' ?
							card.link.type === 'Link' ?
							<Link
								to = {card.link.to}
								title = {card.link.title}
							>try the {card.name}
							</Link>
							:
							card.link.type === 'a' ?
							<a
								href = {card.link.href}
								target = {card.link.target}
								title = {card.link.title}
								>view the {card.name}
							</a>
							:
							null
						:
						card.type === 'displayList' ?
							<div>
								<DisplayList
									type = 're-display-protected-classes'
									title = {card.name}
									index = {i}
									content = {card.body}
									handleClick = {handleClick}
								/>
								<a
									href = {card.source.url}
									target = '_blank'
									title = {card.source.title}
									>more information
								</a>
							</div>
						:
						card.type === 'infoSource' ?
							<div className = 'info-source'>
								{card.body ?
									card.body.map((text, j) => {
										return(
											<span key = {j} className = ''>
												{text}
											</span>
										);
									})
								:
								null}
								<a
									href = {card.source.url}
									target = '_blank'
									title = {card.source.title}
									>more information
								</a>
							</div>
						:
						null}						
					</div>
				);
			})}
		</div>
	);
}