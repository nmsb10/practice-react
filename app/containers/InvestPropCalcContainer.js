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
							text:'enter the purchase price for the subject property (anticipated or actual)',
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
							text:'enter business one income (anticipated or actual)',
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
							text:'enter business two income (anticipated or actual)',
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
							text:'enter the laundry room income for the subject property (estimated or actual)',
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
							text:'enter vending machine income for the subject property (estimated or actual)',
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
							text:'enter the rental income for the subject property',
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
							text:'enter the real estate property taxes here',
							location: 'bottom'
						},
						required:true,
						isOpen:true
					},{
						name:'property insurance',
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
							text:'enter the property insurance premiums here',
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
							text:'enter the condomimium, subdivision, or other property assessments here',
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
							text:'enter costs for gas to heat the common hot water',
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
							text:'enter heating gas expenses',
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
							text:'enter electricity costs',
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
							text:'enter expenses for water',
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
							text:'enter scavenger, refuse and waste pickup, recycling costs',
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
							text:'enter repairs and decor expenses',
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
							text:'enter property management expenses',
							location: 'bottom'
						},
						required:false,
						isOpen:true
					},{
						name:'reserves',
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
							text:'enter reserves fund dollar amount here',
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
						field: 'down payment',
						amount:''
					},
					{//NB APR is higher
						field: 'interest rate (annual)',
						amount:''
					},
					{
						field: 'term of mortgage (years)',
						amount:''
					}
				],
				other:[
					{//1 month
						field: 'vacancy factor',
						amount:8.00
					},
					{//rent you will be unable to collect
						field: 'collections',
						amount:2.00
					},
					{//property management; brokerage fee also?
						field: 'property management fee',
						amount:6.00
					},
					{
						field: 'reserves fund',
						amount:5.00
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
	updateAssumptions(e){

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
						obj.value.monthly = newValue;
						obj.value.annual = parseInt(newValue) * 12;
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
		let sectionArr = section.split('.');
		let specificObject = fieldsCopy[sectionArr[0]];
		let key = e.target.dataset.key;
		if(request === 'minimizeSection'){
			if(sectionArr.length === 1){
				specificObject = specificObject[key];
				specificObject.isOpen = !specificObject.isOpen;
			}else if(sectionArr.length === 2){
				specificObject = specificObject[sectionArr[1]][key];
				specificObject.isOpen = !specificObject.isOpen;
			}
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
					text:'enter new values here',
					location: 'bottom'
				},
				required:false,
				isOpen:true
			};
			if(sectionArr.length === 1){
				specificObject.push(basicEntry);
			}else if(sectionArr.length === 2){
				specificObject[sectionArr[1]].push(basicEntry);
			}
		}
		let objCopy = Object.assign({}, formFields, fieldsCopy);
		this.setState({
			formFields: objCopy
		});
	}
	render(){
		let {
				formFields,
				assumptions
			} = this.state;
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
					/>
				</div>
			</div>
		);
	}
}