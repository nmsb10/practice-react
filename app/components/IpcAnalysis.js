import React from 'react';
import {Tooltip} from './Tooltip';

export const IPCAnalysis = (props) => {
	let { fields, assumptions } = props;
	let tooltip = {
		location: 'top',
		cssClassAdd:'calc'
	};

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
		//   return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
		// }



		//http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
		// function withCommas(x) {
		// 	return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		// }

		//review array functions including filter
	return(
		<div className = 'ipc-analysis-container'>
			<div>hello</div>
			<i className="fa fa-home" aria-hidden="true"></i>
			<div className = 'ttt-container'>
				<span>hover here to see sample calculation tooltip</span>
				<Tooltip
					content = {tooltip}
					displayType = 'calculation'
				/>
			</div>
		{/*
			http://fontawesome.io/examples/#animated
			http://fontawesome.io/icons/
		
			<i className ="fa fa-spinner fa-pulse fa-3x" aria-hidden = 'true'></i>
		*/}	
		</div>
	);
}