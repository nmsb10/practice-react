import React from 'react';

export class RealEstate extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			adjectives: {
				array: ['organic', 'gluten-free', 'cage-free', 'cruelty-free', 'bisphenol-A-free', 'HFCS-free', 'GMO-free', 'conflict-free', 'fair trade', 'ethically sourced', 'sustainably grown','sustainably sourced'],
				count:-1,
				current: null,
				interval:null,
				displaying: false,
				cssClass:null
			},
			protectedClasses:{
				federal:['race', 'color', 'religion', 'national origin', 'sex', 'familial status', 'handicap'],
				illinois:['race', 'color', 'religion', 'national origin', 'sex', 'familial status (with regard to housing)', 'citizenship status (with regard to employment)', 'ancestry', 'age', 'sexual orientation', 'order of protection status', 'marital status', 'physical and mental disability', 'arrest record', 'military status', 'unfavorable discharge from military service']
				//Illinois Human Rights Act
				//https://www.illinois.gov/ihrc/Pages/default.aspx
			}
		};
		this.shuffleByKnuth = this.shuffleByKnuth.bind(this);
		this.rotateServiceAdjs = this.rotateServiceAdjs.bind(this);
	}
	componentDidMount(){
		let{adjectives} = this.state;
		let newState = adjectives;
		//this.rotateServiceAdjs();
		let interval = setInterval(this.rotateServiceAdjs, 5000);
		let mixedArr = this.shuffleByKnuth(adjectives.array);
		let objCopy = Object.assign({}, adjectives, {interval: interval, array: mixedArr});
		this.setState({
			adjectives: objCopy
		});
	}
	componentWillUnmount(){
		clearInterval(this.state.adjectives.interval);
	}
	rotateServiceAdjs(){
		let{adjectives} = this.state;
		let current = adjectives.count + 1;
		let selection = adjectives.array[current];
		let objCopy = Object.assign({}, adjectives, {count:current, current: selection,});
		this.setState({
			adjectives: objCopy
		});

	}
	// showTestimonials(){
	// 	let { testimonials } = this.state;
	// 	let objCopy = {};
	// 	if(testimonials.displaying && testimonials.fullArray.length > 0){
	// 		let nextCount = testimonials.count + 1;
	// 		if(nextCount < testimonials.fullArray.length){
	// 			objCopy = Object.assign({}, testimonials, {currentSelection: testimonials.fullArray[nextCount], count: nextCount});
	// 			this.setState({
	// 				testimonials: objCopy
	// 			});
	// 		}else{//just completed displaying final fullArray element
	// 			this.clearTheIntervals(['testimonials']);
	// 		}
	// 	}else if(testimonials.fullArray.length > 0 && !testimonials.displaying){
	// 		let interval = setInterval(this.showTestimonials, 19000);
	// 		let mixedTestimonials = this.shuffleByKnuth(testimonials.fullArray);
	// 		let current = mixedTestimonials[0];
	// 		objCopy = Object.assign({}, testimonials, {fullArray: mixedTestimonials, count:0, currentSelection: current, interval: interval, displaying: true, cssClass: 'testimonial-content tes-con-reg-animation'});
	// 		this.setState({
	// 			testimonials: objCopy
	// 		});
	// 	}
	// }
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
					<div>
						<span>now offering</span>
						<span> {adjectives.current} </span>
						<span>real estate services</span>
					</div>
					<i className="fa fa-home" aria-hidden="true"></i>
					<div>insert component for federally protected classes & click to switch to illinois protected classes</div>
				</div>
			</div>
		);
	}
}