import React from 'react';

export const About = (props) => {
	let aboutMeLinks = [
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
	];
	let mappedAboutMeLinks = aboutMeLinks.map( (contents, i) => {
		return(
			<li key = {i}>
				<a
					href = {contents.href}
					target = '_blank'
					title = {contents.title}
				>{contents.name}
				</a>
			</li>
		);
	});
	return(
		<div className = 'fit-95'>
			<div className = 'about-component'>
				<span>visit jonathon on...</span>
				<ul>
					{mappedAboutMeLinks}
				</ul>
			</div>
		</div>
	);
}

