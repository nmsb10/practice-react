import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from './Tooltip';

export const IPCAnalysis = (props) => {
	let {
		handleClick,
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
		cashFlowSummary,
		cashFlowSummaryOrder
	} = props;
	let capRate = {
		value: 100 * noiSummary[0].total.annual / fields.price.purchasePrice[0].value.amount || 0,
		tooltip:{
			figures:['annual NOI: $'+withCommas(noiSummary[0].total.annual.toString()), 'Purchase Price: $'+withCommas(fields.price.purchasePrice[0].value.amount)],
			total: 100 * noiSummary[0].total.annual / fields.price.purchasePrice[0].value.amount || 0,
			sign:'divide',
			location: 'bottom',
			cssClassAdd: 'calc',
			textEnd:'%'
		}
	};
	let resultsOrder = [
		{obj: 'noi'},
		{obj: 'cashFlowSummary'}
	];
	return(
		<div className = 'ipc-analysis-container'>
			<button
				onClick = {handleClick}
				data-item-clicked = 'showForm'
				type = 'button'
				title = 'display the calculator form'
			>show ipc form</button>
			<div className = 'imp-cont-container'>
				<div className = 'imp-cont pp-cont'>
					<span>purchase price: </span>
					<span className = 'figure'>{fields.price.purchasePrice[0].value.preEntry}{fields.price.purchasePrice[0].value.amount === '' ? '-0-' : withCommas(fields.price.purchasePrice[0].value.amount)}</span>
				</div>
				<div className = 'cap-rate-cont imp-cont'>
					<span>capitalization rate: </span>
					<span className = {capRate.value > 0 ? 'ttt-container figure green' : 'ttt-container figure red'}>
						{capRate.value.toFixed(2)}%
						<Tooltip
							content = {capRate.tooltip}
							inputName = {capRate.value}
							displayType = 'calculation'
						/>
					</span>
				</div>
			</div>
			{tierOne.map( (tierOneName, i) => {
				return(
					<div className = 'results-container' key = {i}>
						<div className = 'rc-side-header'>
							<div className = 'title'>
								<span>{tierOneName}</span>
							</div>
						</div>
						<div className = 'rc-table-cont'>
						{tierTwo[i].map( (tierTwoName, j) => {
							let total = {monthly:[], annual:[]};
							return(
								<div className = 'table-container' key = {j}>
									<table className = {tierOneName === 'income' ? '' : 'expenses-table'}>
										<tbody>
											{tierOneName === 'income' ?
											<tr>
												<th>{tierTwoName.display}</th>
												<th className = 'unit'>unit #</th>
												<th className = 'sqft'>sqft</th>
												<th className = 'lease-start'>lease start</th>
												<th className = 'lease-end'>lease end</th>
												<th>monthly</th>
												<th>annual</th>
											</tr>
											:
											<tr>
												<th>{tierTwoName.display}</th>
												<th>notes</th>
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
															<td>-</td>
															<td>-</td>
															<td>-</td>
															<td>-</td>
															<td>{contents.value.monthly === '' ? '-' : contents.value.preEntry + withCommas(contents.value.monthly)}</td>
															<td>{contents.value.annual === '' ? '-' : contents.value.preEntry+withCommas(contents.value.annual)}</td>
														</tr>
													);
												}else if(tierOneName === 'expenses'){
													return(
														<tr key = {k}>
															<td>{contents.name}</td>
															<td></td>
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
													<td className = 'capitalize td-total-header'><span className = 'section-total-header'>{tierTwoName.display} {tierOneName} Total:</span></td>
													<td className = 'ttt-container'>${withCommas(''+total.monthly.reduce((total, num) => total + parseInt(num), 0))}</td>
													<td className = 'ttt-container'>${withCommas(''+total.annual.reduce((total, num) => total + parseInt(num), 0))}</td>
												</tr>
											:
												<tr>
													<td></td>
													<td className = 'capitalize td-total-header'><span className = 'section-total-header'>{tierTwoName.display} {tierOneName} Total:</span></td>
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
						<table className = 'expenses-table'>
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
					</div>
				);
			})}

	{/*
			{resultsOrder.map( (section, i) => {
				return(
					<div className = 'results-container' key = {i}>
						<div className = 'rc-side-header'>
							<div className = 'title'>
								<span>results</span>
							</div>
						</div>
						<div className = 'rc-table-cont'>
						{section[i].map( (tierTwoName, j) => {
							return(
								<div className = 'table-container' key = {j}>
									<table className = {tierOneName === 'income' ? '' : 'expenses-table'}>
										<tbody>

	*/}
			<div className = 'results-container'>
				<div className = 'rc-side-header'>
					<div className = 'title'>
						<span>results</span>
					</div>
				</div>
				<div className = 'rc-table-cont'>
					<div className = 'table-container'>
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
											<td className = 'capitalize'>Net Operating Income (NOI)</td>
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
					</div>
				</div>
				<div className = 'rc-table-cont'>
					<div className = 'table-container'>
						<table>
							<tbody>
								<tr>
									<th></th>
									<th>monthly</th>
									<th>annual</th>
								</tr>
								<tr></tr>
								{cashFlowSummaryOrder.map( (contents, i) => {
									return(
										<tr key = {i}>
											<td className = 'capitalize'>{contents.display}</td>
											<td className = 'ttt-container'>{contents.obj === 'dscr' ? '' : '$'}{withCommas(''+cashFlowSummary[contents.obj].total.monthly)}
												<Tooltip
													content = {cashFlowSummary[contents.obj].tooltip.monthly}
													displayType = 'calculation'
												/>
											</td>
											<td className = 'ttt-container'>{contents.obj === 'dscr' ? '' : '$'}{withCommas(''+cashFlowSummary[contents.obj].total.annual)}
												<Tooltip
													content = {cashFlowSummary[contents.obj].tooltip.annual}
													displayType = 'calculation'
												/>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		{/*
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