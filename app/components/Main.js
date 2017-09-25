import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { Projects } from './Projects';
import { Thoughts } from './Thoughts';

export class Main extends React.Component{
	render(){
		return(
			<main>
				<Switch>
					<Route exact path = '/' component = {Home}/>
					<Route path = '/projects' component = {Projects}/>
					<Route path = '/thoughts' component = {Thoughts}/>
				</Switch>
			</main>
		);
	}
}

//https://codesandbox.io/s/vVoQVk78
//https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf