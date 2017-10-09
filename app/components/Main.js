import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { Projects } from './Projects';
import { Thoughts } from './Thoughts';
import { RealEstate } from './RealEstate';
import { InvestPropCalc } from './InvestPropCalc';

export class Main extends React.Component{
	componentDidMount(){
	}
	render(){
		return(
			<main>
				<Switch>
					<Route exact path = '/userpage' component = {Home}/>
					<Route path = '/userpage/projects' component = {Projects}/>
					<Route path = '/userpage/thoughts' component = {Thoughts}/>
					<Route path = '/userpage/real-estate' component = {RealEstate}/>
					<Route path = '/userpage/investment-property-calculator' component = {InvestPropCalc}/>
				</Switch>
			</main>
		);
	}
}

//https://stackoverflow.com/questions/42984597/multiple-nested-routes-in-react-router-dom-v4
export class Main222 extends React.Component{
	render(){
		return(
			<main>
				<Switch>
					<Route exact path = {this.props.match.path} component = {Home}/>
					<Route path = {'${this.props.match.path}/projects'} component = {Projects}/>
					<Route path = {'${this.props.match.path}/thoughts'} component = {Thoughts}/>
				</Switch>
			</main>
		);
	}
}

//https://codesandbox.io/s/vVoQVk78
//https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf