import React from 'react';

export class RealEstate extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			adjectives: {
				array: ['organic', 'gluten-free', 'cage-free', 'cruelty-free', 'bisphenol-A-free', 'HFCS-free', 'GMO-free', 'conflict-free', 'fair trade', 'ethically sourced', 'sustainably grown','sustainably sourced'],
				count:0,
				current: null,
				interval:null,
				displaying: false,
				cssClass:null
			},
			protectedClasses:{
				federal:['race', 'color', 'religion', 'national origin', 'sex', 'familial status', 'handicap'],
				illinois:['race', 'color', 'religion', 'national origin', 'sex', 'familial status (with regard to housing)', 'physical and mental disability', 'age', 'ancestry', 'arrest record', 'citizenship status (with regard to employment)', 'marital status', 'military status', 'order of protection status', 'sexual orientation', 'unfavorable discharge from military service']
				//Illinois Human Rights Act
				//https://www.illinois.gov/ihrc/Pages/default.aspx
			}
		};
		this.shuffleByKnuth = this.shuffleByKnuth.bind(this);
		this.rotateServiceAdjs = this.rotateServiceAdjs.bind(this);
	}
	componentDidMount(){
		let{adjectives} = this.state;
		let interval = setInterval(this.rotateServiceAdjs, 5000);
		let mixedArr = this.shuffleByKnuth(adjectives.array);
		let objCopy = Object.assign({}, adjectives, {count: 0, interval: interval, array: mixedArr});
		this.setState({
			adjectives: objCopy
		});
	}
	componentWillUnmount(){
		clearInterval(this.state.adjectives.interval);
	}
	rotateServiceAdjs(){
		let{adjectives} = this.state;
		let objCopy = {};
		let current = adjectives.count;
		let selection = adjectives.array[current];
		if(current===adjectives.array.length-1){
			clearInterval(adjectives.interval);
			let interval = setInterval(this.rotateServiceAdjs, 5000);
			let mixedAdjectives = this.shuffleByKnuth(adjectives.array);
			objCopy = Object.assign({}, adjectives, {current: selection, count: 0, interval: interval, array: mixedAdjectives});
			
		}else{
			objCopy = Object.assign({}, adjectives, {count:current + 1, current: selection, cssClass: 're-adj-rotatein'});
		}
		this.setState({
			adjectives: objCopy
		});
		setTimeout(() => {
			let newCssClass = Object.assign({}, adjectives, {cssClass: 're-adj-rotateout'});
			this.setState({
				adjectives: newCssClass
			});
		}, 3500);
	}
	shuffleByKnuth(array){
		let currentIndex = array.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
		//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
		//https://github.com/coolaj86/knuth-shuffle
		//see notes within WelcomeContainer
	}
	render(){
		let{
			adjectives
		} = this.state;
		return(
			<div className = 'fit-95'>
				<div className = 'real-estate-component'>
					<div className = 'services'>
						<span>now offering</span>
						<span className = {'adj ' +(adjectives.cssClass ? adjectives.cssClass : '')}>{adjectives.current ? adjectives.current : '...'}</span>
						<span>real estate services</span>
					</div>
					<i className="fa fa-home" aria-hidden="true"></i>
					<div>insert component for federally protected classes & click to switch to illinois protected classes</div>
				</div>
			</div>
		);
	}
}