import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from '../components/Home';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { RealEstate } from '../components/RealEstate';
import { InvestPropCalcContainer } from '../containers/InvestPropCalcContainer';

export class Main extends React.Component{
	render(){
		return(
			<main>
				<Switch>
					<Route exact path = '/user' component = {Home}/>
					<Route path = '/user/about' component = {About}/>
					<Route path = '/user/projects' component = {Projects}/>
					<Route path = '/user/real-estate' component = {RealEstate}/>
					<Route path = '/user/investment-property-calculator' component = {InvestPropCalcContainer}/>
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