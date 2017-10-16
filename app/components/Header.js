import React from 'react';
import { Link } from 'react-router-dom';
import { NameAnimation } from './NameAnimation';

export class Header extends React.Component{
	constructor(props){
		super(props);
		this.animateName = this.animateName.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	animateName(letter){
		this.props.animateName(letter);
	}
	handleClick(e){
		this.props.handleClick(e.target.dataset.pageName);
	}
	render(){
		let {
			nameObject,
			currentPage
		} = this.props;
		return(
			<header>
				< NameAnimation 
					arr = {nameObject.nameArr}
					onClick = {this.animateName}
				/>
				<nav>
					<ul>
						<li><Link to = '/userpage' className={currentPage==='home'?'current-page':''} data-page-name = 'home' onClick = {this.handleClick} >Home</Link></li>
						<li className = 'dropdown'><Link to = '/userpage/about' className={currentPage==='about'?'current-page':''} data-page-name = 'about' onClick = {this.handleClick}>About</Link>
							<div className = 'dropdown-content' onClick = {this.handleClick}>
								<a href='https://www.linkedin.com/in/jonathonnagatani' target='_blank' title='Jonathon on LinkedIn'>LinkedIn</a>
								<a href = 'https://www.youtube.com/user/JonathonNagatani' target='_blank' title='Jonathon on YouTube'>YouTube</a>
								<a href="https://github.com/nmsb10" target="_blank" title="Jonathon on github | nmsb10">github</a>
							</div>
						</li>
						<li><Link to = '/userpage/projects' className={currentPage==='projects'?'current-page':''} data-page-name = 'projects' onClick = {this.handleClick}>Projects</Link></li>
						<li className = 'dropdown'><Link to = '/userpage/real-estate' className={currentPage==='real estate'?'current-page':''} data-page-name = 'real estate' onClick = {this.handleClick}>Real Estate</Link>
							<div className = 'dropdown-content' onClick = {this.handleClick}>
								<Link to = '/userpage/investment-property-calculator' data-page-name = 'real estate' >property calculator</Link>
							</div>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}