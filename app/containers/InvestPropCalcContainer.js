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
			tierOne: ['income', 'expenses'],
			tierTwo: [
				[{
					obj: 'rental',
					display: 'Residential Rental'
				},{
					obj:'retail',
					display:'Retail Rental'
				},{
					obj: 'other',
					display: 'Other'
				}],
				[{
					obj: 'carryingCosts',
					display: 'Carrying Costs'
				},{
					obj: 'utilities',
					display: 'Utilities'
				},{
					obj: 'other',
					display: 'Other'
				}]
			],
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
						name:'business one name',
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
						name:'business two name',
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
			},
			incomeSummary: {
				gpi:{
					total: {
						monthly:0,
						annual:0
					},
					totals: {
						rental:{
							monthly:0,
							annual:0
						},
						retail:{
							monthly:0,
							annual:0
						},
						other:{
							monthly:0,
							annual:0
						}
					},
					tooltip:{
						monthly:{
							location: 'left',
							cssClassAdd:'calc',
							sign:'plus',
							figures:[],
							total:''
						},
						annual:{
							location: 'left',
							cssClassAdd:'calc',
							sign: 'plus',
							figures:[],
							total:''
						}
					}
				},
				vacancy:{
					total: {monthly:0, annual:0},
					tooltip:{
						monthly:{
							location: 'left',
							cssClassAdd:'calc',
							sign: 'multiply',
							figures:[],
							total:''
						},
						annual:{
							location: 'left',
							cssClassAdd:'calc',
							sign: 'multiply',
							figures:[],
							total:''
						}
					}
				},
				collections:{
					total: {monthly:0, annual:0},
					tooltip:{
						monthly:{
							location: 'left',
							cssClassAdd:'calc',
							sign: 'multiply',
							figures:[],
							total:''
						},
						annual:{
							location: 'left',
							cssClassAdd:'calc',
							sign: 'multiply',
							figures:[],
							total:''
						}
					}
				},
				egi:{
					total: {monthly:0, annual:0},
					tooltip:{
						monthly:{
							location: 'left',
							cssClassAdd:'calc',
							sign: 'subtract',
							figures:[],
							total:''
						},
						annual:{
							location: 'bottom',
							cssClassAdd:'calc',
							sign: 'subtract',
							figures:[],
							total:''
						}
					}
				}
			},
			expensesSummary: {
				oe:{//operating expenses
					total: {
						monthly:0,
						annual:0
					},
					totals: {
						carryingCosts:{
							monthly:[],
							annual:[]
						},
						utilities:{
							monthly:[],
							annual:[]
						},
						other:{
							monthly:[],
							annual:[]
						}
					},
					tooltip:{
						monthly:{
							location: 'left',
							cssClassAdd:'calc',
							sign:'plus',
							figures:[],
							total:''
						},
						annual:{
							location: 'bottom',
							cssClassAdd:'calc',
							sign: 'plus',
							figures:[],
							total:''
						}
					}
				},
				carryingCosts:{
					total: {monthly:0, annual:0},
					tooltip:{
						monthly:{
							location: 'left',
							cssClassAdd:'calc',
							sign: 'add',
							figures:[],
							total:''
						},
						annual:{
							location: 'left',
							cssClassAdd:'calc',
							sign: 'add',
							figures:[],
							total:''
						}
					}
				},
				utilities:{
					total: {monthly:0, annual:0},
					tooltip:{
						monthly:{
							location: 'left',
							cssClassAdd:'calc',
							sign: 'add',
							figures:[],
							total:''
						},
						annual:{
							location: 'bottom',
							cssClassAdd:'calc',
							sign: 'add',
							figures:[],
							total:''
						}
					}
				},
				other:{
					total: {monthly:0, annual:0},
					tooltip:{
						monthly:{
							location: 'left',
							cssClassAdd:'calc',
							sign: 'add',
							figures:[],
							total:''
						},
						annual:{
							location: 'bottom',
							cssClassAdd:'calc',
							sign: 'add',
							figures:[],
							total:''
						}
					}
				}
			},
			noiSummary: [{
				total: {
					monthly:0,
					annual:0					
				},
				tooltip:{
					monthly:{
						location: 'left',
						cssClassAdd:'calc',
						sign:'subtract',
						figures:[],
						total:''
					},
					annual:{
						location: 'bottom',
						cssClassAdd:'calc',
						sign: 'subtract',
						figures:[],
						total:''
					}
				}
			}],
			incomeSummaryOrder: [
				{
					obj:'gpi',
					display: 'Gross Potential Income (GPI)'
				},{
					obj: 'vacancy',
					display: 'Vacancy'
				},{
					obj: 'collections',
					display: 'Collections'
				},{
					obj: 'egi',
					display: 'Effective Gross Income (EGI)'
				}
			],
			expensesSummaryOrder: [
				{
					obj:'oe',
					display: 'Operating Expenses'
				}
			]
		};
		this.calculate = this.calculate.bind(this);
		this.updateFormFields = this.updateFormFields.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.randomEntry = this.randomEntry.bind(this);
		this.updateAssumptions = this.updateAssumptions.bind(this);
		this.withCommas = this.withCommas.bind(this);
		this.updateSummaryContents = this.updateSummaryContents.bind(this);
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
			this.updateSummaryContents();
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
		if(e.target.dataset.request !== 'changeFieldName'){
			this.updateSummaryContents();
		}
	}
	updateSummaryContents(){
		let {
			tierOne,
			tierTwo,
			formFields,
			assumptions,
			incomeSummary,
			expensesSummary,
			noiSummary,
			incomeSummaryOrder,
			expensesSummaryOrder
		} = this.state;
		//first must reset values
		let incomeSummaryCopy = incomeSummary;
		let expensesSummaryCopy = expensesSummary;
		let noiSummaryCopy = noiSummary;
		tierOne.map((tierOneName, i) => {
				tierTwo[i].map( (tierTwoName, j) => {
					//first must reset values
					if(tierOneName === 'income'){
						incomeSummaryCopy.gpi.totals[tierTwoName.obj].monthly = 0;
						incomeSummaryCopy.gpi.totals[tierTwoName.obj].annual = 0;
					}else if(tierOneName === 'expenses'){
						expensesSummaryCopy.oe.totals[tierTwoName.obj].monthly = 0;
						expensesSummaryCopy.oe.totals[tierTwoName.obj].annual = 0;
					}
						formFields[tierOneName][tierTwoName.obj].map( (contents, k) => {
							let monthlyValue = contents.value.monthly === '' ? 0 : parseInt(contents.value.monthly);
							let annualValue = contents.value.annual === '' ? 0 : parseInt(contents.value.annual);
							if(tierOneName === 'income'){
								incomeSummaryCopy.gpi.totals[tierTwoName.obj].monthly += monthlyValue;
								incomeSummaryCopy.gpi.totals[tierTwoName.obj].annual += annualValue;
							}else if(tierOneName === 'expenses'){
								expensesSummaryCopy.oe.totals[tierTwoName.obj].monthly += monthlyValue;
								expensesSummaryCopy.oe.totals[tierTwoName.obj].annual += annualValue;
							}
						});
				});
		});
		//former method when the totals for each section were separate integers in an array
		//let retailTotalMonthly = incomeSummaryCopy.gpi.totals.retail.monthly.reduce((total, num) => total + parseInt(num), 0);
		//let otherTotalMonthly = incomeSummaryCopy.gpi.totals.other.monthly.reduce((total, num) => total + parseInt(num), 0);
		//let resTotalMonthly = incomeSummaryCopy.gpi.totals.rental.monthly.reduce((total, num) => total + parseInt(num), 0);
		let retailTotalMonthly = incomeSummaryCopy.gpi.totals.retail.monthly;
		let otherTotalMonthly = incomeSummaryCopy.gpi.totals.other.monthly;
		let resTotalMonthly = incomeSummaryCopy.gpi.totals.rental.monthly;
		incomeSummaryCopy.gpi.total.monthly = (retailTotalMonthly + otherTotalMonthly + resTotalMonthly).toFixed(2);
		let retailTotalAnnual = incomeSummaryCopy.gpi.totals.retail.annual;
		let otherTotalAnnual = incomeSummaryCopy.gpi.totals.other.annual;
		let resTotalAnnual = incomeSummaryCopy.gpi.totals.rental.annual;
		incomeSummaryCopy.gpi.total.annual = (retailTotalAnnual + otherTotalAnnual + resTotalAnnual).toFixed(2);
		//gpi tooltip calculations
		incomeSummaryCopy.gpi.tooltip.monthly.total = (retailTotalMonthly + otherTotalMonthly + resTotalMonthly).toFixed(2);
		incomeSummaryCopy.gpi.tooltip.annual.total = (retailTotalAnnual + otherTotalAnnual + resTotalAnnual).toFixed(2);
		//vacancy totals and tooltip totals
		incomeSummaryCopy.vacancy.total.monthly = (assumptions.other[0].amount * 0.01 * incomeSummaryCopy.gpi.total.monthly).toFixed(2);
		incomeSummaryCopy.vacancy.total.annual = (assumptions.other[0].amount * 0.01 * incomeSummaryCopy.gpi.total.annual).toFixed(2);
		incomeSummaryCopy.vacancy.tooltip.monthly.total = (assumptions.other[0].amount * 0.01 * incomeSummaryCopy.gpi.total.monthly).toFixed(2);
		incomeSummaryCopy.vacancy.tooltip.annual.total = (assumptions.other[0].amount * 0.01 * incomeSummaryCopy.gpi.total.annual).toFixed(2);
		//collections totals and tooltip totals
		incomeSummaryCopy.collections.total.monthly = (assumptions.other[1].amount * 0.01 * incomeSummaryCopy.gpi.total.monthly).toFixed(2);
		incomeSummaryCopy.collections.total.annual = (assumptions.other[1].amount * 0.01 * incomeSummaryCopy.gpi.total.annual).toFixed(2);
		incomeSummaryCopy.collections.tooltip.monthly.total = (assumptions.other[1].amount * 0.01 * incomeSummaryCopy.gpi.total.monthly).toFixed(2);
		incomeSummaryCopy.collections.tooltip.annual.total = (assumptions.other[1].amount * 0.01 * incomeSummaryCopy.gpi.total.annual).toFixed(2);
		//egi totals and tooltip totals
		incomeSummaryCopy.egi.total.monthly = (incomeSummaryCopy.gpi.total.monthly - incomeSummaryCopy.vacancy.total.monthly - incomeSummaryCopy.collections.total.monthly).toFixed(2);
		incomeSummaryCopy.egi.total.annual = (incomeSummaryCopy.gpi.total.annual - incomeSummaryCopy.vacancy.total.annual - incomeSummaryCopy.collections.total.annual).toFixed(2);
		incomeSummaryCopy.egi.tooltip.monthly.total = (incomeSummaryCopy.gpi.total.monthly - incomeSummaryCopy.vacancy.total.monthly - incomeSummaryCopy.collections.total.monthly).toFixed(2);
		incomeSummaryCopy.egi.tooltip.annual.total = (incomeSummaryCopy.gpi.total.annual - incomeSummaryCopy.vacancy.total.annual - incomeSummaryCopy.collections.total.annual).toFixed(2);
		//gpi tooltip contents:
		incomeSummaryCopy.gpi.tooltip.monthly.figures = [];
		incomeSummaryCopy.gpi.tooltip.monthly.figures.push(
			'total rental income (res.): $'+ resTotalMonthly,
			'total rental income (retail): $'+ retailTotalMonthly,
			'total other income: $'+ otherTotalMonthly);
		incomeSummaryCopy.gpi.tooltip.annual.figures = [];
		incomeSummaryCopy.gpi.tooltip.annual.figures.push(
			'total rental income (res.): $'+ resTotalAnnual,
			'total rental income (retail): $'+ retailTotalAnnual,
			'total other income: $'+ otherTotalAnnual);
		//vacancy tooltip
		incomeSummaryCopy.vacancy.tooltip.monthly.figures = [];
		incomeSummaryCopy.vacancy.tooltip.monthly.figures.push(
			'GPI: $'+ incomeSummaryCopy.gpi.total.monthly,
			'Vacancy Factor: '+ assumptions.other[0].amount + '%');
		incomeSummaryCopy.vacancy.tooltip.annual.figures = [];
		incomeSummaryCopy.vacancy.tooltip.annual.figures.push(
			'GPI: $'+ incomeSummaryCopy.gpi.total.annual,
			'Vacancy Factor: '+ assumptions.other[0].amount + '%');
		//collections tooltip
		incomeSummaryCopy.collections.tooltip.monthly.figures = [];
		incomeSummaryCopy.collections.tooltip.monthly.figures.push(
			'GPI: $'+ incomeSummaryCopy.gpi.total.monthly,
			'Collections Factor: '+ assumptions.other[1].amount + '%');
		incomeSummaryCopy.collections.tooltip.annual.figures = [];
		incomeSummaryCopy.collections.tooltip.annual.figures.push(
			'GPI: $'+ incomeSummaryCopy.gpi.total.annual,
			'Collections Factor: '+ assumptions.other[1].amount + '%');
		//egi tooltip
		incomeSummaryCopy.egi.tooltip.monthly.figures = [];
		incomeSummaryCopy.egi.tooltip.monthly.figures.push(
			'GPI: $'+ incomeSummaryCopy.gpi.total.monthly,
			'Vacancy total: $'+ incomeSummaryCopy.vacancy.total.monthly,
			'Collections total: $'+ incomeSummaryCopy.collections.total.monthly);
		incomeSummaryCopy.egi.tooltip.annual.figures = [];
		incomeSummaryCopy.egi.tooltip.annual.figures.push(
			'GPI: $'+ incomeSummaryCopy.gpi.total.annual,
			'Vacancy total: $'+ incomeSummaryCopy.vacancy.total.annual,
			'Collections: $'+ incomeSummaryCopy.collections.total.annual);
		//for expenses summary data======================================
		let carryingCostsTotalMonthly = expensesSummaryCopy.oe.totals.carryingCosts.monthly;
		let utilitiesTotalMonthly = expensesSummaryCopy.oe.totals.utilities.monthly;
		let otherExpensesTotalMonthly = expensesSummaryCopy.oe.totals.other.monthly;
		expensesSummaryCopy.oe.total.monthly = (carryingCostsTotalMonthly + utilitiesTotalMonthly + otherExpensesTotalMonthly).toFixed(2);
		let carryingCostsTotalAnnual = expensesSummaryCopy.oe.totals.carryingCosts.annual;
		let utilitiesTotalAnnual = expensesSummaryCopy.oe.totals.utilities.annual;
		let otherExpensesTotalAnnual = expensesSummaryCopy.oe.totals.other.annual;
		expensesSummaryCopy.oe.total.annual = (carryingCostsTotalAnnual + utilitiesTotalAnnual + otherExpensesTotalAnnual).toFixed(2);
		//gpi tooltip calculations
		expensesSummaryCopy.oe.tooltip.monthly.total = expensesSummaryCopy.oe.total.monthly;
		expensesSummaryCopy.oe.tooltip.annual.total = expensesSummaryCopy.oe.total.annual;
		expensesSummaryCopy.oe.tooltip.monthly.figures = [];
		expensesSummaryCopy.oe.tooltip.monthly.figures.push(
			'total carrying costs: $'+ carryingCostsTotalMonthly,
			'total utilities costs: $'+ utilitiesTotalMonthly,
			'total other costs: $'+ otherExpensesTotalMonthly);
		expensesSummaryCopy.oe.tooltip.annual.figures = [];
		expensesSummaryCopy.oe.tooltip.annual.figures.push(
			'total carrying costs: $'+ carryingCostsTotalAnnual,
			'total utilities costs: $'+ utilitiesTotalAnnual,
			'total other costs: $'+ otherExpensesTotalAnnual);
		//noi calculations=====================================
		noiSummaryCopy[0].total.monthly = (incomeSummaryCopy.egi.total.monthly - expensesSummaryCopy.oe.total.monthly).toFixed(2);
		noiSummaryCopy[0].total.annual = (incomeSummaryCopy.egi.total.annual - expensesSummaryCopy.oe.total.annual).toFixed(2);
		//tooltip calculations
		noiSummaryCopy[0].tooltip.monthly.total = noiSummaryCopy[0].total.monthly;
		noiSummaryCopy[0].tooltip.annual.total = noiSummaryCopy[0].total.annual;
		//insert content of the tooltips
		noiSummaryCopy[0].tooltip.monthly.figures = [];
		noiSummaryCopy[0].tooltip.monthly.figures.push(
			'EGI: $'+ incomeSummaryCopy.egi.total.monthly,
			'total operating expenses: $'+ expensesSummaryCopy.oe.total.monthly);
		noiSummaryCopy[0].tooltip.annual.figures = [];
		noiSummaryCopy[0].tooltip.annual.figures.push(
			'EGI: $'+ incomeSummaryCopy.egi.total.annual,
			'total operating expenses: $'+ expensesSummaryCopy.oe.total.annual);
		let newIncomeSummary = Object.assign({}, incomeSummary, incomeSummaryCopy);
		let newExpensesSummary = Object.assign({}, expensesSummary, expensesSummaryCopy);
		//let newNoiSummary = Object.assign({}, noiSummary, noiSummaryCopy);
		this.setState({
			incomeSummary: newIncomeSummary,
			expensesSummary: newExpensesSummary//,
			//noiSummary: newNoiSummary
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
						//must make value a string so the withCommas function may be called on this value
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
			tierOne,
			tierTwo,
			formFields,
			assumptions,
			incomeSummary,
			expensesSummary,
			noiSummary,
			incomeSummaryOrder,
			expensesSummaryOrder,
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
						fields = {formFields}
						assumptions = {assumptions}
						withCommas = {this.withCommas}
						tierOne = {tierOne}
						tierTwo = {tierTwo}
						incomeSummary = {incomeSummary}
						incomeSummaryOrder = {incomeSummaryOrder}
						expensesSummary = {expensesSummary}
						expensesSummaryOrder = {expensesSummaryOrder}
						noiSummary = {noiSummary}
					/>
				</div>
			</div>
		);
	}
}