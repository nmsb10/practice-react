import React from 'react';

export class NameAnimation extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		this.props.onClick(e.target.dataset.letterPosition);
	}
	render(){
		let {arr} = this.props;
		return(
			<div id = 'primary-name'>
				{arr.map( (contents,i) => {
					return(
						<span
							key = {i}
							data-letter-position = {i}
							onClick = {this.handleClick}
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