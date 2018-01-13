import React from 'react';
import { Link } from 'react-router-dom';
import {DisplayList} from './DisplayList';

export class RealEstate extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			adjectives: {
				array: ['organic', 'gluten-free', 'cage-free', 'cruelty-free', 'Bisphenol A-free', 'rBGH & rBST-free', 'HFCS-free', 'GMO-free', 'conflict-free', 'fair trade', 'ethically sourced', 'sustainably grown','sustainably sourced'],
				count:0,
				current: null,
				interval:null,
				cssClass:null
			},
			protectedClasses:{
				federal:{
					array:[],
					arrayOriginal: ['race', 'color', 'religion', 'national origin', 'sex', 'familial status', 'handicap'],
					open:false,
					counter:null,
					cssClass:'scale-in'
				},
				illinois:{
					array:[],
					arrayOriginal: ['race', 'color', 'religion', 'national origin', 'sex', 'familial status (with regard to housing)', 'physical and mental disability', 'age', 'ancestry', 'arrest record', 'citizenship status (with regard to employment)', 'marital status', 'military status', 'order of protection status', 'sexual orientation', 'unfavorable discharge from military service'],
					open: false,
					counter:null,
					cssClass:'scale-in',
					source:{
						title:'Illinois Human Rights Act',
						url:'https://www.illinois.gov/ihrc/Pages/default.aspx'
					}
				}
			}
		};
		this.shuffleByKnuth = this.shuffleByKnuth.bind(this);
		this.rotateServiceAdjs = this.rotateServiceAdjs.bind(this);
		this.handleClick = this.handleClick.bind(this);
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
		let{adjectives, protectedClasses} = this.state;
		clearInterval(adjectives.interval);
		clearInterval(protectedClasses.federal.counter);
		clearInterval(protectedClasses.illinois.counter);
	}
	rotateServiceAdjs(){
		let{adjectives} = this.state;
		let objCopy = {};
		let current = adjectives.count;
		let selection = adjectives.array[current];
		let newCssClass = adjectives.cssClass === 're-adj-flip' ? 're-adj-flip2' : 're-adj-flip';
		if(current===adjectives.array.length-1){
			clearInterval(adjectives.interval);
			let interval = setInterval(this.rotateServiceAdjs, 5000);
			let mixedAdjectives = this.shuffleByKnuth(adjectives.array);
			objCopy = Object.assign({}, adjectives, {current: selection, count: 0, interval: interval, array: mixedAdjectives, cssClass: newCssClass});
			
		}else{
			objCopy = Object.assign({}, adjectives, {count:current + 1, current: selection, cssClass: newCssClass});
		}
		this.setState({
			adjectives: objCopy
		});
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
	handleClick(e){
		let {protectedClasses} = this.state;
		let copyPc = protectedClasses;
		if(e.target.dataset.item === 'federal protected classes'){
			clearInterval(protectedClasses.federal.counter);
			if(copyPc.federal.open){
				//close the list
				let pcArray = copyPc.federal.array;
				let count = 0;
				let elementCount = copyPc.federal.array.length;
				let listCounter = setInterval(()=>{
					if(count < elementCount){
						pcArray.pop();
						this.setState({
							protectedClasses: copyPc
						});
						count++;
					}else{
						clearInterval(protectedClasses.federal.counter);
					}
				}, 100);
				copyPc.federal.counter = listCounter;
			}else{
				//open the list
				let pcArray = copyPc.federal.array;
				let count = copyPc.federal.array.length;
				let listCounter = setInterval(()=>{
					if(count < copyPc.federal.arrayOriginal.length){
						pcArray.push(copyPc.federal.arrayOriginal[count]);
						this.setState({
							protectedClasses: copyPc
						});
						count++;
					}else{
						clearInterval(protectedClasses.federal.counter);
					}
				}, 200);
				copyPc.federal.counter = listCounter;
			}
			copyPc.federal.open = !copyPc.federal.open;
		}else if(e.target.dataset.item === 'illinois protected classes'){
			clearInterval(protectedClasses.illinois.counter);
			let pcArray = copyPc.illinois.array;
			if(copyPc.illinois.open){
				//close the list
				let count = 0;
				let elementCount = copyPc.illinois.array.length;
				let listCounter = setInterval(()=>{
					if(count < elementCount){
						pcArray.pop();
						this.setState({
							protectedClasses: copyPc
						});
						count++;
					}else{
						clearInterval(protectedClasses.illinois.counter);
					}
				}, 100);
				copyPc.illinois.counter = listCounter;
			}else{
				//open the list
				let count = copyPc.illinois.array.length;
				let listCounter = setInterval(()=>{
					if(count < copyPc.illinois.arrayOriginal.length){
						pcArray.push(copyPc.illinois.arrayOriginal[count]);
						this.setState({
							protectedClasses: copyPc
						});
						count++;
					}else{
						clearInterval(protectedClasses.illinois.counter);
					}
				}, 200);
				copyPc.illinois.counter = listCounter;
			}
			copyPc.illinois.open = ! copyPc.illinois.open;
		}
		this.setState({
			protectedClasses: copyPc
		});
	}
	render(){
		let{
			adjectives,
			protectedClasses
		} = this.state;
		return(
			<div className = 'fit-95'>
				<div className = 'real-estate-component'>
					<div className = 'services'>
						<div className = 'services-container'>
							<span>now offering</span>
							<span className = {'adj ' +(adjectives.cssClass ? adjectives.cssClass : '')}>{adjectives.current ? adjectives.current : '...'}</span>
							<span>real estate services</span>
						</div>
					</div>
					<ul>
						<li>
							<Link
								to = '/user/investment-property-calculator'
								title = 'investment property cap rate calculator'
							>Investment Property Analysis Application
							</Link>
						</li>
						<li>
							<a
								href = 'https://avm-jn.herokuapp.com/'
								target = '_blank'
								title = 'demonstration of the area statistics generator'
								>area statistics generator (demo only)
							</a>
						</li>
					</ul>
			{/*
					<DisplayList
						type = 're'
						title = 'federal protected classes'
						content = {protectedClasses.federal}
						handleClick = {this.handleClick}
					/>
					<DisplayList
						type = 're'
						title = 'illinois protected classes'
						content = {protectedClasses.illinois}
						handleClick = {this.handleClick}
					/>
					<div>
						The ADA information line: 800.514.0301, MWF 9:30AM - 5:30PM, Th 12:30PM - 5:30PM (Eastern Time) to speak with a ADA specialist confidentially
						<br/>
						HUD / state of illinois?
						<br/>
						add link to HUD website; material explaining service animals, support / emotional support animals; ADA accessibility articles
					</div>
			*/}
				</div>
			</div>
		);
	}
}