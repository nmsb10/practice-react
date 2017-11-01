import React from 'react';
import {IPCForm} from '../components/IpcForm';
import {IPCAnalysis} from '../components/IpcAnalysis';
import {IPCOtherTermsBox} from '../components/IpcOtherTermsBox';
import * as axios from 'axios';

export class InvestPropCalcContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			onView: 'search',//while searching on search form, is 'search'. otherwise 'loading'. after loading, if results are found, is 'stats' to show stats
			validationMessages:{
				number: ['an actual number'],
				integer: ['a whole number','an integer','without decimals'],
				positive: ['a positive number','> 0','positive','non-negative'],
				float: ['have a decimal'],
				percentage: ['a percentage'],
				string:['a string']
			},
			formFields:{
				purchasePrice:[
					{
						name:'purchase price',
						hasMonthlyAnnual:false,
						value:{
							preEntry:'$',
							amount:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive', 'integer'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'//location of the alert tooltip
						},
						tooltip:{
							textStart:'please enter the',
							textEnd: 'for the subject property (anticipated or actual)',
							location: 'bottom'
						},
						required:true,
						isOpen:true
					}
				],
				income:{
					retail:[{
						name:'business one',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'income (anticipated or actual)',
							location: 'bottom'
						},
						required:false,
						isOpen:true
					},{
						name:'business two',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'income (anticipated or actual)',
							location: 'bottom'
						},
						required:false,
						isOpen:true
					}],
					other:[{//also add other: miscellaneous: state source and amount
						name:'laundry room',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'income for the subject property (estimated or actual)',
							location: 'bottom'
						},
						required:false,
						isOpen:true
					},{
						name:'vending machines',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'income for the subject property (estimated or actual)',
							location: 'bottom'
						},
						required:false,
						isOpen:true
					}],
					rental:[{//state unit or lessee name, and amount
						name:'rental income, unit one',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'integer', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'income for the subject property',
							location: 'bottom'
						},
						required:true,
						isOpen:true
					}]
				},
				expenses:{
					carryingCosts:[{
						name:'real estate property taxes',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'here',
							location: 'bottom'
						},
						required:true,
						isOpen:true
					},{
						name:'property insurance premium',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'expenses here',
							location: 'bottom'
						},
						required:true,
						isOpen:true
					},{
						name:'assessments',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter condomimium, subdivision, or other property',
							textEnd: 'here',
							location: 'bottom'
						},
						required:false,
						isOpen:true
					}],
					utilities:[{
						name:'gas (common hot water)',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'expenses',
							location: 'bottom'
						},
						required:false,
						isOpen:true
					},{
						name:'gas (heat)',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'expenses',
							location: 'bottom'
						},
						required:false,
						isOpen:true
					},{
						name:'electricity (common areas)',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'expenses',
							location: 'bottom'
						},
						required:false,
						isOpen:true
					},{
						name:'water',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter expenses for ',
							textEnd: '',
							location: 'bottom'
						},
						required:true,
						isOpen:true
					},{
						name:'scavenger',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'expenses',
							location: 'bottom'
						},
						required:false,
						isOpen:true
					}],
					other:[{
						name:'repairs | decor',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'expenses',
							location: 'bottom'
						},
						required:false,
						isOpen:true
					},{
						name:'property management',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'expenses',
							location: 'bottom'
						},
						required:false,
						isOpen:true
					},{
						name:'reserves fund',
						hasMonthlyAnnual:true,
						value:{
							preEntry:'$',
							monthly: '',
							annual:'',
							postEntry:'',
							placeholder:'-0-'
						},
						validation:{
							arr: ['number', 'positive'],
							validEntry:false,
							vmes:[],
							showVmes:false,
							invalidValue:'',
							location:'right-alert'
						},
						tooltip:{
							textStart:'please enter',
							textEnd: 'dollar amount here',
							location: 'bottom'
						},
						required:true,
						isOpen:true
					}]
				}
			},
			assumptions:{
				financing:[
					{
						field: 'down payment %',
						preEntry:'',
						amount:'',
						postEntry:'%',
						valueType: ['percentage',2]
					},
					{
						field: 'down payment $',
						preEntry:'$',
						amount:'',
						postEntry:'',
						valueType: ['dollars']
					},
					{//NB APR is higher
						field: 'interest rate (annual)',
						preEntry:'',
						amount:'',
						postEntry:'%',
						valueType: ['interest',3]
					},
					{
						field: 'term of mortgage',
						preEntry:'',
						amount:'',
						postEntry:'years',
						valuetype: ['integer']
					}
				],
				other:[
					{//1 month
						field: 'vacancy factor',
						preEntry:'',
						amount:'',//8.00
						postEntry:'%',
						valueType: ['percentage',2]
					},
					{//rent you will be unable to collect
						field: 'collections',
						preEntry:'',
						amount:'',//2.00
						postEntry:'%',
						valueType: ['percentage',2]
					},
					{//property management; brokerage fee also?
						field: 'property management fee',
						preEntry:'',
						amount:'',//6.00
						postEntry:'%',
						valueType: ['percentage',2]
					},
					{
						field: 'reserves fund',
						preEntry:'',
						amount:'',//5.00
						postEntry:'%',
						valueType: ['percentage',2]
					}
					// 	vaa:3.00,//(property) value appreciation annually
					// 	retia:5.00,//real estate tax increase annually
					// 	aia:3.00,//assessments increase annual
					// 	ria:2.00,//rent increase annual
				]
			}
		};
		this.calculate = this.calculate.bind(this);
		this.updateFormFields = this.updateFormFields.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.randomEntry = this.randomEntry.bind(this);
		this.updateAssumptions = this.updateAssumptions.bind(this);
		this.withCommas = this.withCommas.bind(this);
	}
	calculate(e){
		e.preventDefault();
		let{formFields} = this.state;
		//validate all fields. if any have validEntry === false, print summary of input fields which need corrections
		axios.post('/calculate-investment-property', formFields).then(function(response){
			//console.log(response.data);
		});
		// }.bind(this));
		// .then(() => {
		// 	this.redirectToSearch();
		// })
		// .catch((error) => {
		// 	console.log('search didn\'t work. darn.');
		// });
	}
	redirectToSearch(){
		//'search' is the Route path from routes.js
		this.context.router.push('search');
	}
	updateAssumptions(e){
		let{assumptions} = this.state;
		let newState = assumptions;
		let selected = newState[e.target.dataset.section][e.target.dataset.key];
		let valueType = selected.valueType;
		//remove $, % and , from the inputted value
		let newValue = parseInt(e.target.value.replace(/[$%,]/g, ''));
		let changeValue = false;//ensure is number
		if(isNaN(newValue)){
			return;
		}else{
			selected.amount = newValue;
			let newAssumptions = Object.assign({}, assumptions, newState);
			this.setState({
				assumptions: newAssumptions
			});
			// switch(valueType){
			// 	case 'integer':
			// 		newValue % 1 === 0 ? changeValue = true: changeValue = false;
			// 		break;
			// 	case 'percentage':
			// 		console.log('percentage!');
			// 		newValue = newValue.toFixed(2) + '%';
			// 		console.log(newValue);
			// 		changeValue = true;
			// 		break;
			// 	case 'interest':
			// 		newValue = newValue.toFixed(3) + '%';
			// 		changeValue = true;
			// 		break;
			// 	case 'dollars'://if dollars, add dollar sign to beginning
			// 		newValue = '$' + newValue
			// 		changeValue = true;
			// 		break;
			// 	default:
			// 		break;
			// }
		}
		// if(changeValue){
		// 	newState[e.target.dataset.section][e.target.dataset.key].amount = newValue;
		// 	let newAssumptions = Object.assign({}, assumptions, newState);
		// 	this.setState({
		// 		assumptions: newAssumptions
		// 	});
		// }
	}
	updateFormFields(e){
		let {formFields} = this.state;
		let formFieldsCopy = formFields;
		let section = e.target.dataset.section;
		let key = e.target.dataset.key;
		let sectionArr = section.split('.');
		let specificObject = {};
		//https://stackoverflow.com/questions/4260308/getting-the-objects-property-name	
		//first identify the exact object being changed
		if(sectionArr.length === 1){
			specificObject = formFieldsCopy[sectionArr[0]][key];
			//check if changeFieldName is e.target.dataset.propertyName
			if(e.target.dataset.request === 'changeFieldName'){
				specificObject.name = e.target.value;
			}else if(e.target.dataset.request === 'changeFieldValue'){
				//validate value
				specificObject = this.validateInput(specificObject, e.target.value, e.target.dataset.valPeriod);
			}
		}else if(sectionArr.length === 2){
			specificObject = formFieldsCopy[sectionArr[0]][sectionArr[1]][key];
			//check if changeFieldName is e.target.dataset.propertyName
			if(e.target.dataset.request === 'changeFieldName'){
				specificObject.name = e.target.value;
			}else if(e.target.dataset.request === 'changeFieldValue'){
				//validate value
				specificObject = this.validateInput(specificObject, e.target.value, e.target.dataset.valPeriod);
			}
		}
		let newFormFields = Object.assign({}, formFields, formFieldsCopy);
		this.setState({
			formFields: newFormFields
		});
	}
	validateInput(obj, newValue, period){
		let {validationMessages} = this.state;
		//first check if e.target.value==='' then set all values to ''
		if(newValue === ''){
			obj.validation.validEntry = false;
			obj.validation.showVmes = false;
			if(!obj.hasMonthlyAnnual){
				//update selection which has no monthly annual
				obj.value.amount = '';
			}else{
				obj.value.monthly = '';
				obj.value.annual = '';
			}
			return obj;
		}else{
			//validate according to requirements in individual object
			let validationArr = obj.validation.arr;
			let passedValidations = 0;
			let vmes = [];
			for(let i = 0; i<validationArr.length; i++){
				if(validationArr[i] === 'number'){
					if(isNaN(newValue)){
						vmes.push(this.randomEntry(validationMessages.number));
					}else{
						passedValidations++;
					}
				}
				if(validationArr[i] === 'positive'){
					if((parseInt(newValue, 10)<=0 && !isNaN(newValue)) || isNaN(newValue)){
						vmes.push(this.randomEntry(validationMessages.positive));
					}else{
						passedValidations++;
					}
				}
				if(validationArr[i] === 'integer'){
					if(newValue % 1 !== 0){
						vmes.push(this.randomEntry(validationMessages.integer));
					}else{
						passedValidations++;
					}
				}
				if(validationArr[i] === 'string'){

				}
			}
			//validations complete.
			//update the obj accordingly to pass / fail of the validations:
			if(passedValidations === validationArr.length){
				obj.validation.validEntry = true;
				obj.validation.showVmes = false;
				if(!obj.hasMonthlyAnnual){
					//update selection which has no monthly annual
					obj.value.amount = newValue;
				}else{
					if(period === 'monthly'){
						obj.value.monthly = newValue + '';
						obj.value.annual = parseInt(newValue) * 12 + '';
					}else{//period === 'annual'
						obj.value.annual = newValue;
						obj.value.monthly = (parseInt(newValue) / 12).toFixed(2);
					}
				}
			}else{
				obj.validation.vmes = vmes;
				obj.validation.invalidValue = obj.value.preEntry + newValue + obj.value.postEntry;
				obj.validation.validEntry = false;
				obj.validation.showVmes = true;
			}
			return obj;
		}
	}
	randomEntry(arr){
		return arr[Math.floor(Math.random()*arr.length)];
	}
	handleClick(e){
		let {formFields} = this.state;
		let fieldsCopy = formFields;
		let request = e.target.dataset.itemClicked;
		if(!request){//address situation when the component is clicked but not on a minimize, remove, or addtosection request
			return;
		}
		let section = e.target.dataset.section;
		let sectionArr = section.split('.');
		let specificObject = fieldsCopy[sectionArr[0]];
		let key = e.target.dataset.key;
		if(request === 'minimizeSection'){
			if(sectionArr.length === 1){
				specificObject = specificObject[key];
			}else if(sectionArr.length === 2){
				specificObject = specificObject[sectionArr[1]][key];
			}
			specificObject.isOpen = !specificObject.isOpen;
		}else if(request === 'removeSection'){
			if(sectionArr.length === 1){
				specificObject.splice(key, 1);
			}else if(sectionArr.length === 2){
				specificObject[sectionArr[1]].splice(key, 1);
			}
		}else if(request === 'addToSection'){
			let basicEntry = {
				name:'new field',
				hasMonthlyAnnual:true,
				value:{
					preEntry:'$',
					monthly: '',
					annual:'',
					postEntry:'',
					placeholder:'-0-'
				},
				validation:{
					arr: ['number', 'positive'],
					validEntry:false,
					vmes:[],
					showVmes:false,
					invalidValue:'',
					location:'right-alert'
				},
				tooltip:{
					textStart:'',
					textEnd: '',
					location: 'bottom'
				},
				required:false,
				isOpen:true
			};
			if(sectionArr[0]==='income'){//income section
				basicEntry.tooltip.textStart = 'please enter';
				basicEntry.tooltip.textEnd = 'income for the subject property (estimated or actual)';
			}else if(sectionArr[0]==='expenses'){//expense section
				basicEntry.tooltip.textStart = 'please enter';
				basicEntry.tooltip.textEnd = 'expenses';
			}
			if(sectionArr.length === 1){
				specificObject.push(basicEntry);
			}else if(sectionArr.length === 2){
				specificObject[sectionArr[1]].push(basicEntry);
			}
		}else if(request === 'closeAlertTT'){
			if(sectionArr.length === 1){
				specificObject = specificObject[key];
			}else if(sectionArr.length === 2){
				specificObject = specificObject[sectionArr[1]][key];
			}
			specificObject.validation.showVmes = false;
		}
		let objCopy = Object.assign({}, formFields, fieldsCopy);
		this.setState({
			formFields: objCopy
		});
	}
	withCommas(num){
		//http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
		return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	render(){
		let {
				formFields,
				assumptions
			} = this.state;
		let tierOne = ['income', 'expenses'];
		let tierTwo = [['retail', 'other', 'rental'],['carryingCosts', 'utilities', 'other']];
		return(
			<div className = 'ipc-component'>
				<IPCOtherTermsBox
					assumptions = {assumptions}
					onChange = {this.updateAssumptions}
				/>
				<div className = 'fit-95 form-and-analysis'>
					<IPCForm
						handleSubmit = {this.calculate}
						handleInputChange = {this.updateFormFields}
						fields = {formFields}
						assumptions = {assumptions}
						onClick = {this.handleClick}
					/>
					<IPCAnalysis
						fields = {formFields}
						assumptions = {assumptions}
						withCommas = {this.withCommas}
						tierOne = {tierOne}
						tierTwo = {tierTwo}
					/>
				</div>
			</div>
		);
	}
}