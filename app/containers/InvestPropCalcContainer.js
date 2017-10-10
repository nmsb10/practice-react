import React from 'react';
import {IPCForm} from '../components/IpcForm';
import * as axios from 'axios';

export class InvestPropCalcContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			onView: 'search',//while searching on search form, is 'search'. otherwise 'loading'. after loading, if results are found, is 'stats' to show stats
			formFields:{
				purchasePrice:0,
				income:{
					retail:[],//business1; business2; etc
					other:{
						laundry:0,
						vending:0,
						misc:[]//state source and amount
					},
					rental:[
						{
							source:'unit 1',
							amount:'',
							vmes:'numbers only please :)'
						}
					]//state unit or lessee name, and amount
				},
				expenses:{
					carryingCosts:{
						taxes:0,//real estate property taxes
						insurance:0,//property insurance
						assessments:0//condominium or property assessments
					},
					utilities:{
						gasCHW:0,//common hot water
						gasHeat:0,
						electricity:0,//common areas
						water:0,
						scavenger:0
					},
					other:{
						repairs:0,//repairs and decor
						management:0,//property managements
						reserves:0//reserves fund
					}
				},
				finTerms:{//financing terms
					downPayment:0,
					intAnnual:0,//annual interest rate NB APR is higher
					term:0//in years
				},
				assumptions:{
					vaa:3.00,//(property) value appreciation annually
					retia:5.00,//real estate tax increase annually
					aia:3.00,//assessments increase annual
					ria:2.00,//rent increase annual
					vf:8.00,//vacancy factor
					collections:2.00,//collections
					management:6.00,//property management fee
					reserves:5.00//reserves fund
				}
			},
			validationMes:{
				income:{
					retail:'',
					other:{
						laundry:'',
						vending:'',
						misc:''
					},
					rental:[
						{
							source:'unit 1',
							mes:'numbers only please'
						}
					]
				}
			}
		};
		this.calculate = this.calculate.bind(this);
		this.updateFormFields = this.updateFormFields.bind(this);
	}
	calculate(){
		let{formFields} = this.state;
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
		console.log(e.target.dataset.propertyName);
		console.log(e.target.value);
		let {formFields} = this.state;
		let newState = {};
		newState.e.target.dataset.propertyName = e.target.value;
		let objCopy = Object.assign({}, formFields, newState);
		console.log('huh');
		console.log('object copy: ',objCopy);
		this.setState({
			formFields: objCopy
		});
	}
	render(){
		let { formFields, validationMes } = this.state;
		return(
			<div>
				<IPCForm
					calculate = {this.calculate}
					handleInputChange = {this.updateFormFields}
					fields = {formFields}
					vmes = {validationMes}//validation messages
				/>
			</div>
		);
	}
}