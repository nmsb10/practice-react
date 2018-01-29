import React from 'react';
import {IPCForm} from '../components/IpcForm';
import {IPCAnalysis} from '../components/IpcAnalysis';
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
			ipcFormDD:{
				tierOne: ['fields', 'assumptions'],
				tierTwo: [[{
						objectName: 'price',
						displayName: 'purchase price',
						sectionOpen: true
					},{
						objectName: 'income',
						displayName: 'income',
						sectionOpen: true
					},{
						objectName: 'expenses',
						displayName: 'expenses',
						sectionOpen: true
					}],[
					{
						objectName: 'financing',
						displayName: 'financing',
						fontAwesomeIcon: 'fa fa-university',
						sectionOpen: true
					},{
						objectName: 'other',
						displayName: 'other',
						fontAwesomeIcon: 'fa fa-check-square-o',
						sectionOpen: true
					}]],
				tierThree:
				[
					[
						[{name: 'purchasePrice', allowAdd: false}],
						[{name: 'rental', displayName: 'rental: residential', allowAdd: true, title: 'add a source of (residential) rental income'}, {name: 'retail', displayName: 'rental: retail', allowAdd: true, title: 'add a source of retail rental income'}, {name: 'other', allowAdd: true, title: 'add a source of other income'}],
						[{name: 'carryingCosts', displayName: 'carrying costs', allowAdd: true, title: 'add a different carrying cost'}, {name: 'utilities', allowAdd: true, title: 'add another utilities expense'}, {name: 'other', allowAdd: true, title:'add a miscellaneous expense'}]
					],[
						[{name: 'terms', allowAdd: false}],
						[{name: 'terms', allowAdd: false}]
					]
				]
			},
			formFields:{
				price:{
					purchasePrice:[{
						name:'purchase price',
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
							location: 'bottom',
							visible: false
						},
						required:true
					}]
				},
				income:{
					retail:[{
						name:'business one',
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
							location: 'bottom',
							visible: false
						},
						required:false
					},{
						name:'business two',
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
							location: 'bottom',
							visible: false
						},
						required:false
					}],
					other:[{//also add other: miscellaneous: state source and amount
						name:'laundry room',
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
							location: 'bottom',
							visible: false
						},
						required:false
					},{
						name:'vending machines',
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
							location: 'bottom',
							visible: false
						},
						required:false
					}],
					rental:[{//state unit or lessee name, and amount
						name:'unit one',//rental income, unit one
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
							location: 'bottom',
							visible: false
						},
						required:true
					}]
				},
				expenses:{
					carryingCosts:[{
						name:'real estate property taxes',
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
							location: 'bottom',
							visible: false
						},
						required:true
					},{
						name:'property insurance premium',
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
							location: 'bottom',
							visible: false
						},
						required:true
					},{
						name:'assessments',
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
							location: 'bottom',
							visible: false
						},
						required:false
					}],
					utilities:[{
						name:'gas (common hot water)',
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
							location: 'bottom',
							visible: false
						},
						required:false
					},{
						name:'gas (heat)',
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
							location: 'bottom',
							visible: false
						},
						required:false
					},{
						name:'electricity (common areas)',
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
							location: 'bottom',
							visible: false
						},
						required:false
					},{
						name:'water',
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
							location: 'bottom',
							visible: false
						},
						required:true
					},{
						name:'scavenger',
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
							location: 'bottom',
							visible: false
						},
						required:false
					}],
					other:[{
						name:'property management',
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
							textEnd: 'expenses (will update automatically if property management % is entered below)',
							location: 'bottom',
							visible: false
						},
						required:true
					},{
						name:'reserves fund',
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
							textStart:'please enter the',
							textEnd: 'dollar amount here (will update automatically if reserves % is entered below)',
							location: 'bottom',
							visible: false
						},
						required:true
					},{
						name:'repairs | decor',
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
							location: 'bottom',
							visible: false
						},
						required:false
					}]
				}
			},
			assumptions:{
				financing:{
					terms:[
					{
						field: 'down payment %',
						title: 'down payment % (remember: LTV = 100% - down payment %)',
						valueType: ['percentage',2],
						value:{
							preEntry:'',
							amount:'',
							postEntry:'%',
							placeholder:'',
							notice:null
						},
						tooltip:{
							textStart:'enter the',
							textEnd: '(percentage) amount here (remember: LTV = 100% - down payment %)',
							location: 'bottom',
							visible: false
						}
					},
					{
						field: 'down payment $',
						valueType: ['dollars'],
						value:{
							preEntry:'$',
							amount:'',
							postEntry:'',
							placeholder:'',
							notice:null
						},
						tooltip:{
							textStart:'enter the',
							textEnd: '(dollar) amount here',
							location: 'bottom',
							visible: false
						}
					},
					{//NB APR is higher
						field: 'interest rate (annual)',
						title: 'interest rate (annual) NB: APR is higher',
						valueType: ['interest',3],
						value:{
							preEntry:'',
							amount:'',
							postEntry:'%',
							placeholder:''
						},
						tooltip:{
							textStart:'enter the',
							textEnd: 'here (NB: APR is higher)',
							location: 'bottom',
							visible: false
						}
					},
					{
						field: 'term of mortgage',
						valueType: ['integer'],
						value:{
							preEntry:'',
							amount:'',
							postEntry:'years',
							placeholder:''
						},
						tooltip:{
							textStart:'enter the',
							textEnd: 'in years here',
							location: 'bottom',
							visible: false
						}
					}
					]
				},
				other:{
					terms:[
					{
						field: 'vacancy factor',
						valueType: ['percentage',2],
						value:{
							preEntry:'',
							amount:'',
							postEntry:'%',
							placeholder:''
						},
						tooltip:{
							textStart:'enter the',
							textEnd: 'here (e.g. 8.33% ~ 1 month)',
							location: 'bottom',
							visible: false
						}
					},
					{
						field: 'collections',
						valueType: ['percentage',2],
						value:{
							preEntry:'',
							amount:'',
							postEntry:'%',
							placeholder:''
						},
						tooltip:{
							textStart:'enter the',
							textEnd: 'percentage here (e.g. 2.00%). This represents the rent you will be unable to collect.',
							location: 'bottom',
							visible: false
						}
					},
					{
						field: 'property management fee',
						valueType: ['percentage',2],
						value:{
							preEntry:'',
							amount:'',
							postEntry:'%',
							placeholder:'',
							notice: null
						},
						tooltip:{
							textStart:'enter the',
							textEnd: 'percentage here (e.g. 6.00% and/or brokerage compensation). This % is taken of the annual EGI.',
							location: 'bottom',
							visible: false
						}
					},
					{
						field: 'reserves fund',
						valueType: ['percentage',2],
						value:{
							preEntry:'',
							amount:'',
							postEntry:'%',
							placeholder:'',
							notice: null
						},
						tooltip:{
							textStart:'enter the',
							textEnd: 'percentage here (e.g. 5.00%). This % is taken of the annual EGI.',
							location: 'bottom',
							visible: false
						}
					}
					// 	vaa:3.00,//(property) value appreciation annually
					// 	retia:5.00,//real estate tax increase annually
					// 	aia:3.00,//assessments increase annual
					// 	ria:2.00,//rent increase annual
					]
				}
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
			verificationBox:{
				cssClass:'',
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
		this.mortgagePayment = this.mortgagePayment.bind(this);
		this.updateIncomeSummary = this.updateIncomeSummary.bind(this);
		this.updateExpensesSummary = this.updateExpensesSummary.bind(this);
		this.addFormSection = this.addFormSection.bind(this);
		this.minimizeSection = this.minimizeSection.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.updateSpecificExpenses = this.updateSpecificExpenses.bind(this);
	}
	componentDidMount(){
		this.setState({
			currentView: 'showForm'
		});
	}
	calculate(e){
		e.preventDefault();
		let{formFields, tierOne, tierTwo, noiSummary, verificationBox} = this.state;
		let submission = {
			fields: formFields,
			tierOne: tierOne,
			tierTwo: tierTwo
		};
		let cr = {
			noiAnnual: noiSummary[0].total.annual,
			purchasePrice: formFields.price.purchasePrice[0].value.amount
		};
		let capRate = (100 * cr.noiAnnual / cr.purchasePrice) || 0;
		let newVB = verificationBox;
		axios.post('/calculate-investment-property', submission).then(function(response){
			newVB.cssClass = 'display';
			newVB.text = [];
			newVB.text.push({
				content: 'The details you provided on your submission correspond to a capitalization rate of ' + capRate.toFixed(2) + '%.',
				css:''
			});
			if(response.data.length === 0){
				newVB.text.push({
					content: 'You provided figures for all recommended fields.',
					css:''
				});
				newVB.cssClass += ' ipc-vc-alert-hidden';
			}else{
				newVB.text.push({
					content: 'For the most complete analysis, we recommend you consider providing figures for:',
					css:''
				});
				response.data.map((contents, i) =>{
					newVB.text.push({
						area: contents.area,
						content: i+1 + '. ' + contents.text,
						css:''
					});
				});
			}
			this.setState({
				verificationBox: newVB
			});
		}.bind(this));//must include .bind(this) so this.setState refers to this component
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
		let{assumptions, formFields, incomeSummary} = this.state;
		let newState = assumptions;
		let section = e.target.dataset.section.split('.');
		let selected = newState[section[0]][section[1]][e.target.dataset.key];
		let valueType = selected.valueType;
		//remove $, % and , from the inputted value
		let newValue = e.target.value.replace(/[$%,-]/g, '');
		if(isNaN(newValue)){
			return;
		}else{
			if(valueType[0] === 'percentage' || valueType[0] === 'interest'){
				//make sure decimal places does not exceed valueType[1]
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
			let purchasePrice = formFields.price.purchasePrice[0].value.amount;
			let egi = incomeSummary.egi.total.annual;
			// let propertyManagementIndex, reservesIndex;
			// for(let i = 0; i<formFields.expenses.other.length; i++){
			// 	if(formFields.expenses.other[i].name === 'property management'){
			// 		propertyManagementIndex = i;
			// 	}else if(formFields.expenses.other[i].name === 'reserves fund'){
			// 		reservesIndex = i;
			// 	}
			// }
			//now check for selected field
			switch(selected.field){
				case 'down payment %':
					if(purchasePrice === ''){
						newState.financing.terms[0].value.notice = 'enter a purchase price';
						newState.financing.terms[1].value.notice = 'enter a purchase price';
						newValue = '';
					}else{
						newState.financing.terms[1].value.amount = parseInt(0.01 * newValue * purchasePrice);
					}
					break;
				case 'down payment $':
					if(purchasePrice === ''){
						newState.financing.terms[0].value.notice = 'enter a purchase price';
						newState.financing.terms[1].value.notice = 'enter a purchase price';
						newValue = '';
					}else if(newValue > purchasePrice){
						newValue = purchasePrice;
						newState.financing.terms[0].value.amount = (100 * newValue / purchasePrice).toFixed(2);
					}else{
						newState.financing.terms[0].value.amount = (100 * newValue / purchasePrice).toFixed(2);
					}
					break;
				case 'property management fee':
					if(egi === '0.00' || egi === 0){
						newState.other.terms[2].value.notice = 'first enter income above';
						newValue = '';
					}else{
						this.updateSpecificExpenses('expenses.other.fields', '0', newValue);
					}
					break;
				case 'reserves fund':
					if(egi === '0.00' || egi === 0){
						newState.other.terms[3].value.notice = 'first enter income above';
						newValue = '';
					}else{
						this.updateSpecificExpenses('expenses.other.fields', '1', newValue);
					}
					break;
				default:
					//console.log('unknown assumptions update field from switch statement: ', selected.field);
					break;
			}
			selected.value.amount = newValue;
			let newAssumptions = Object.assign({}, assumptions, newState);
			this.setState({
				assumptions: newAssumptions
			});
			if(selected.field !== 'property management fee' || selected.field !== 'reserves fund'){
				this.updateSummaryContents();
			}
		}
	}
	updateFormFields(e){
		let {formFields, assumptions} = this.state;
		let formFieldsCopy = formFields;
		let section = e.target.dataset.section;
		let key = e.target.dataset.key;
		let sectionArr = section.split('.');
		let specificObject = {};
		switch(sectionArr[2]){
			case undefined:
				break;
			case 'fields':
				//https://stackoverflow.com/questions/4260308/getting-the-objects-property-name	
				//first identify the exact object being changed
				specificObject = formFieldsCopy[sectionArr[0]][sectionArr[1]][key];
				//check if changeFieldName is e.target.dataset.propertyName
				if(e.target.dataset.request === 'changeFieldName'){
					specificObject.name = e.target.value;
				}else if(e.target.dataset.request === 'changeFieldValue'){
					//validate value
					specificObject = this.validateInput(specificObject, e.target.value, e.target.dataset.valPeriod);
				}
				let newFormFields = Object.assign({}, formFields, formFieldsCopy);
				this.setState({
					formFields: newFormFields
				});
				if(e.target.dataset.request !== 'changeFieldName'){
					this.updateSummaryContents();
					//now check if property management fee and / or reserves fund values must be updated
					if(sectionArr[0] === 'income' && assumptions.other.terms[2].value.amount !== ''){//property management fee % has a value
						this.updateSpecificExpenses('expenses.other.fields', '0', assumptions.other.terms[2].value.amount);
					}
					if(sectionArr[0] === 'income' && assumptions.other.terms[3].value.amount !== ''){//reserves fund % has a value
						this.updateSpecificExpenses('expenses.other.fields', '1', assumptions.other.terms[3].value.amount);
					}
				}
				break;
			case 'assumptions':
				this.updateAssumptions(e);
				break;
			default:
				console.log('unknown update form fields request from switch statement: ', request);
				break;
		}
	}
	updateSpecificExpenses(section, key, value){
		let {incomeSummary} = this.state;
		let egi = incomeSummary.egi.total.annual;
		let artificialInput = {
			target:{
				dataset:{
					section: section,
					key: key,
					request: 'changeFieldValue',
					valPeriod: 'annual'
				},
				value: (0.01 * value * egi).toFixed(2)
			}
		};
		this.updateFormFields(artificialInput);
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
				//now map through the formFields values and sum them up appropriately
				formFields[tierOneName][tierTwoName.obj].map( (contents, k) => {
					let monthlyValue = contents.value.monthly === '' ? 0 : parseFloat(contents.value.monthly);
					let annualValue = contents.value.annual === '' ? 0 : parseFloat(contents.value.annual);
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
		incomeSummaryCopy = this.updateIncomeSummary(incomeSummaryCopy, retailTotalMonthly, otherTotalMonthly, resTotalMonthly, retailTotalAnnual, otherTotalAnnual, resTotalAnnual);

		//for expenses summary data======================================
		let carryingCostsTotalMonthly = expensesSummaryCopy.oe.totals.carryingCosts.monthly;
		let utilitiesTotalMonthly = expensesSummaryCopy.oe.totals.utilities.monthly;
		let otherExpensesTotalMonthly = expensesSummaryCopy.oe.totals.other.monthly;
		expensesSummaryCopy.oe.total.monthly = (carryingCostsTotalMonthly + utilitiesTotalMonthly + otherExpensesTotalMonthly).toFixed(2);
		let carryingCostsTotalAnnual = expensesSummaryCopy.oe.totals.carryingCosts.annual;
		let utilitiesTotalAnnual = expensesSummaryCopy.oe.totals.utilities.annual;
		let otherExpensesTotalAnnual = expensesSummaryCopy.oe.totals.other.annual;
		expensesSummaryCopy.oe.total.annual = (carryingCostsTotalAnnual + utilitiesTotalAnnual + otherExpensesTotalAnnual).toFixed(2);
		expensesSummaryCopy.oe.tooltip.monthly.total = this.withCommas(expensesSummaryCopy.oe.total.monthly);
		expensesSummaryCopy.oe.tooltip.annual.total = this.withCommas(expensesSummaryCopy.oe.total.annual);
		expensesSummaryCopy = this.updateExpensesSummary(expensesSummaryCopy, carryingCostsTotalMonthly, utilitiesTotalMonthly, otherExpensesTotalMonthly, carryingCostsTotalAnnual, utilitiesTotalAnnual, otherExpensesTotalAnnual);
		
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
		let loanAmount = formFields.price.purchasePrice[0].value.amount - assumptions.financing.terms[1].value.amount;
		let debtServiceMonthlyOrig = this.mortgagePayment(loanAmount, assumptions.financing.terms[3].value.amount * 12, assumptions.financing.terms[2].value.amount / 100 / 12) || 0;
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
	updateIncomeSummary(income, monthlyRetail, monthlyOther, monthlyRes, annRet, annOth, annRes){
		let { assumptions } = this.state;
		//gpi tooltip calculations
		income.gpi.tooltip.monthly.total = this.withCommas(income.gpi.total.monthly);
		income.gpi.tooltip.annual.total = this.withCommas(income.gpi.total.annual);
		//gpi tooltip contents:
		income.gpi.tooltip.monthly.figures = [];
		income.gpi.tooltip.monthly.figures.push(
			'total rental income (res.): $'+ this.withCommas(monthlyRes.toFixed(2)),
			'total retail income: $'+ this.withCommas(monthlyRetail.toFixed(2)),
			'total other income: $'+ this.withCommas(monthlyOther.toFixed(2)));
		income.gpi.tooltip.annual.figures = [];
		income.gpi.tooltip.annual.figures.push(
			'total rental income (res.): $'+ this.withCommas(annRes.toFixed(2)),
			'total retail income: $'+ this.withCommas(annRet.toFixed(2)),
			'total other income: $'+ this.withCommas(annOth.toFixed(2)));
		//vacancy totals and tooltip totals
		income.vacancy.total.monthly = ((assumptions.other.terms[0].value.amount || 0) * 0.01 * income.gpi.total.monthly).toFixed(2);
		income.vacancy.total.annual = ((assumptions.other.terms[0].value.amount || 0) * 0.01 * income.gpi.total.annual).toFixed(2);
		income.vacancy.tooltip.monthly.total = this.withCommas(income.vacancy.total.monthly);
		income.vacancy.tooltip.annual.total = this.withCommas(income.vacancy.total.annual);
		//vacancy tooltip
		income.vacancy.tooltip.monthly.figures = [];
		income.vacancy.tooltip.monthly.figures.push(
			'GPI: $'+ income.gpi.tooltip.monthly.total,
			'Vacancy Factor: '+ (assumptions.other.terms[0].value.amount ? assumptions.other.terms[0].value.amount : '0') + '%');
		income.vacancy.tooltip.annual.figures = [];
		income.vacancy.tooltip.annual.figures.push(
			'GPI: $'+ income.gpi.tooltip.annual.total,
			'Vacancy Factor: '+ (assumptions.other.terms[0].value.amount ? assumptions.other.terms[0].value.amount : '0') + '%');
		//collections totals and tooltip totals
		income.collections.total.monthly = ((assumptions.other.terms[1].value.amount || 0) * 0.01 * income.gpi.total.monthly).toFixed(2);
		income.collections.total.annual = ((assumptions.other.terms[1].value.amount || 0) * 0.01 * income.gpi.total.annual).toFixed(2);
		income.collections.tooltip.monthly.total = this.withCommas(income.collections.total.monthly);
		income.collections.tooltip.annual.total = this.withCommas(income.collections.total.annual);
		//collections tooltip
		income.collections.tooltip.monthly.figures = [];
		income.collections.tooltip.monthly.figures.push(
			'GPI: $'+ income.gpi.tooltip.monthly.total,
			'Collections Factor: '+ (assumptions.other.terms[1].value.amount ? assumptions.other.terms[1].value.amount : '0') + '%');
		income.collections.tooltip.annual.figures = [];
		income.collections.tooltip.annual.figures.push(
			'GPI: $'+ income.gpi.tooltip.annual.total,
			'Collections Factor: '+ (assumptions.other.terms[1].value.amount ? assumptions.other.terms[1].value.amount : '0') + '%');
		//egi totals and tooltip totals
		income.egi.total.monthly = (income.gpi.total.monthly - income.vacancy.total.monthly - income.collections.total.monthly).toFixed(2);
		income.egi.total.annual = (income.gpi.total.annual - income.vacancy.total.annual - income.collections.total.annual).toFixed(2);
		income.egi.tooltip.monthly.total = this.withCommas(income.egi.total.monthly);
		income.egi.tooltip.annual.total = this.withCommas(income.egi.total.annual);
		//egi tooltip
		income.egi.tooltip.monthly.figures = [];
		income.egi.tooltip.monthly.figures.push(
			'GPI: $'+ income.gpi.tooltip.monthly.total,
			'Vacancy total: $'+ this.withCommas(income.vacancy.total.monthly),
			'Collections total: $'+ this.withCommas(income.collections.total.monthly));
		income.egi.tooltip.annual.figures = [];
		income.egi.tooltip.annual.figures.push(
			'GPI: $'+ income.gpi.tooltip.annual.total,
			'Vacancy total: $'+ this.withCommas(income.vacancy.total.annual),
			'Collections total: $'+ this.withCommas(income.collections.total.annual));
		return income;
	}
	updateExpensesSummary(expenses, carryMo, utilMo, otherMo, carryAnn, utilAnn, otherAnn){
		//oe tooltip calculations
		expenses.oe.tooltip.monthly.figures = [];
		expenses.oe.tooltip.monthly.figures.push(
			'total carrying costs: $'+ this.withCommas(carryMo.toFixed(2)),
			'total utilities costs: $'+ this.withCommas(utilMo.toFixed(2)),
			'total other costs: $'+ this.withCommas(otherMo.toFixed(2)));
		expenses.oe.tooltip.annual.figures = [];
		expenses.oe.tooltip.annual.figures.push(
			'total carrying costs: $'+ this.withCommas(carryAnn.toFixed(2)),
			'total utilities costs: $'+ this.withCommas(utilAnn.toFixed(2)),
			'total other costs: $'+ this.withCommas(otherAnn.toFixed(2)));
		return expenses;
	}
	validateInput(obj, newValue, period){
		let {validationMessages} = this.state;
		//first check if e.target.value==='' then set all values to ''
		if(newValue === ''){
			obj.validation.validEntry = false;
			obj.validation.showVmes = false;
			if(obj.value.amount || obj.value.amount === ''){
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
				if(obj.value.amount || obj.value.amount === ''){
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
		let {formFields, assumptions, verificationBox} = this.state;
		let fieldsCopy = formFields, assumpCopy = assumptions, request = e.target.dataset.itemClicked, key = e.target.dataset.key, sectionArr;
		switch(request){
			case undefined:
				break;
			case 'closeForm':
				this.setState({
					currentView: 'showResults'
				});
				break;
			case 'showForm':
				this.setState({
					currentView: 'showForm'
				});
				break;
			case 'addToSection':
				this.addFormSection(e.target.dataset.section.split('.'));
				break;
			case 'minimizeSection':
				this.minimizeSection(e.target.dataset.key1, e.target.dataset.key2);
				break;
			case 'removeSection':
				sectionArr = e.target.dataset.section.split('.');
				fieldsCopy[sectionArr[0]][sectionArr[1]].splice(key, 1);
				this.updateSummaryContents();
				break;
			case 'closeAlertTT':
				sectionArr = e.target.dataset.section.split('.');
				fieldsCopy[sectionArr[0]][sectionArr[1]][key].validation.showVmes = false;
				break;
			case 'displayTooltip':
				sectionArr = e.target.dataset.section.split('.');
				if(sectionArr[2] === 'fields'){
					fieldsCopy[sectionArr[0]][sectionArr[1]][key].tooltip.visible = !fieldsCopy[sectionArr[0]][sectionArr[1]][key].tooltip.visible;
				}else if(sectionArr[2] === 'assumptions'){
					assumpCopy[sectionArr[0]][sectionArr[1]][key].tooltip.visible = !assumpCopy[sectionArr[0]][sectionArr[1]][key].tooltip.visible;
				}
				break;
			case 'closeVerificationBox':
				let vbNewCss = verificationBox;
				vbNewCss.cssClass = 'hide';
				let vbCopy = Object.assign({}, verificationBox, vbNewCss);
				this.setState({
					verificationBox: vbCopy
				})
				break;
			default:
				console.log('unknown click request from switch statement: ', request);
				break;
		}
		let objCopy = Object.assign({}, formFields, fieldsCopy);
		let objCopyAssumptions = Object.assign({}, assumptions, assumpCopy);
		this.setState({
			formFields: objCopy,
			assumptions: objCopyAssumptions
		});
	}
	addFormSection(sectionArr){
		let {formFields} = this.state;
		let fieldsCopy = formFields;
		let objectFirst = fieldsCopy[sectionArr[0]];
		let basicFormFieldsEntry = {
			name:'new field',
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
				location: 'bottom',
				visible: false
			},
			required:false
		};
		if(sectionArr[0]==='income'){//income section
			basicFormFieldsEntry.tooltip.textStart = 'please enter';
			basicFormFieldsEntry.tooltip.textEnd = 'income for the subject property (estimated or actual)';
			if(sectionArr[1] === 'rental'){
				basicFormFieldsEntry.name = 'unit ' + (objectFirst[sectionArr[1]].length + 1);
			}else if(sectionArr[1] === 'retail'){
				basicFormFieldsEntry.name = 'business ' + (objectFirst[sectionArr[1]].length + 1);
			}else if(sectionArr[1] === 'other'){
				basicFormFieldsEntry.name = 'other income ' + (objectFirst[sectionArr[1]].length + 1);
			}
		}else if(sectionArr[0]==='expenses'){//expense section
			basicFormFieldsEntry.tooltip.textStart = 'please enter';
			basicFormFieldsEntry.tooltip.textEnd = 'expenses';
			if(sectionArr[1] === 'carryingCosts'){
				basicFormFieldsEntry.name = 'carrying cost ' + (objectFirst[sectionArr[1]].length + 1);
			}else if(sectionArr[1] === 'utilities'){
				basicFormFieldsEntry.name = 'utility ' + (objectFirst[sectionArr[1]].length + 1);
			}else if(sectionArr[1] === 'other'){
				basicFormFieldsEntry.name = 'misc expense ' + (objectFirst[sectionArr[1]].length + 1);
			}
		}
		objectFirst[sectionArr[1]].push(basicFormFieldsEntry);
		let objCopy = Object.assign({}, formFields, fieldsCopy);
		this.setState({
			formFields: objCopy
		});
	}
	minimizeSection(one, two){
		let{ipcFormDD} = this.state;
		let objectCopy = ipcFormDD;
		let changedSection = objectCopy.tierTwo[one][two];
		changedSection.sectionOpen = !changedSection.sectionOpen;
		let objCopy = Object.assign({}, ipcFormDD, objectCopy);
		this.setState({
			ipcFormDD: objCopy
		});
	}
	handleMouseEnter(e){
		let {formFields, assumptions} = this.state;
		let fieldsCopy = formFields, assumptionsCopy = assumptions, request = e.target.dataset.itemClicked, key = e.target.dataset.key, sectionArr;
		switch(request){
			case undefined:
				break;
			case 'displayTooltip':
				sectionArr = e.target.dataset.section.split('.');
				if(sectionArr[2] === 'fields'){
					fieldsCopy[sectionArr[0]][sectionArr[1]][key].tooltip.visible = true;
				}else if(sectionArr[2] === 'assumptions'){
					assumptionsCopy[sectionArr[0]][sectionArr[1]][key].tooltip.visible = true;
				}
				break;
			default:
				console.log('unknown onMouseLeave request from switch statement: ', request);
				break;
		}
		let objCopy = Object.assign({}, formFields, fieldsCopy);
		let objCopyAssumptions = Object.assign({}, assumptions, assumptionsCopy);
		this.setState({
			formFields: objCopy,
			assumptions: objCopyAssumptions
		});
	}
	handleMouseLeave(e){
		let {formFields, assumptions} = this.state;
		let fieldsCopy = formFields, assumptionsCopy = assumptions, request = e.target.dataset.itemClicked, key = e.target.dataset.key, sectionArr;
		switch(request){
			case undefined:
				break;
			case 'displayTooltip':
				sectionArr = e.target.dataset.section.split('.');
				if(sectionArr[2] === 'fields'){
					fieldsCopy[sectionArr[0]][sectionArr[1]][key].tooltip.visible = false;
				}else if(sectionArr[2] === 'assumptions'){
					assumptionsCopy[sectionArr[0]][sectionArr[1]][key].tooltip.visible = false;
				}
				break;
			default:
				console.log('unknown onMouseLeave request from switch statement: ', request);
				break;
		}
		let objCopy = Object.assign({}, formFields, fieldsCopy);
		let objCopyAssumptions = Object.assign({}, assumptions, assumptionsCopy);
		this.setState({
			formFields: objCopy,
			assumptions: objCopyAssumptions
		});
	}
	withCommas(str){
		//remember: the replace method works on strings, not numbers!
		//http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
		return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
			ipcFormDD,
			formFields,
			assumptions,
			incomeSummary,
			expensesSummary,
			noiSummary,
			incomeSummaryOrder,
			expensesSummaryOrder,
			cashFlowSummary,
			cashFlowSummaryOrder,
			verificationBox
		} = this.state;
		return(
			<div className = 'ipc-component'>
				<div className = 'fit-95 form-and-analysis'>
					<IpcFormDD
						view = {currentView}
						tiers = {ipcFormDD}
						handleSubmit = {this.calculate}
						handleInputChange = {this.updateFormFields}
						fields = {formFields}
						assumptions = {assumptions}
						handleClick = {this.handleClick}
						handleMouseEnter = {this.handleMouseEnter}
						handleMouseLeave = {this.handleMouseLeave}
						verificationBox = {verificationBox}
					/>
			{/*
					<IPCForm
						handleSubmit = {this.calculate}
						handleInputChange = {this.updateFormFields}
						fields = {formFields}
						assumptions = {assumptions}
						handleClick = {this.handleClick}
					/>
			*/}
					<IPCAnalysis
						handleClick = {this.handleClick}
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
			</div>
		);
	}
}