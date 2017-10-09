import React from 'react';

export class Projects extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			colorObject:{
				backgroundColor:'',
				colorArray:[],
				magnitude:0,
				counter:false,
				mounted:false
			}
		};
		this.changeBC = this.changeBC.bind(this);
		this.convertToRGBAString = this.convertToRGBAString.bind(this);
		this.randomColors = this.randomColors.bind(this);
		this.changeValue = this.changeValue.bind(this);
	}
	componentDidMount(){
		let{colorObject} = this.state;
		if(!colorObject.mounted){
			this.changeBC([250, 250, 250, 1], 13, 3000);
		}else{
			this.changeBC(colorObject.colorArray, colorObject.magnitude, 3000);
		}
	}
	componentWillUnmount(){
		clearInterval(this.state.colorObject.counter);
	}
	changeBC(initialRGBA, mag, interval){
		let{colorObject} = this.state;
		let counter = setInterval(this.randomColors, interval);
		let objCopy = Object.assign({}, colorObject, {backgroundColor:this.convertToRGBAString(initialRGBA), colorArray: initialRGBA, magnitude: mag, counter: counter, mounted:true});
		this.setState({
			colorObject: objCopy
		});
	}
	convertToRGBAString(array){
		return 'rgba(' + array.join(',') + ')';
	}
	randomColors(){
		let{colorObject} = this.state;
		let colorArray = colorObject.colorArray;
		for(let i = 0; i < colorArray.length; i ++){
			colorArray[i] = this.changeValue(colorArray[i], colorObject.magnitude);
		}
		//set opacity to 1 for now
		colorArray[3] = 1;
		let objCopy = Object.assign({}, colorObject, {backgroundColor:this.convertToRGBAString(colorArray), colorArray: colorArray});
		this.setState({
			colorObject: objCopy
		});
	}
	changeValue(value, mag){
		//with equal probability, increase or decrease each of the 3 values by mag
		if(Math.random() < 0.5){
			value = value - mag;
		}else{
			value = value + mag;
		}
		if(value < 0){
			value = Math.floor(Math.random()*mag);
		}
		if(value > 255){
			value = 255 - Math.floor(Math.random()*mag);
		}
		return value;
	}
	render(){
		let{colorObject} = this.state;
		let style =
			{
				backgroundColor: colorObject.backgroundColor,
				height:'200px'
			};
		return(
			<div className = 'projects' style = {style}>projects here
			</div>
		);
	}
}

// var bcChange =
// {
// 	element: '',
// 	bc: [],
// 	mag: 0,
// 	counter: '',
// 	interval: function(element, initialRGBA, mag, interval){
// 		bcChange.element = element;
// 		bcChange.bc = initialRGBA;
// 		bcChange.mag = mag;
// 		bcChange.counter = setInterval(bcChange.changeColor, interval);
// 	},
// 	changeColor: function(){
// 		//obtain the element's current rgba
// 		for(var i = 0; i < bcChange.bc.length; i ++){
// 			bcChange.bc[i] = bcChange.changeValue(bcChange.bc[i], bcChange.mag);
// 		}
// 		//for now, set a (opacity) to 1
// 		bcChange.bc[3] = 1;
// 		//set background color to new values
// 		// document.getElementById(element).style.backgroundColor = 'rgba(' + [255,0,0, 0.5].join(',') + ')';
// 		//http://www.w3schools.com/jsref/dom_obj_style.asp
// 		document.getElementById(bcChange.element).style.backgroundColor = 'rgba(' + bcChange.bc + ')';
// 	},
// 	changeValue: function(value, mag){
// 		//with equal probability, increase or decrease each of the 3 values by mag
// 		if(Math.random() < 0.5){
// 			value = value - mag;
// 		}else{
// 			value = value + mag;
// 		}
// 		if(value < 0){
// 			value = Math.floor(Math.random()*mag);
// 		}
// 		if(value > 255){
// 			value = 255 - Math.floor(Math.random()*mag);
// 		}
// 		return value;
// 	},
// 	stop: function(){
// 		clearInterval(bcChange.counter);
// 	}
// };