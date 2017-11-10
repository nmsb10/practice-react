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
				selectedLetter:null,
				lettersInterval:null,
				letterCount:null,
				animating:false
			},
			currentYear:0,
			activePage:'home'
		};
		this.displayHeaderName = this.displayHeaderName.bind(this);
		this.addOneHeaderLetter = this.addOneHeaderLetter.bind(this);
		this.getCurrentYear = this.getCurrentYear.bind(this);
		this.animateName = this.animateName.bind(this);
		this.animateLetters = this.animateLetters.bind(this);
		this.changeCurrentPage = this.changeCurrentPage.bind(this);
	}
	componentDidMount(){
		this.displayHeaderName(190);
		this.getCurrentYear();
	}
	componentWillUnmount(){
		clearInterval(this.state.nameObjJN.nameInterval);
		clearInterval(this.state.nameObjJN.lettersInterval);
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
				class: 'letter-initial'
			});
			let newObjCopy = Object.assign({}, nameObjJN, {nameArr: nameArrUpdated});
			this.setState({
				nameObjJN: newObjCopy
			});
		}else{
			clearInterval(nameObjJN.nameInterval);
		}
	}
	animateName(e){
		let letter = parseInt(e.target.dataset.letterPosition);
		let{nameObjJN} = this.state;
		let newNameArr = nameObjJN.nameArr;
		newNameArr[letter].class += ' letter-animated';
		if(!nameObjJN.animating){
			let interval = setInterval(this.animateLetters, 500);
			let newObjCopy = Object.assign({}, nameObjJN, {animating: true, selectedLetter: letter, lettersInterval: interval, letterCount:1, nameArr: newNameArr});
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
			newNameArr[nameObjJN.selectedLetter - nameObjJN.letterCount].class += ' letter-animated';
			lower = true;
		}
		if(nameObjJN.selectedLetter + nameObjJN.letterCount < newNameArr.length){
			newNameArr[nameObjJN.selectedLetter + nameObjJN.letterCount].class += ' letter-animated';
			higher = true;
		}
		if(lower || higher){
			let newObjCopy = Object.assign({}, nameObjJN, {nameArr: newNameArr, letterCount: nameObjJN.letterCount + 1});
			this.setState({
				nameObjJN: newObjCopy
			});
		}else{
			clearInterval(nameObjJN.lettersInterval);
			for(let i = 0; i<newNameArr.length; i++){
				newNameArr[i].class = 'letter';
			}
			let newObjCopy = Object.assign({}, nameObjJN, {animating: false, nameArr: newNameArr});
			setTimeout(() => {
				this.setState({
					nameObjJN: newObjCopy
				});
				//this.displayHeaderName(100);
			}, 7000);
		}
	}
	changeCurrentPage(e){
		let page = e.target.dataset.pageName;
		this.setState({
			activePage: page
		});
	}
	render(){
		let{
			nameObjJN,
			currentYear,
			activePage
		} = this.state;
		return(
			<div>
				<Header
					nameObject = {nameObjJN}
					animateName = {this.animateName}
					currentPage = {activePage}
					handleClick = {this.changeCurrentPage}
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