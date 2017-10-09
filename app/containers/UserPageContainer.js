import React from 'react';
import {Header} from '../components/Header';
import {Main} from '../config/Main';
import {Footer} from '../components/Footer';

export class UserPageContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			nameObjJN:{
				nameStr: 'jonathon nagatani',
				nameArr: [],
				nameInterval:null,
				selectedLetter:false,
				lettersInterval:null,
				letterCount:false,
				animating:false
			},
			currentYear:0
		};
		this.displayHeaderName = this.displayHeaderName.bind(this);
		this.addOneHeaderLetter = this.addOneHeaderLetter.bind(this);
		this.getCurrentYear = this.getCurrentYear.bind(this);
		this.animateName = this.animateName.bind(this);
		this.animateLetters = this.animateLetters.bind(this);
	}
	componentDidMount(){
		this.displayHeaderName(190);
		this.getCurrentYear();
	}
	getCurrentYear(){
		//http://www.w3schools.com/jsref/jsref_obj_date.asp
		let d = new Date();
		this.setState({
			currentYear: d.getFullYear()
		});
	}
	displayHeaderName(letterSpeed){
		//map name array into name div with each letter a span
		let{nameObjJN} = this.state;
		let interval = setInterval(this.addOneHeaderLetter,letterSpeed);
		let newObjCopy = Object.assign({}, nameObjJN, {nameInterval: interval});
		this.setState({
			nameObjJN: newObjCopy
		});
	}
	addOneHeaderLetter(){
		let{nameObjJN} = this.state;
		let position = nameObjJN.nameArr.length;
		let nameLength = nameObjJN.nameStr.length;
		let nameArrUpdated = nameObjJN.nameArr;
		if(position < nameLength){
			nameArrUpdated.push({
				letter: nameObjJN.nameStr[position],
				class: 'letter'
			});
			let newObjCopy = Object.assign({}, nameObjJN, {nameArr: nameArrUpdated});
			this.setState({
				nameObjJN: newObjCopy
			});
		}else{
			clearInterval(nameObjJN.nameInterval);
		}
	}
	animateName(letter){
		let{nameObjJN} = this.state;
		if(!nameObjJN.animating){
			let interval = setInterval(this.animateLetters, 500);
			let newObjCopy = Object.assign({}, nameObjJN, {animating: true, selectedLetter: letter, lettersInterval: interval, letterCount:1});
			this.setState({
				nameObjJN: newObjCopy
			});
		}
	}
	animateLetters(){
		let{nameObjJN} = this.state;
		let lower = false, higher = false;
		let newNameArr = nameObjJN.nameArr;
		//see if the lower letter index is >=0
		if(nameObjJN.selectedLetter - nameObjJN.letterCount >=0){
			newNameArr[nameObjJN.selectedLetter - nameObjJN.letterCount].class = 'letter letter-animated';
			lower = true;
		}
		if(nameObjJN.selectedLetter + nameObjJN.letterCount < newNameArr.length){
			newNameArr[nameObjJN.selectedLetter + nameObjJN.letterCount].class = 'letter letter-animated';
			higher = true;
		}
		if(lower || higher){
			let newObjCopy = Object.assign({}, nameObjJN, {nameArr: newNameArr, letterCount: nameObjJN.letterCount + 1});
			this.setState({
				nameObjJN: newObjCopy
			});
		}else{
			clearInterval(nameObjJN.lettersInterval);
			let newObjCopy = Object.assign({}, nameObjJN, {animating: false, nameArr: []});
			setTimeout(() => {
				this.setState({
					nameObjJN: newObjCopy
				});
				this.displayHeaderName(100);
			}, 7000);
		}
	}
	render(){
		let{
			nameObjJN,
			currentYear
		} = this.state;
		return(
			<div>
				<Header
					nameObject = {nameObjJN}
					animateName = {this.animateName}
				/>
				<Main />
				<Footer
					year = {currentYear}
					name = {nameObjJN.nameStr}
				/>
			</div>
		);
	}
}