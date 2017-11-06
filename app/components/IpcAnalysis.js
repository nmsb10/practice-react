import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from './Tooltip';

export const IPCAnalysis = (props) => {
	let {
		fields,
		assumptions,
		withCommas,
		tierOne,
		tierTwo,
		incomeSummary,
		incomeSummaryOrder,
		expensesSummary,
		expensesSummaryOrder,
		noiSummary
	} = props;
	let capRate = 0;

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
													incomeSummary.gpi.totals[tierTwoName.obj].monthly.push(contents.value.monthly===''?0:contents.value.monthly);
													incomeSummary.gpi.totals[tierTwoName.obj].annual.push(contents.value.annual === '' ? 0 : contents.value.annual);
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
													expensesSummary.oe.totals[tierTwoName.obj].monthly.push(contents.value.monthly===''?0:contents.value.monthly);
													expensesSummary.oe.totals[tierTwoName.obj].annual.push(contents.value.annual === '' ? 0 : contents.value.annual);
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
									let retailTotalMonthly = incomeSummary.gpi.totals.retail.monthly.reduce((total, num) => total + parseInt(num), 0);
									let otherTotalMonthly = incomeSummary.gpi.totals.other.monthly.reduce((total, num) => total + parseInt(num), 0);
									let resTotalMonthly = incomeSummary.gpi.totals.rental.monthly.reduce((total, num) => total + parseInt(num), 0);
									incomeSummary.gpi.total.monthly = (retailTotalMonthly + otherTotalMonthly + resTotalMonthly).toFixed(2);
									let retailTotalAnnual = incomeSummary.gpi.totals.retail.annual.reduce((total, num) => total + parseInt(num), 0);
									let otherTotalAnnual = incomeSummary.gpi.totals.other.annual.reduce((total, num) => total + parseInt(num), 0);
									let resTotalAnnual = incomeSummary.gpi.totals.rental.annual.reduce((total, num) => total + parseInt(num), 0);
									incomeSummary.gpi.total.annual = (retailTotalAnnual + otherTotalAnnual + resTotalAnnual).toFixed(2);
									//gpi tooltip calculations
									incomeSummary.gpi.tooltip.monthly.total = (retailTotalMonthly + otherTotalMonthly + resTotalMonthly).toFixed(2);
									incomeSummary.gpi.tooltip.annual.total = (retailTotalAnnual + otherTotalAnnual + resTotalAnnual).toFixed(2);
									//vacancy totals and tooltip totals
									incomeSummary.vacancy.total.monthly = (assumptions.other[0].amount * 0.01 * incomeSummary.gpi.total.monthly).toFixed(2);
									incomeSummary.vacancy.total.annual = (assumptions.other[0].amount * 0.01 * incomeSummary.gpi.total.annual).toFixed(2);
									incomeSummary.vacancy.tooltip.monthly.total = (assumptions.other[0].amount * 0.01 * incomeSummary.gpi.total.monthly).toFixed(2);
									incomeSummary.vacancy.tooltip.annual.total = (assumptions.other[0].amount * 0.01 * incomeSummary.gpi.total.annual).toFixed(2);
									//collections totals and tooltip totals
									incomeSummary.collections.total.monthly = (assumptions.other[1].amount * 0.01 * incomeSummary.gpi.total.monthly).toFixed(2);
									incomeSummary.collections.total.annual = (assumptions.other[1].amount * 0.01 * incomeSummary.gpi.total.annual).toFixed(2);
									incomeSummary.collections.tooltip.monthly.total = (assumptions.other[1].amount * 0.01 * incomeSummary.gpi.total.monthly).toFixed(2);
									incomeSummary.collections.tooltip.annual.total = (assumptions.other[1].amount * 0.01 * incomeSummary.gpi.total.annual).toFixed(2);
									//egi totals and tooltip totals
									incomeSummary.egi.total.monthly = (incomeSummary.gpi.total.monthly - incomeSummary.vacancy.total.monthly - incomeSummary.collections.total.monthly).toFixed(2);
									incomeSummary.egi.total.annual = (incomeSummary.gpi.total.annual - incomeSummary.vacancy.total.annual - incomeSummary.collections.total.annual).toFixed(2);
									incomeSummary.egi.tooltip.monthly.total = (incomeSummary.gpi.total.monthly - incomeSummary.vacancy.total.monthly - incomeSummary.collections.total.monthly).toFixed(2);
									incomeSummary.egi.tooltip.annual.total = (incomeSummary.gpi.total.annual - incomeSummary.vacancy.total.annual - incomeSummary.collections.total.annual).toFixed(2);
									if(m===0){
										incomeSummary.gpi.tooltip.monthly.figures.push('total retail rental income: $'+ retailTotalMonthly);
										incomeSummary.gpi.tooltip.monthly.figures.push('total other income: $'+ otherTotalMonthly);
										incomeSummary.gpi.tooltip.monthly.figures.push('total residential rental income: $'+ resTotalMonthly);
										incomeSummary.gpi.tooltip.annual.figures.push('total retail rental income: $'+ retailTotalAnnual);
										incomeSummary.gpi.tooltip.annual.figures.push('total other income: $'+ otherTotalAnnual);
										incomeSummary.gpi.tooltip.annual.figures.push('total residential rental income: $'+ resTotalAnnual);
										//vacancy tooltip
										incomeSummary.vacancy.tooltip.monthly.figures.push('GPI: $'+ incomeSummary.gpi.total.monthly,'Vacancy Factor: '+ assumptions.other[0].amount + '%');
										incomeSummary.vacancy.tooltip.annual.figures.push('GPI: $'+ incomeSummary.gpi.total.annual,'Vacancy Factor: '+ assumptions.other[0].amount + '%');
										//collections tooltip
										incomeSummary.collections.tooltip.monthly.figures.push('GPI: $'+ incomeSummary.gpi.total.monthly,'Collections Factor: '+ assumptions.other[1].amount + '%');
										incomeSummary.collections.tooltip.annual.figures.push('GPI: $'+ incomeSummary.gpi.total.annual,'Collections Factor: '+ assumptions.other[1].amount + '%');
										//egi tooltip
										incomeSummary.egi.tooltip.monthly.figures.push('GPI: $'+ incomeSummary.gpi.total.monthly);
										incomeSummary.egi.tooltip.monthly.figures.push('Vacancy total: $'+ incomeSummary.vacancy.total.monthly);
										incomeSummary.egi.tooltip.monthly.figures.push('Collections total: $'+ incomeSummary.collections.total.monthly);
										incomeSummary.egi.tooltip.annual.figures.push('GPI: $'+ incomeSummary.gpi.total.annual);
										incomeSummary.egi.tooltip.annual.figures.push('Vacancy total: $'+ incomeSummary.vacancy.total.annual);
										incomeSummary.egi.tooltip.annual.figures.push('Collections: $'+ incomeSummary.collections.total.annual);
									}
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
									let carryingCostsTotalMonthly = expensesSummary.oe.totals.carryingCosts.monthly.reduce((total, num) => total + parseInt(num), 0);
									let utilitiesTotalMonthly = expensesSummary.oe.totals.utilities.monthly.reduce((total, num) => total + parseInt(num), 0);
									let otherTotalMonthly = expensesSummary.oe.totals.other.monthly.reduce((total, num) => total + parseInt(num), 0);
									expensesSummary.oe.total.monthly = (carryingCostsTotalMonthly + utilitiesTotalMonthly + otherTotalMonthly).toFixed(2);
									let carryingCostsTotalAnnual = expensesSummary.oe.totals.carryingCosts.annual.reduce((total, num) => total + parseInt(num), 0);
									let utilitiesTotalAnnual = expensesSummary.oe.totals.utilities.annual.reduce((total, num) => total + parseInt(num), 0);
									let otherTotalAnnual = expensesSummary.oe.totals.other.annual.reduce((total, num) => total + parseInt(num), 0);
									expensesSummary.oe.total.annual = (carryingCostsTotalAnnual + utilitiesTotalAnnual + otherTotalAnnual).toFixed(2);
									//gpi tooltip calculations
									expensesSummary.oe.tooltip.monthly.total = expensesSummary.oe.total.monthly;
									expensesSummary.oe.tooltip.annual.total = expensesSummary.oe.total.annual;
									if(i===0){
										expensesSummary.oe.tooltip.monthly.figures.push('total carrying costs: $'+ carryingCostsTotalMonthly);
										expensesSummary.oe.tooltip.monthly.figures.push('total utilities costs: $'+ utilitiesTotalMonthly);
										expensesSummary.oe.tooltip.monthly.figures.push('total other costs: $'+ otherTotalMonthly);
										expensesSummary.oe.tooltip.annual.figures.push('total carrying costs: $'+ carryingCostsTotalAnnual);
										expensesSummary.oe.tooltip.annual.figures.push('total utilities costs: $'+ utilitiesTotalAnnual);
										expensesSummary.oe.tooltip.annual.figures.push('total other costs: $'+ otherTotalAnnual);
									}
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
						noiSummary[0].total.monthly = (incomeSummary.egi.total.monthly - expensesSummary.oe.total.monthly).toFixed(2);
						noiSummary[0].total.annual = (incomeSummary.egi.total.annual - expensesSummary.oe.total.annual).toFixed(2)	
						//tooltip calculations
						noiSummary[0].tooltip.monthly.total = noiSummary[0].total.monthly;
						noiSummary[0].tooltip.annual.total = noiSummary[0].total.annual;
						capRate = 100 * noiSummary[0].total.annual / fields.purchasePrice[0].value.amount;
						console.log(capRate);
						if(i===0){
							noiSummary[0].tooltip.monthly.figures.push('EGI: $'+ incomeSummary.egi.total.monthly);
							noiSummary[0].tooltip.monthly.figures.push('total operating expenses: $'+ expensesSummary.oe.total.monthly);
							noiSummary[0].tooltip.annual.figures.push('EGI: $'+ incomeSummary.egi.total.annual);
							noiSummary[0].tooltip.annual.figures.push('total operating expenses: $'+ expensesSummary.oe.total.annual);
						}
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