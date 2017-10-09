import React from 'react';
import { Link } from 'react-router-dom';

export class WelcomeContainer extends React.Component{
	render(){
		return(
			<div>
				<Link to = '/userpage'>click here to represent signing in...</Link>
			</div>
		);
	}
}