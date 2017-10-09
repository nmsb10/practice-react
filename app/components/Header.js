import React from 'react';
import { Link } from 'react-router-dom';
import { NameAnimation } from './NameAnimation';

export class Header extends React.Component{
	constructor(props){
		super(props);
		this.animateName = this.animateName.bind(this);
	}
	animateName(letter){
		this.props.animateName(letter);
	}
	render(){
		let {
			nameObject
		} = this.props;
		return(
			<header>
				< NameAnimation 
					arr = {nameObject.nameArr}
					onClick = {this.animateName}
				/>
				<nav>
					<ul>
						<li><Link to = '/userpage'>Home</Link></li>
						<li><Link to = '/userpage/projects'>Projects</Link></li>
						<li><Link to = '/userpage/thoughts'>Thoughts</Link></li>
						<li className = 'dropdown'><Link to = '/userpage/real-estate'>Real Estate</Link>
							<div className = 'dropdown-content'>
								<a href='https://www.linkedin.com/in/jonathonnagatani' target='_blank' title='Jonathon on LinkedIn'>LinkedIn</a>
								<a href = 'https://www.youtube.com/user/JonathonNagatani' target='_blank' title='Jonathon on YouTube'>YouTube</a>
								<a href="https://github.com/nmsb10" target="_blank" title="Jonathon on github | nmsb10">github</a>
								<Link to = '/userpage/investment-property-calculator'>prop calc</Link>
							</div>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}