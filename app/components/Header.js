import React from 'react';
import { Link } from 'react-router-dom';
import { NameAnimation } from './NameAnimation';

export class Header extends React.Component{
	render(){
		let {
			nameObject,
			currentPage,
			animateName,
			handleClick
		} = this.props;
		return(
			<header>
				< NameAnimation 
					arr = {nameObject.nameArr}
					onClick = {animateName}
				/>
				<nav>
					<ul>
						<li><Link to = '/userpage' className={currentPage==='home'?'current-page':''} data-page-name = 'home' onClick = {handleClick} >Home</Link></li>
						<li className = 'dropdown'><Link to = '/userpage/about' className={currentPage==='about'?'current-page':''} data-page-name = 'about' onClick = {handleClick}>About</Link>
							<div className = 'dropdown-content' onClick = {handleClick}>
								<a href='https://www.linkedin.com/in/jonathonnagatani' target='_blank' title='Jonathon on LinkedIn'>LinkedIn</a>
								<a href = 'https://www.youtube.com/user/JonathonNagatani' target='_blank' title='Jonathon on YouTube'>YouTube</a>
								<a href="https://github.com/nmsb10" target="_blank" title="Jonathon on github | nmsb10">github</a>
							</div>
						</li>
						<li><Link to = '/userpage/projects' className={currentPage==='projects'?'current-page':''} data-page-name = 'projects' onClick = {handleClick}>Projects</Link></li>
						<li className = 'dropdown'><Link to = '/userpage/real-estate' className={currentPage==='real estate'?'current-page':''} data-page-name = 'real estate' onClick = {handleClick}>Real Estate</Link>
							<div className = 'dropdown-content' onClick = {handleClick}>
								<Link to = '/userpage/investment-property-calculator' data-page-name = 'real estate' >property calculator</Link>
							</div>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}