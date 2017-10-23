import React from 'react';
import {IPCForm} from '../components/IpcForm';
import {IPCAnalysis} from '../components/IpcAnalysis';
import * as axios from 'axios';

export class InvestPropCalcContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			onView: 'search',//while searching on search form, is 'search'. otherwise 'loading'. after loading, if results are found, is 'stats' to show stats
			validationMessages:{
				positive: ['please enter a positive number','positive numbers only please','sorry, no negative numbers here'],
				number: ['please enter a number','numbers only please'],
				integer: ['please enter whole numbers only','no decimals please'],
				float: ['enter a decimal'],
				percentage: ['enter a percentage'],
				string:['']
			},
			formFields:{
				purchasePrice:[
					{
						name:'purchase price',
						preEntry:'$',
						hasMonthlyAnnual:false,
						value:'',
						postEntry:'',
						placeholder:'-0-',
						required:true,
						validation: ['positive', 'number', 'integer'],
						validEntry:false,
						showVmes:false,
						vmes:'',
						tooltip:'enter the purchase price for the subject property (anticipated or actual)',
						ttLoc:'bottom',
						isOpen:true
					}
				],
				income:{
					retail:[{
						name:'business one',
						preEntry:'$',
						hasMonthlyAnnual:true,
						value:{
							monthly: '',
							annual:''
						},
						postEntry:'',
						placeholder:'-0-',
						required:true,
						validation: ['positive', 'number'],
						validEntry:false,
						showVmes:false,
						vmes:'',
						tooltip:'enter business one income (anticipated or actual)',
						ttLoc:'bottom',
						isOpen:true
					},{
						name:'business two',
						preEntry:'$',
						hasMonthlyAnnual:true,
						value:{
							monthly: '',
							annual:''
						},
						postEntry:'',
						placeholder:'-0-',
						required:false,
						validation: ['positive', 'number'],
						validEntry:false,
						showVmes:true,
						vmes:'required',
						tooltip:'enter business two income (anticipated or actual)',
						ttLoc:'bottom',
						isOpen:true
					}],
					other:[{//also add other: miscellaneous: state source and amount
						name:'laundry room',
						preEntry:'$',
						hasMonthlyAnnual:true,
						value:{
							monthly: '',
							annual:''
						},
						postEntry:'',
						placeholder:'-0-',
						required:false,
						validation: ['positive', 'number'],
						validEntry:false,
						showVmes:false,
						vmes:'',
						tooltip:'enter the laundry room income for the subject property (estimated or actual)',
						ttLoc:'bottom',
						isOpen:true
					},{
						name:'vending machines',
						preEntry:'$',
						hasMonthlyAnnual:true,
						value:{
							monthly: '',
							annual:''
						},
						postEntry:'',
						placeholder:'-0-',
						required:false,
						validation: ['positive', 'number'],
						validEntry:false,
						showVmes:false,
						vmes:'',
						tooltip:'enter vending machine income for the subject property (estimated or actual)',
						ttLoc:'bottom',
						isOpen:true
					}],
					rental:[{//state unit or lessee name, and amount
						name:'rental income, unit one',
						preEntry:'$',
						hasMonthlyAnnual:true,
						value:{
							monthly: '',
							annual:''
						},
						postEntry:'',
						placeholder:'-0-',
						required:true,
						validation: ['positive', 'number','integer'],
						validEntry:false,
						showVmes:true,
						vmes:'validation mes for rental income',
						tooltip:'enter the rental income for the subject property',
						ttLoc:'bottom',
						isOpen:true
					}]
				}
			},
				// expenses:{
				// 	carryingCosts:{
				// 		taxes:0,//real estate property taxes
				// 		insurance:0,//property insurance
				// 		assessments:0//condominium or property assessments
				// 	},
				// 	utilities:{
				// 		gasCHW:0,//common hot water
				// 		gasHeat:0,
				// 		electricity:0,//common areas
				// 		water:0,
				// 		scavenger:0
				// 	},
				// 	other:{
				// 		repairs:0,//repairs and decor
				// 		management:0,//property managements
				// 		reserves:0//reserves fund
				// 	}
				// },
				// finTerms:{//financing terms
				// 	downPayment:0,
				// 	intAnnual:0,//annual interest rate NB APR is higher
				// 	term:0//in years
				// },
				// assumptions:{
				// 	vaa:3.00,//(property) value appreciation annually
				// 	retia:5.00,//real estate tax increase annually
				// 	aia:3.00,//assessments increase annual
				// 	ria:2.00,//rent increase annual
				// 	vf:8.00,//vacancy factor
				// 	collections:2.00,//collections
				// 	management:6.00,//property management fee
				// 	reserves:5.00//reserves fund
				// }
			// ],
		};
		this.calculate = this.calculate.bind(this);
		this.updateFormFields = this.updateFormFields.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.randomEntry = this.randomEntry.bind(this);
	}
	calculate(e){
		e.preventDefault();
		let{formFields} = this.state;
		//validate all fields. if any have validEntry === false, print summary of input fields which need corrections
		axios.post('/calculate-investment-property', formFields).then(function(response){
			console.log(response.data);
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
	updateFormFields(e){
		let {formFields} = this.state;
		let formFieldsCopy = formFields;
		let section = e.target.dataset.section;
		let key = e.target.dataset.key;
		let sectionArr = section.split('.');
		let specificObject = {};
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
		console.log(specificObject);
		let newFormFields = Object.assign({}, formFields, formFieldsCopy);
		this.setState({
			formFields: newFormFields
		});

		//https://stackoverflow.com/questions/4260308/getting-the-objects-property-name
	}
	validateInput(obj, newValue, period){
		let {validationMessages} = this.state;
		//first check if e.target.value==='' then set all values to ''
		if(newValue === ''){
			obj.validEntry = true;
			obj.showVmes = false;
			if(!obj.hasMonthlyAnnual){
				//update selection which has no monthly annual
				obj.value = '';
			}else{
				obj.value.monthly = '';
				obj.value.annual = '';
			}
			return obj;
		}else{
			//validate according to requirements in individual object
			let validationArr = obj.validation;
			let passedValidations = 0;
			let vmes = '';
			for(let i = 0; i<validationArr.length; i++){
				if(validationArr[i] === 'number'){
					if(isNaN(newValue)){
						vmes += this.randomEntry(validationMessages.number);
					}else{
						passedValidations++;
					}
				}
				if(validationArr[i] === 'positive'){
					if((parseInt(newValue, 10)<=0 && !isNaN(newValue)) || isNaN(newValue)){
						vmes += this.randomEntry(validationMessages.positive);
					}else{
						passedValidations++;
					}
				}
				if(validationArr[i] === 'integer'){
					if(newValue % 1 !== 0){
						vmes += this.randomEntry(validationMessages.integer);
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
				console.log('input successfully passes validations');
				obj.validEntry = true;
				obj.showVmes = false;
				if(!obj.hasMonthlyAnnual){
					//update selection which has no monthly annual
					obj.value = newValue;
				}else{
					if(period === 'monthly'){
						obj.value.monthly = newValue;
						obj.value.annual = parseInt(newValue) * 12;
					}else{//period === 'annual'
						obj.value.annual = newValue;
						obj.value.monthly = (parseInt(newValue) / 12).toFixed(2);
					}
				}
			}else{
				obj.vmes = vmes;
				obj.validEntry = false;
				obj.showVmes = true;
			}
			return obj;
		}

		//http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
		// function withCommas(x) {
		// 	return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		// }

		//review array functions including filter
	}
	randomEntry(arr){
		return arr[Math.floor(Math.random()*arr.length)];
	}
	handleClick(e){
		let {formFields} = this.state;
		let fieldsCopy = formFields;
		let request = e.target.dataset.itemClicked;
		let section = e.target.dataset.section;
		let key = e.target.dataset.key;
		if(request === 'minimizeSection'){
			let sectionArr = section.split('.');
			let specificObject = fieldsCopy[sectionArr[0]];
			if(sectionArr.length === 1){
				specificObject = specificObject[key];
				specificObject.isOpen = !specificObject.isOpen;
			}else if(sectionArr.length === 2){
				specificObject = specificObject[sectionArr[1]][key];
				specificObject.isOpen = !specificObject.isOpen;
			}
			let objCopy = Object.assign({}, formFields, fieldsCopy);
			this.setState({
				formFields: objCopy
			});
		}
		if(request === 'removeSection'){
			console.log('please remove section in:', section,' with key',key);
		}
		if(request === 'addToSection'){
			console.log('section to which to add an object:',section);
		}
	}
	render(){
		let { formFields } = this.state;
		return(
			<div className = 'fit-95'>
				<IPCForm
					handleSubmit = {this.calculate}
					handleInputChange = {this.updateFormFields}
					fields = {formFields}
					onClick = {this.handleClick}
				/>
				<IPCAnalysis
				/>
			</div>
		);
	}
}