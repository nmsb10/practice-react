import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from './Tooltip';

export const IPCAnalysis = (props) => {
	let { fields, assumptions, withCommas, tierOne, tierTwo } = props;

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
			<div>
				<span>capitalization rate:</span>
				<span>7.83%</span>
			</div>
			{tierOne.map( (tierOneName, i) => {
				let testArr = [];
				let incomeSummary = {
					gpi:{
						total: {
							monthly:50,
							annual:0
						},
						totals: {
							retail:{
								monthly:[],
								annual:[]
							},
							other:{
								monthly:[],
								annual:[]
							},
							rental:{
								monthly:[],
								annual:[]
							}
						},
						tooltip:{
							monthly:{
								location: 'bottom',
								cssClassAdd:'calc',
								figures:[],
								total:'total monthly'
							},
							annual:{
								location: 'bottom',
								cssClassAdd:'calc',
								figures:[],
								total:'total annual'
							}
						}
					},
					vacancy:{
						total: {monthly:0, annual:0},
						tooltip:{
							monthly:{
								location: 'bottom',
								cssClassAdd:'calc',
								figures:['GPI: '+ 'incomeSummary.gpi.total.monthly','x Vacancy Factor: '+assumptions.other[0].amount],
								//figures:['GPI: '+ incomeSummary.gpi.total.monthly,'x Vacancy Factor: '+assumptions.other[0].amount],
								total:'vacancy total monthly'
							},
							annual:{
								location: 'bottom',
								cssClassAdd:'calc',
								figures:['GPI: '+ 'incomeSummary.gpi.total.annual', 'x Vacancy Factor: '+assumptions.other[0].amount],
								total:'vacancy total annual'
							}
						}
					},
					collections:{
						total: {monthly:0, annual:0},
						tooltip:{
							monthly:{
								location: 'bottom',
								cssClassAdd:'calc',
								figures:[],
								total:'total monthly'
							},
							annual:{
								location: 'bottom',
								cssClassAdd:'calc',
								figures:[],
								total:'total annual'
							}
						}
					},
					egi:{
						total: {monthly:0, annual:0},
						tooltip:{
							monthly:{
								location: 'bottom',
								cssClassAdd:'calc',
								figures:[],
								total:'total monthly'
							},
							annual:{
								location: 'bottom',
								cssClassAdd:'calc',
								figures:[],
								total:'total annual'
							}
						}
					}
				};
				let incomeSummaryOrder = [
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
				];
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
											<tr>
												<th>{tierTwoName.display}</th>
												<th>unit #</th>
												<th>sqft</th>
												<th>lease start</th>
												<th>lease end</th>
												<th>monthly</th>
												<th>annual</th>
											</tr>
											<tr></tr>
											{fields[tierOneName][tierTwoName.obj].map( (contents, k) => {
												total.monthly.push(contents.value.monthly===''?0:contents.value.monthly);
												total.annual.push(contents.value.annual===''?0:contents.value.annual);
												if(tierOneName==='income'){
													incomeSummary.gpi.totals[tierTwoName.obj].monthly.push(contents.value.monthly===''?0:contents.value.monthly);
													incomeSummary.gpi.totals[tierTwoName.obj].annual.push(contents.value.annual === '' ? 0 : contents.value.annual);
												}
												//tooltip.monthly.figures.push(contents.value.monthly);
												//tooltip.annual.figures.push(contents.value.annual);
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
											})}
											<tr>
												<td></td>
												<td></td>
												<td></td>
												<td></td>
												<td className = 'capitalize'>{tierTwoName.display} {tierOneName} Total:</td>
												<td className = 'ttt-container'>${withCommas(''+total.monthly.reduce((total, num) => total + parseInt(num), 0))}</td>
												<td className = 'ttt-container'>${withCommas(''+total.annual.reduce((total, num) => total + parseInt(num), 0))}</td>
											</tr>
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
									let retailTotalMonthly = incomeSummary.gpi.totals.retail.monthly.reduce((total, num) => total + parseInt(num), 0);
									let otherTotalMonthly = incomeSummary.gpi.totals.other.monthly.reduce((total, num) => total + parseInt(num), 0);
									let resTotalMonthly = incomeSummary.gpi.totals.rental.monthly.reduce((total, num) => total + parseInt(num), 0);
									incomeSummary.gpi.tooltip.monthly.total = retailTotalMonthly + otherTotalMonthly + resTotalMonthly;
									incomeSummary.gpi.total.monthly = retailTotalMonthly + otherTotalMonthly + resTotalMonthly;
									if(m===0){
										incomeSummary.gpi.tooltip.monthly.figures.push('totalretail rental income: $'+ retailTotalMonthly);
										incomeSummary.gpi.tooltip.monthly.figures.push('total other income total: $'+ otherTotalMonthly);
										incomeSummary.gpi.tooltip.monthly.figures.push('total residential rental income: $'+ resTotalMonthly);
									}
									incomeSummary.vacancy.total.monthly = (assumptions.other[0].amount * 0.01 * incomeSummary.gpi.total.monthly).toFixed(2);
									incomeSummary.collections.total.monthly = (assumptions.other[1].amount * 0.01 * incomeSummary.gpi.total.monthly).toFixed(2);
									incomeSummary.egi.total.monthly = (incomeSummary.gpi.total.monthly - incomeSummary.vacancy.total.monthly - incomeSummary.collections.total.monthly).toFixed(2);
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
						<div>hello more practicing please thanks. (insert final income or expenses analysis here_)
						</div>
						}
					</div>
				);
			})}
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