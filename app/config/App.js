import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {WelcomeContainer} from '../containers/WelcomeContainer';
import {UserPageContainer} from '../containers/UserPageContainer';

export class App extends React.Component{
	render(){
		return(
			<div id = 'wel-user-switch'>
				<Switch>
					<Route exact path = '/' component = {WelcomeContainer}/>
					<Route path = '/userpage' component = {UserPageContainer}/>
				</Switch>
			</div>
		);
	}
}