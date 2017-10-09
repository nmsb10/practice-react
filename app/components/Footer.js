import React from 'react';

// export class Footer extends React.Component{
// 	render(){
// 		let {year, name} = this.props;
// 		return(
// 			<footer>
// 				Copyright &copy; 2016 - {year} <a href="https://www.linkedin.com/in/jonathonnagatani" target="_blank" title="Jonathon on LinkedIn"><span className = 'capitalize'>{name}</span></a>. All Rights Reserved.
// 			</footer>
// 		);
// 	}
// }

export const Footer = (props) => {
	let {year, name} = props;
	return(
		<footer>
			Copyright &copy; 2016 - {year} <a href="https://www.linkedin.com/in/jonathonnagatani" target="_blank" title="Jonathon on LinkedIn"><span className = 'capitalize'>{name}</span></a>. All Rights Reserved.
		</footer>
	);
}