import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from '../components/Home';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { Thoughts } from '../components/Thoughts';
import { RealEstate } from '../components/RealEstate';
import { InvestPropCalcContainer } from '../containers/InvestPropCalcContainer';

export class Main extends React.Component{
	componentDidMount(){
	}
	render(){
		return(
			<main>
				<Switch>
					<Route exact path = '/userpage' component = {Home}/>
					<Route path = '/userpage/about' component = {About}/>
					<Route path = '/userpage/projects' component = {Projects}/>
					<Route path = '/userpage/thoughts' component = {Thoughts}/>
					<Route path = '/userpage/real-estate' component = {RealEstate}/>
					<Route path = '/userpage/investment-property-calculator' component = {InvestPropCalcContainer}/>
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