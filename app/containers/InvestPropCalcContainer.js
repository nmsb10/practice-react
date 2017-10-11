import React from 'react';
import {IPCForm} from '../components/IpcForm';
import * as axios from 'axios';

export class InvestPropCalcContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			onView: 'search',//while searching on search form, is 'search'. otherwise 'loading'. after loading, if results are found, is 'stats' to show stats
			validationMessages:{
				number: ['please enter a number','numbers only please'],
				integer: ['please enter whole numbers only'],
				float: ['enter a decimal'],
				percentage: ['enter a percentage'],
				string:['letters only please']
			},
			formFields:{
				purchasePrice:[
					{
						name:'purchase price',
						value:'',
						placeholder:'-0-',
						required:true,
						validation: ['number'],
						validEntry:false,
						vmes:'validation message for the purchase price',
						tooltip:'enter the purchase price for the subject property (anticipated or actual)'
					}
				],
				income:{
					retail:[{
						name:'business one',
						value:'',
						placeholder:'-0-',
						required:true,
						validation: ['number'],
						validEntry:false,
						vmes:'validation message for the income: business one',
						tooltip:'enter business one income (anticipated or actual)'
					},{
						name:'business two',
						value:'',
						placeholder:'-0-',
						required:true,
						validation: ['number','chicken'],
						validEntry:false,
						vmes:'required',
						tooltip:'enter business two income (anticipated or actual)'
					}],
					other:[{//also add other: miscellaneous: state source and amount
						name:'laundry room',
						value:'',
						placeholder:'-0-',
						required:true,
						validation: ['number','kale'],
						validEntry:false,
						vmes:'please enter a number',
						tooltip:'enter the laundry room income for the subject property (estimated or actual)'
					},{
						name:'vending machines',
						value:'',
						placeholder:'-0-',
						required:true,
						validation: ['number'],
						validEntry:false,
						vmes:'validation message for the vending machine income',
						tooltip:'enter vending machine income for the subject property (estimated or actual)'
					}],
					rental:[{//state unit or lessee name, and amount
						name:'rental income, unit one',
						value:'',
						placeholder:'-0-',
						required:true,
						validation: ['number','integer'],
						validEntry:false,
						vmes:'validation mes for rental income',
						tooltip:'enter the rental income for the subject property'
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
		this.validateInput = this.validateInput.bind(this)
	}
	calculate(){
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
	updateFormFields(e){//remember that here, e is e.target
		//validate according to requirements in the array
		//if change is valid, implement valid protocol, then update state
		//if change not valid, implement correction protocol and update state
		let {formFields} = this.state;
		let enteredValue = e.value;
		console.log('section:', e.dataset.section);
		console.log('key: ', e.dataset.key);
		console.log(formFields['income.retail']);
		console.log(formFields.income.retail[e.dataset.key]);

		//https://stackoverflow.com/questions/4260308/getting-the-objects-property-name

		//console.log('selected object: ', formFields[e.dataset.section][e.dataset.key]);
		//let validateArr = formFields.e.dataset.section[e.dataset.key].validation;
		console.log(enteredValue);
		//console.log(validateArr);

		// for()
		// if(typeof newValue === )

		// let newObjCopy = Object.assign({}, nameObjJN, {nameArr: nameArrUpdated});
		// 	this.setState({
		// 		nameObjJN: newObjCopy
		// 	});

		// let newState = {};
		// newState.e.target.dataset.propertyName = e.target.value;
		// let objCopy = Object.assign({}, formFields, newState);
		// console.log('huh');
		// console.log('object copy: ',objCopy);
		// this.setState({
		// 	formFields: objCopy
		// });
	}
	validateInput(input){
		//https://www.w3schools.com/js/js_datatypes.asp
		// validationMessages:{
		// 		number: ['please enter a number','numbers only please'],
		// 		integer: ['whole numbers only'],
		// 		float: ['enter a decimal'],
		// 		percentage: ['enter a percentage'],
		// 		string:['letters only please']
		// 	},

	}
	render(){
		let { formFields } = this.state;
		return(
			<div>
				<IPCForm
					calculate = {this.calculate}
					updateForm = {this.updateFormFields}
					fields = {formFields}
				/>
			</div>
		);
	}
}