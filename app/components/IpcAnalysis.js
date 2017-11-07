import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from './Tooltip';

export const IPCAnalysis = (props) => {
	let {
		tierOne,
		tierTwo,
		fields,
		assumptions,
		withCommas,
		incomeSummary,
		incomeSummaryOrder,
		expensesSummary,
		expensesSummaryOrder,
		noiSummary,
	} = props;
	let capRate = 100 * noiSummary[0].total.annual / fields.purchasePrice[0].value.amount || 0;
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
			<div className = 'cap-rate-cont'>
				<span>capitalization rate:</span>
				<span className = {capRate > 0 ? 'green' : 'red'}>{capRate}%</span>
			</div>
			{tierOne.map( (tierOneName, i) => {
				return(
					<div className = 'results-container' key = {i}>
						<div className = 'rc-side-header'>
							<span>{tierOneName}</span>
						</div>
						{tierTwo[i].map( (tierTwoName, j) => {
							let total = {monthly:[], annual:[]};
							return(
								<div className = 'table-container' key = {j}>
									<table>
										<tbody>
											{tierOneName === 'income' ?
											<tr>
												<th>{tierTwoName.display}</th>
												<th>unit #</th>
												<th>sqft</th>
												<th>lease start</th>
												<th>lease end</th>
												<th>monthly</th>
												<th>annual</th>
											</tr>
											:
											<tr>
												<th>{tierTwoName.display}</th>
												<th>monthly</th>
												<th>annual</th>
											</tr>
											}
											<tr></tr>
											{fields[tierOneName][tierTwoName.obj].map( (contents, k) => {
												total.monthly.push(contents.value.monthly===''?0:contents.value.monthly);
												total.annual.push(contents.value.annual===''?0:contents.value.annual);
												if(tierOneName === 'income'){
													return(
														<tr key = {k}>
															<td>{contents.name}</td>
															<td></td>
															<td></td>
															<td></td>
															<td></td>
															<td>{contents.value.monthly === '' ? '-' : contents.value.preEntry + withCommas(contents.value.monthly)}</td>
															<td>{contents.value.annual === '' ? '-' : contents.value.preEntry+withCommas(contents.value.annual)}</td>
														</tr>
													);
												}else if(tierOneName === 'expenses'){
													return(
														<tr key = {k}>
															<td>{contents.name}</td>
															<td>{contents.value.monthly === '' ? '-' : contents.value.preEntry + withCommas(contents.value.monthly)}</td>
															<td>{contents.value.annual === '' ? '-' : contents.value.preEntry+withCommas(contents.value.annual)}</td>
														</tr>
													);
												}
											})}
											{tierOneName === 'income'?
												<tr>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td className = 'capitalize'>{tierTwoName.display} {tierOneName} Total:</td>
													<td className = 'ttt-container'>${withCommas(''+total.monthly.reduce((total, num) => total + parseInt(num), 0))}</td>
													<td className = 'ttt-container'>${withCommas(''+total.annual.reduce((total, num) => total + parseInt(num), 0))}</td>
												</tr>
											:
												<tr>
													<td className = 'capitalize'>{tierTwoName.display} {tierOneName} Total:</td>
													<td className = 'ttt-container'>${withCommas(''+total.monthly.reduce((total, num) => total + parseInt(num), 0))}</td>
													<td className = 'ttt-container'>${withCommas(''+total.annual.reduce((total, num) => total + parseInt(num), 0))}</td>
												</tr>
											}
										</tbody>
									</table>
								</div>
							);
						})}
						{tierOneName === 'income' ?
						<table>
							<tbody>
								<tr>
									<th></th>
									<th>monthly</th>
									<th>annual</th>
								</tr>
								<tr></tr>
								{incomeSummaryOrder.map( (contents, m) => {
									return(
										<tr key = {m}>
											<td className = 'capitalize'>{contents.display}</td>
											<td className = 'ttt-container'>${withCommas(''+incomeSummary[contents.obj].total.monthly)}
												<Tooltip
													content = {incomeSummary[contents.obj].tooltip.monthly}
													displayType = 'calculation'
												/>
											</td>
											<td className = 'ttt-container'>${withCommas(''+incomeSummary[contents.obj].total.annual)}
												<Tooltip
													content = {incomeSummary[contents.obj].tooltip.annual}
													displayType = 'calculation'
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						:
						<table>
							<tbody>
								<tr>
									<th></th>
									<th>monthly</th>
									<th>annual</th>
								</tr>
								<tr></tr>
								{expensesSummaryOrder.map( (contents, i) => {
									return(
										<tr key = {i}>
											<td className = 'capitalize'>{contents.display}</td>
											<td className = 'ttt-container'>${withCommas(''+expensesSummary[contents.obj].total.monthly)}
												<Tooltip
													content = {expensesSummary[contents.obj].tooltip.monthly}
													displayType = 'calculation'
												/>
											</td>
											<td className = 'ttt-container'>${withCommas(''+expensesSummary[contents.obj].total.annual)}
												<Tooltip
													content = {expensesSummary[contents.obj].tooltip.annual}
													displayType = 'calculation'
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						}
					</div>
				);
			})}
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>monthly</th>
						<th>annual</th>
					</tr>
					<tr></tr>
					{noiSummary.map( (content, i) => {
						return(
							<tr key = {i}>
								<td className = 'capitalize'>Net Operating Income</td>
								<td className = 'ttt-container'>${withCommas(''+content.total.monthly)}
									<Tooltip
										content = {content.tooltip.monthly}
										displayType = 'calculation'
									/>
								</td>
								<td className = 'ttt-container'>${withCommas(''+content.total.annual)}
									<Tooltip
										content = {content.tooltip.annual}
										displayType = 'calculation'
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
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