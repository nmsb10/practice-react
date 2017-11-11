import React from 'react';
import { Link } from 'react-router-dom';
import { NameAnimation } from './NameAnimation';
import { ExpandingBorder } from './ExpandingBorder';

export class Header extends React.Component{
	render(){
		let {
			nameObject,
			currentPage,
			animateName,
			handleClick
		} = this.props;
		let headerNav = [
			{
				elementType: 'Link',
				linkTo:'/user',
				selectedClass:'home',
				dataPageName:'home',
				name: 'Home',
				dropdown:null,
				cssClass:{
					content:'eb-content',
					border:'eb-border'
				}
			},{
				elementType: 'Link',
				linkTo:'/user/about',
				selectedClass:'about',
				dataPageName:'about',
				name: 'About',
				cssClass:{
					content:'eb-content',
					border:'eb-border'
				},
				dropdown:[
					{
						type: 'a',
						href:'https://www.linkedin.com/in/jonathonnagatani',
						title:'Jonathon on LinkedIn',
						name:'LinkedIn'
					},
					{
						type: 'a',
						href:'https://www.youtube.com/user/JonathonNagatani',
						title:'Jonathon on YouTube',
						name:'YouTube'
					},
					{
						type: 'a',
						href:'https://github.com/nmsb10',
						title:'Jonathon on github | nmsb10',
						name:'github'
					}
				]
			},{
				elementType: 'Link',
				linkTo:'/user/projects',
				selectedClass:'projects',
				dataPageName:'projects',
				name: 'Projects',
				dropdown:null,
				cssClass:{
					content:'eb-content',
					border:'eb-border'
				}
			},{
				elementType: 'Link',
				linkTo:'/user/real-estate',
				selectedClass:'real estate',
				dataPageName:'real estate',
				name: 'Real Estate',
				cssClass:{
					content:'eb-content',
					border:'eb-border'
				},
				dropdown:[
					{
						type: 'reactLink',
						linkTo:'/user/investment-property-calculator',
						title:'investment property cap rate calculator',
						name:'property calculator'
					}
				]
			}
		];
		return(
			<header>
				< NameAnimation 
					arr = {nameObject.nameArr}
					onClick = {animateName}
				/>
				<nav>
					<ul>
						{headerNav.map((contents, i) => {
							return(
								<li className = {contents.dropdown ? 'dropdown': ''} key = {i}>
							
									<div className = {currentPage === contents.selectedClass ? 'current-page header-link-container' : 'header-link-container'} onClick = {handleClick}>
										<ExpandingBorder
											content = {contents}
										/>
									</div>
							{/*
									<Link
										to = {contents.linkTo}
										className= {currentPage === contents.selectedClass ? 'current-page' : '' }
										data-page-name = {contents.dataPageName}
										onClick = {handleClick}
									>{contents.name}
									</Link>
							*/}
									{contents.dropdown !== null ?
										<div className = 'dropdown-content' onClick = {handleClick}>
											{contents.dropdown.map( (dd, j) => {
												return(
													dd.type === 'a' ? 
														<a
															href = {dd.href}
															target = '_blank'
															title = {dd.title}
															key = {j}
														>{dd.name}
														</a>
													:
														<Link
															to = {dd.linkTo}
															data-page-name = {contents.dataPageName}
															title = {dd.title}
															key = {j}
														>{dd.name}
														</Link>
												);
											})}
										</div>
										:
										''
									}
								</li>
							);
						})}
					</ul>
				</nav>
			</header>
		);
	}
}