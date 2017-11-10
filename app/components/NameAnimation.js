import React from 'react';

export class NameAnimation extends React.Component{
	render(){
		let {
			arr,
			onClick
		} = this.props;
		return(
			<div id = 'primary-name'>
				{arr.map( (contents,i) => {
					return(
						<span
							key = {i}
							data-letter-position = {i}
							onClick = {onClick}
							className = {contents.class}
						>{contents.letter}
						</span>
					);
				})
				}
			</div>
		);
	}
}