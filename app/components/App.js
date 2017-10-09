import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {Welcome} from './Welcome';
import {UserPage} from './UserPage';

export class App extends React.Component{
	render(){
		return(
			<div>
				<Switch>
					<Route exact path = '/' component = {Welcome}/>
					<Route path = '/userpage' component = {UserPage}/>
				</Switch>
			</div>
		);
	}
}