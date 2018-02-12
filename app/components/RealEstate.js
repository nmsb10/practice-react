import React from 'react';
import { Link } from 'react-router-dom';
import {DisplayList} from './DisplayList';
import { RealEstateCards } from './RealEstateCards';

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
			// protectedClasses:{
			// 	federal:{
			// 		array:[],
			// 		arrayOriginal: ['race', 'color', 'religion', 'national origin', 'sex', 'familial status', 'handicap'],
			// 		open:false,
			// 		counter:null,
			// 		cssClass:'scale-in'
			// 	},
			// 	illinois:{
			// 		array:[],
			// 		arrayOriginal: ['race', 'color', 'religion', 'national origin', 'sex', 'familial status (with regard to housing)', 'physical and mental disability', 'age', 'ancestry', 'arrest record', 'citizenship status (with regard to employment)', 'marital status', 'military status', 'order of protection status', 'sexual orientation', 'unfavorable discharge from military service'],
			// 		open: false,
			// 		counter:null,
			// 		cssClass:'scale-in',
			// 		source:{
			// 			title:'Illinois Human Rights Act',
			// 			url:'https://www.illinois.gov/ihrc/Pages/default.aspx'
			// 		}
			// 	}
			// },
			cardsContent:[{
				type: 'link',
				link:{
					type: 'Link',
					to: '/user/investment-property-calculator',
					title: 'investment property cap rate calculator'
				},
				name: 'Investment Property Analysis Application'
			},{
				type: 'link',
				link:{
					type: 'a',
					href: 'https://avm-jn.herokuapp.com/',
					target: '_blank',
					title: 'demonstration of the area statistics generator'
				},
				name: 'area statistics generator (demo only)'
			},{
				type:'displayList',
				name:'federal protected classes',
				body:{
					array:[],
					arrayOriginal: ['race', 'color', 'religion', 'national origin', 'sex', 'familial status', 'handicap'],
					open:false,
					counter:null,
					cssClass:'scale-in'
				}
			},{
				type: 'displayList',
				name: 'illinois protected classes',
				body: {
					array:[],
					arrayOriginal: ['race', 'color', 'religion', 'national origin', 'sex', 'familial status (with regard to housing)', 'physical and mental disability', 'age', 'ancestry', 'arrest record', 'citizenship status (with regard to employment)', 'marital status', 'military status', 'order of protection status', 'sexual orientation', 'unfavorable discharge from military service'],
					open: false,
					counter:null,
					cssClass:'scale-in',
					source:{
						title:'Illinois Human Rights Act',
						url:'https://www.illinois.gov/ihrc/Pages/default.aspx'
					}
				},
				source:{
					title:'Illinois Human Rights Act',
					url:'https://www.illinois.gov/ihrc/Pages/default.aspx'
				}
			},{
				type: 'infoSource',
				name: 'The Americans With Disabilities Act Information Line',
				body:['Dial 1.800.514.0301',' MWF 9:30AM - 5:30PM (Eastern Time)', 'Th 12:30PM - 5:30PM (Eastern Time)', 'to speak with a ADA specialist confidentially'],
				source:{
					title: 'ADA Information Line',
					url: 'https://www.ada.gov/infoline.htm'
				}
			},{
				type: 'infoSource',
				name: 'U.S. Department of Housing and Urban Development',
				source: {
					title: 'HUD.gov',
					url: 'https://www.hud.gov/'
				}
			},{
				type: 'infoSource',
				name: 'HUD: Illinois',
				source: {
					title: 'HUD: Illinois',
					url: 'https://www.hud.gov/states/illinois/offices'
				}
			},{
				type: 'infoSource',
				name: 'HUD Homeownership: Illinois',
				source: {
					title: 'HUD: Illinois',
					url: 'https://www.hud.gov/states/illinois/homeownership'
				}
			},{
				type: 'infoSource',
				name: 'Service Animals',
				source: {
					title: 'ADA service animals booklet',
					url: 'https://adata.org/publication/service-animals-booklet'
				}
			},{
				type: 'infoSource',
				name: 'Service Animals +',
				source: {
					title: 'Service Animal Q & A',
					url: 'https://www.ada.gov/regs2010/service_animal_qa.html'
				}
			}],
			cardsOpacity:[]
		};
		this.shuffleByKnuth = this.shuffleByKnuth.bind(this);
		this.rotateServiceAdjs = this.rotateServiceAdjs.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount(){
		let{adjectives, cardsContent } = this.state;
		let interval = setInterval(this.rotateServiceAdjs, 5000);
		let mixedArr = this.shuffleByKnuth(adjectives.array);
		let objCopy = Object.assign({}, adjectives, {count: 0, interval: interval, array: mixedArr});
		let cardsOpacity = cardsContent.map(() =>{
			return 'opac-trans-0' + (Math.floor(Math.random()*5)+3);
		});
		this.setState({
			adjectives: objCopy,
			cardsOpacity: cardsOpacity
		});
		setTimeout(() => {
			cardsOpacity = cardsOpacity.map((elem) => {
				return elem + ' displayed';
			});
			this.setState({
				cardsOpacity: cardsOpacity
			});
		}, 100);
	}
	componentWillUnmount(){
		let{adjectives, cardsContent} = this.state;
		clearInterval(adjectives.interval);
		for(let i = 0; i < cardsContent.length; i++){
			if(cardsContent[i].type === 'displayList'){
				clearInterval(cardsContent[i].body.counter);
			}
		}
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
		let {cardsContent} = this.state;
		let copyPc = cardsContent;
		let key = e.target.dataset.key;
		if(e.target.dataset.item === 're-display-protected-classes'){
			clearInterval(cardsContent[key].body.counter);
			let pcArray = copyPc[key].body.array;
			if(copyPc[key].body.open){
				//close the list
				let count = 0;
				let elementCount = copyPc[key].body.array.length;
				let listCounter = setInterval(()=>{
					if(count < elementCount){
						pcArray.pop();
						this.setState({
							cardsContent: copyPc
						});
						count++;
					}else{
						clearInterval(cardsContent[key].body.counter);
					}
				}, 100);
				copyPc[key].body.counter = listCounter;
			}else{
				//open the list
				let count = copyPc[key].body.array.length;
				let listCounter = setInterval(()=>{
					if(count < copyPc[key].body.arrayOriginal.length){
						pcArray.push(copyPc[key].body.arrayOriginal[count]);
						this.setState({
							cardsContent: copyPc
						});
						count++;
					}else{
						clearInterval(cardsContent[key].body.counter);
					}
				}, 200);
				copyPc[key].body.counter = listCounter;
			}
			copyPc[key].body.open = !copyPc[key].body.open;
		}
		this.setState({
			cardsContent: copyPc
		});
	}
	render(){
		let{
			adjectives,
			protectedClasses,
			cardsContent,
			cardsOpacity
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
					<RealEstateCards
						content = {cardsContent}
						cssArray = {cardsOpacity}
						handleClick = {this.handleClick}
					/>					
				</div>
			</div>
		);
	}
}