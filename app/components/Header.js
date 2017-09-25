import React from 'react';
import { Link } from 'react-router-dom';
import { NameAnimation } from './NameAnimation';

export class Header extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			nameStr: 'jonathon nagatani',
			nameArr: [],
			nameInterval:false
		};
		this.displayName = this.displayName.bind(this);
		this.addOneLetter = this.addOneLetter.bind(this);
		this.animateName = this.animateName.bind(this);
	}
	componentDidMount(){
		this.displayName(this.state.nameStr);
	}
	displayName(text){
		//review homework5 index201706.js
		//map name array into name div with each letter a span
		let addLettersToNameArr = setInterval(this.addOneLetter,300)
		this.setState({
			nameInterval: addLettersToNameArr
		});
	}
		//gradually add each letter of the name string name into the name array (using timeout function)
		//on individual letter hover, get that letter's index in the array
		//take higher and lower indexes and add css class with special animation
		//remove animation class after animation complete?
		//also account for when name array is empty
	addOneLetter(){
		let{nameArr, nameStr} = this.state;
		let position = nameArr.length;
		let nameLength = nameStr.length;
		let nameArrUpdated = nameArr;
		if(position < nameLength){
			nameArrUpdated.push({
				letter: nameStr[position],
				class: 'letter'
			});
			this.setState({
				nameArr: nameArrUpdated
			});
		}else{
			clearInterval(this.state.nameInterval);
		}
	}
	animateName(letter){
		//letter is the clicked letter
		console.log('animateName function:', letter);
	}


	render(){
		let {
			nameStr,
			nameArr,
			nameInterval
		} = this.state;
		return(
			<header>
				< NameAnimation 
					arr = {nameArr}
					onClick = {this.animateName}
				/>
				<nav>
					<ul>
						<li><Link to = '/'>Home</Link></li>
						<li><Link to = '/projects'>Projects</Link></li>
						<li><Link to = '/thoughts'>Thoughts</Link></li>
					</ul>
				</nav>
			</header>
		);
	}
}