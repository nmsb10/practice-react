import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from './Tooltip';

export const IPCAnalysis = (props) => {
	let { fields, assumptions, withCommas, tierOne, tierTwo } = props;
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


		//review array functions including filter
	return(
		<div className = 'ipc-analysis-container'>
			<div>
				<span>purchase price:</span>
				<span>{fields.purchasePrice[0].value.preEntry}{fields.purchasePrice[0].value.amount === '' ? '-0-' : withCommas(fields.purchasePrice[0].value.amount)}</span>
			</div>
			<i className="fa fa-home" aria-hidden="true"></i>
			<div>
				<span>capitalization rate:</span>
				<span>7.83%</span>
			</div>
			{tierOne.map( (tierOneName, i) => {
				return(
					<div className = 'results-container' key = {i}>
						<div className = 'rc-side-header'>
							<span>{tierOneName}</span>
						</div>
						{tierTwo[i].map( (tierTwoName, j) => {
							return(
								<div className = 'table-container' key = {j}>
									<table>
										<tbody>
											<tr>
												<th>{tierTwoName}</th>
												<th>unit #</th>
												<th>sqft</th>
												<th>lease start</th>
												<th>lease end</th>
												<th>monthly</th>
												<th>annual</th>
											</tr>
											<tr></tr>
											{fields[tierOneName][tierTwoName].map( (contents, k) => {
												return(
													<tr key = {k}>
														<td>{contents.name}</td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td>{contents.value.preEntry}{contents.value.monthly === '' ? '-0-' : withCommas(contents.value.monthly)}</td>
														<td>{contents.value.preEntry}{contents.value.annual === '' ? ':)' : withCommas(contents.value.annual)}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							);
							
						})}						
					</div>
				);
			})}
			



			<div className = 'ttt-container'>
				<span>hover here to see sample calculation tooltip</span>
				<Tooltip
					content = {tooltip}
					displayType = 'calculation'
				/>
			</div>
		{/*
			https://javascriptweblog.wordpress.com/2010/07/26/no-more-ifs-alternatives-to-statement-branching-in-javascript/
			http://fontawesome.io/examples/#animated
			http://fontawesome.io/icons/
		
			<i className ="fa fa-spinner fa-pulse fa-3x" aria-hidden = 'true'></i>
		*/}	
		</div>
	);
}

//https://github.com/facebook/prop-types#prop-types
IPCAnalysis.propTypes = {
	fields: PropTypes.object,
	assumptions: PropTypes.object,
	withCommas: PropTypes.func,
	tierOne: PropTypes.array,
	tierTwo: PropTypes.array
};