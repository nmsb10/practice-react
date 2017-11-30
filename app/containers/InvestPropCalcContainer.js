import React from 'react';
import {IPCForm} from '../components/IpcForm';
import {IPCAnalysis} from '../components/IpcAnalysis';
import {IPCOtherTermsBox} from '../components/IpcOtherTermsBox';
import {InfoAlert} from '../components/InfoAlert';
import {IpcFormDD} from '../components/IpcFormDD';
import * as axios from 'axios';

export class InvestPropCalcContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentView: '',//while searching on search form, is 'search'. otherwise 'loading'. after loading, if results are found, is 'stats' to show stats
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
						title: 'down payment % (remember: LTV = 100% - down payment %)',
						preEntry:'',
						amount:'',
						postEntry:'%',
						valueType: ['percentage',2],
						notice:false
					},
					{
						field: 'down payment $',
						preEntry:'$',
						amount:'',
						postEntry:'',
						valueType: ['dollars'],
						notice:false
					},
					{//NB APR is higher
						field: 'interest rate (annual)',
						title: 'interest rate (annual) NB: APR is higher',
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
						valueType: ['integer']
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
			cashFlowSummary: {
				debtService:{
					total: {
						monthly:0,
						annual:0					
					},
					tooltip:{
						monthly:{
							location: 'left',
							cssClassAdd:'calc',
							sign:'multiply',
							figures:['mortgage Principal + Interest payment'],
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
				dscr:{
					total: {
						monthly:0,
						annual:0					
					},
					tooltip:{
						monthly:{
							location: 'left',
							cssClassAdd:'calc',
							sign:'divide',
							figures:[],
							total:'',
							textEnd: '%'
						},
						annual:{
							location: 'left',
							cssClassAdd:'calc',
							sign: 'divide',
							figures:[],
							total:'',
							textEnd: '%'
						}
					}
				},
				cashFlow:{
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
				}
			},
			cashFlowSummaryOrder: [
				{
					obj:'debtService',
					display: 'Debt Service'
				},{
					obj: 'dscr',
					display: 'Debt Service Coverage Ratio (DSCR) *1.25+*'
				},{
					obj: 'cashFlow',
					display: 'Cash Flow'
				}
			],
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
			],
			infoAlert:{
				cssClass:'ipc-vc-alert',
				text:[]
			}
		};
		this.calculate = this.calculate.bind(this);
		this.updateFormFields = this.updateFormFields.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.randomEntry = this.randomEntry.bind(this);
		this.updateAssumptions = this.updateAssumptions.bind(this);
		this.withCommas = this.withCommas.bind(this);
		this.updateSummaryContents = this.updateSummaryContents.bind(this);
		this.closeInfoAlert = this.closeInfoAlert.bind(this);
		this.mortgagePayment = this.mortgagePayment.bind(this);
	}
	componentDidMount(){
		this.setState({
			currentView: 'showForm'
		});
	}
	calculate(e){
		e.preventDefault();
		let{formFields, tierOne, tierTwo, infoAlert, noiSummary} = this.state;
		let submission = {
			fields: formFields,
			tierOne: tierOne,
			tierTwo: tierTwo
		};
		let cr = {
			noiAnnual: noiSummary[0].total.annual,
			purchasePrice: formFields.purchasePrice[0].value.amount
		};
		let capRate = (100 * cr.noiAnnual / cr.purchasePrice) || 0;
		let newInfoAlert = infoAlert;
		newInfoAlert.text = [];
		newInfoAlert.cssClass = 'ipc-vc-alert';
		this.setState({
			infoAlert: newInfoAlert
		});
		axios.post('/calculate-investment-property', submission).then(function(response){
			newInfoAlert.cssClass += ' ipc-vc-alert-displayed';
			newInfoAlert.text.push({
				content: 'The details you provided on your submission correspond to a capitalization rate of ' + capRate.toFixed(2) + '%.',
				css:''
			});
			if(response.data.length === 0){
				newInfoAlert.text.push({
					content: 'You provided figures for all recommended fields.',
					css:''
				});
				newInfoAlert.cssClass += ' ipc-vc-alert-hidden';
			}else{
				newInfoAlert.text.push({
					content: 'For the most complete analysis, we recommend you consider providing figures for:',
					css:''
				});
				response.data.map((contents, i) =>{
					newInfoAlert.text.push({
						content: i+1 + '. ' + contents,
						css:''
					});
				});
			}
			this.setState({
				infoAlert: newInfoAlert
			});
		}.bind(this));//must include .bind(this) so this.setState refers to this component
		// .then(() => {
		// 	this.redirectToSearch();
		// })
		// .catch((error) => {
		// 	console.log('search didn\'t work. darn.');
		// });
	}
	closeInfoAlert(){
		let {infoAlert} = this.state;
		let aiCopy = infoAlert;
		aiCopy.cssClass = 'ipc-vc-alert';
		this.setState({
			infoAlert: aiCopy
		});
	}
	redirectToSearch(){
		//'search' is the Route path from routes.js
		this.context.router.push('search');
	}
	updateAssumptions(e){
		let{assumptions, formFields, incomeSummary} = this.state;
		let newState = assumptions;
		let formFieldsCopy = formFields;
		let specObj = {};
		let selected = newState[e.target.dataset.section][e.target.dataset.key];
		let valueType = selected.valueType;
		//remove $, % and , from the inputted value
		let newValue = e.target.value.replace(/[$%,]/g, '');
		//if selected is property management fee OR reserves fund, updateformfields for corresponding object in form fields
		if(isNaN(newValue)){
			return;
		}else{
			if(valueType[0] === 'percentage' || valueType[0] === 'interest'){
				if(Math.pow(10, valueType[1]) * newValue % 1 > 0){
					newValue = parseFloat(newValue).toFixed(valueType[1]);
				}
				if(newValue > 100){
					newValue = 100;
				}else if(newValue < 0){
					newValue = 0;
				}
			}else if(valueType[0] === 'dollars' || valueType[0] === 'integer'){
				if(newValue === ''){
					newValue = '';
				}else if(newValue < 0){
					newValue = 0;
				}else{
					newValue = parseInt(newValue);
				}
			}
			let purchasePrice = formFields.purchasePrice[0].value.amount;
			let egi = incomeSummary.egi.total.annual;
			let propertyManagementIndex;
			let reservesIndex;
			for(let i = 0; i<formFields.expenses.other.length; i++){
				if(formFields.expenses.other[i].name === 'property management'){
					propertyManagementIndex = i;
				}else if(formFields.expenses.other[i].name === 'reserves fund'){
					reservesIndex = i;
				}
			}
			//now check for selected field
			if(selected.field === 'down payment %'){
				if(purchasePrice === ''){
					newState.financing[0].notice = 'enter a purchase price';
					newState.financing[1].notice = 'enter a purchase price';
					newValue = '';
				}else{
					newState.financing[1].amount = parseInt(0.01 * newValue * purchasePrice);
				}
			}else if(selected.field === 'down payment $'){
				if(purchasePrice === ''){
					newState.financing[0].notice = 'enter a purchase price';
					newState.financing[1].notice = 'enter a purchase price';
					newValue = '';
				}else if(newValue > purchasePrice){
					newValue = purchasePrice;
					newState.financing[0].amount = (100 * newValue / purchasePrice).toFixed(2);
				}else{
					newState.financing[0].amount = (100 * newValue / purchasePrice).toFixed(2);
				}
			// }else if(selected.field === 'property management fee'){
			// 	specObj = formFieldsCopy.expenses.other[propertyManagementIndex];
			// 	console.log(specObj);
			// 	console.log(0.01 * newValue * egi);
			// 	specObj = this.validateInput(specObj, 0.01 * newValue * egi, 'annual');
			// }else if(selected.field === 'reserves fund'){
			// 	specObj = formFieldsCopy.expenses.other[reservesIndex];
			// 	console.log(specObj);
			// 	console.log(0.01 * newValue * egi);
			// 	specObj = this.validateInput(specObj, 0.01 * newValue * egi, 'annual');
			}
			selected.amount = newValue;
			let newAssumptions = Object.assign({}, assumptions, newState);
			let newFormFields = Object.assign({}, formFields, formFieldsCopy);
			this.setState({
				assumptions: newAssumptions,
				formFields: newFormFields
			});
			this.updateSummaryContents();
		}
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
			expensesSummaryOrder,
			cashFlowSummary,
			cashFlowSummaryOrder
		} = this.state;
		//first must reset values
		let incomeSummaryCopy = incomeSummary;
		let expensesSummaryCopy = expensesSummary;
		let noiSummaryCopy = noiSummary;
		let cfSummaryCopy = cashFlowSummary;
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
		//cash flow calculations=====================================
		//purchase formFields.purchasePrice[0].value.amount
		let loanAmount = formFields.purchasePrice[0].value.amount - assumptions.financing[1].amount;
		let debtServiceMonthlyOrig = this.mortgagePayment(loanAmount, assumptions.financing[3].amount * 12, assumptions.financing[2].amount / 100 / 12) || 0;
		let debtServiceAnnual = debtServiceMonthlyOrig * 12;
		let debtServiceMonthly = this.withCommas(debtServiceMonthlyOrig.toFixed(2));
		cfSummaryCopy.debtService.total.monthly = debtServiceMonthly;
		cfSummaryCopy.debtService.total.annual = this.withCommas(debtServiceAnnual.toFixed(2));
		cfSummaryCopy.debtService.tooltip.monthly.total = debtServiceMonthly;
		cfSummaryCopy.debtService.tooltip.annual.total = this.withCommas(debtServiceAnnual.toFixed(2));
		//annual debt service tooltip contents:
		cfSummaryCopy.debtService.tooltip.annual.figures = [];
		cfSummaryCopy.debtService.tooltip.annual.figures.push(
			'monthly P + I payment: $'+ debtServiceMonthly,
			'12 months');
		//dscr contents
		cfSummaryCopy.dscr.tooltip.monthly.total = (noiSummary[0].total.monthly / debtServiceMonthlyOrig) || 0;
		cfSummaryCopy.dscr.tooltip.annual.total = (noiSummary[0].total.annual / debtServiceAnnual) || 0;
		cfSummaryCopy.dscr.total.monthly = cfSummaryCopy.dscr.tooltip.monthly.total.toFixed(3);
		cfSummaryCopy.dscr.total.annual = cfSummaryCopy.dscr.tooltip.annual.total.toFixed(3);
		cfSummaryCopy.dscr.tooltip.monthly.figures = [];
		cfSummaryCopy.dscr.tooltip.monthly.figures.push(
			'monthly NOI: $'+ this.withCommas(noiSummary[0].total.monthly),
			'monthly debt service: $'+debtServiceMonthly);
		cfSummaryCopy.dscr.tooltip.annual.figures = [];
		cfSummaryCopy.dscr.tooltip.annual.figures.push(
			'annual NOI: $'+ this.withCommas(noiSummary[0].total.annual),
			'annual debt service: $'+ this.withCommas(debtServiceAnnual.toFixed(2)));
		//cash flow contents
		let cashFlowMonthly = noiSummary[0].total.monthly - (debtServiceMonthlyOrig || 0);
		let cashFlowAnnual = noiSummary[0].total.annual - (debtServiceAnnual || 0);
		cfSummaryCopy.cashFlow.total.monthly = this.withCommas(cashFlowMonthly.toFixed(2));
		cfSummaryCopy.cashFlow.total.annual = this.withCommas(cashFlowAnnual.toFixed(2));
		cfSummaryCopy.cashFlow.tooltip.monthly.total = cfSummaryCopy.cashFlow.total.monthly;
		cfSummaryCopy.cashFlow.tooltip.annual.total = cfSummaryCopy.cashFlow.total.annual;
		cfSummaryCopy.cashFlow.tooltip.monthly.figures = [];
		cfSummaryCopy.cashFlow.tooltip.monthly.figures.push(
			'monthly NOI: $'+ this.withCommas(noiSummary[0].total.monthly),
			'monthly debt service: $'+debtServiceMonthly);
		cfSummaryCopy.cashFlow.tooltip.annual.figures = [];
		cfSummaryCopy.cashFlow.tooltip.annual.figures.push(
			'annual NOI: $'+ this.withCommas(noiSummary[0].total.annual),
			'annual debt service: $'+ this.withCommas(debtServiceAnnual.toFixed(2)));
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
				//do not set validEntry to false here; validEntry is false by default, only made true if valid entry is entered, and validations never allows an invalid value to be assigned
				//obj.validation.validEntry = false;
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
		if(request === 'closeForm'){
			this.setState({
				currentView: 'showResults'
			});
			return;
		}
		if(request=== 'showForm'){
			this.setState({
				currentView: 'showForm'
			});
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
			this.updateSummaryContents();
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
	mortgagePayment(p, n, i){
		//https://www.mtgprofessor.com/formulas.htm
		//P = L[c(1 + c)^n]/[(1 + c)^n - 1]
		//P = monthly payment
		//L = loan amount
		//n = months of the loan
		//c = monthly interest rate of c. [If the quoted rate is 6%, for example, c is .06/12 or .005]. 

		// https://stackoverflow.com/questions/17101442/how-to-calculate-mortgage-in-javascript
		// 		var M; //monthly mortgage payment
		// var P = 400000; //principle / initial amount borrowed
		// var I = 3.5 / 100 / 12; //monthly interest rate
		// var N = 30 * 12; //number of payments months

		// //monthly mortgage payment
		// M = monthlyPayment(P, N, I);

		// console.log(M);

		// function monthlyPayment(p, n, i) {
		return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
		// }
	}
	render(){
		let {
			currentView,
			tierOne,
			tierTwo,
			formFields,
			assumptions,
			incomeSummary,
			expensesSummary,
			noiSummary,
			incomeSummaryOrder,
			expensesSummaryOrder,
			cashFlowSummary,
			cashFlowSummaryOrder,
			infoAlert
		} = this.state;
		return(
			<div className = 'ipc-component'>
				<IPCOtherTermsBox
					assumptions = {assumptions}
					handleChange = {this.updateAssumptions}
				/>
				<div className = 'fit-95 form-and-analysis'>
					<IpcFormDD
						view = {currentView}
						handleSubmit = {this.calculate}
						handleInputChange = {this.updateFormFields}
						fields = {formFields}
						assumptions = {assumptions}
						handleClick = {this.handleClick}
					/>
					<IPCForm
						handleSubmit = {this.calculate}
						handleInputChange = {this.updateFormFields}
						fields = {formFields}
						assumptions = {assumptions}
						handleClick = {this.handleClick}
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
						cashFlowSummary = {cashFlowSummary}
						cashFlowSummaryOrder = {cashFlowSummaryOrder}
					/>
				</div>
				<InfoAlert
					content = {infoAlert}
					onClick = {this.closeInfoAlert}
				/>
			</div>
		);
	}
}