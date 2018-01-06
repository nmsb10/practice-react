import React from 'react';
import { CloseButton } from './CloseButton';
import { Section } from './ipcFormComponents/Section';

export const IpcFormDD = (props) => {
	let {
		view,
		fields,
		assumptions,
		handleClick,
		handleInputChange,
		handleSubmit
	} = props;
	let tierOne = ['fields', 'assumptions'];
	let tierTwo = [[{
						objectName: 'price',
						displayName: 'purchase price'
					},{
						objectName: 'income',
						displayName: 'income'
					},{
						objectName: 'expenses',
						displayName: 'expenses'
					}],[
					{
						objectName: 'financing',
						displayName: 'financing'
					},{
						objectName: 'other',
						displayName: 'other'
					}]];
	let tierThree =
		[
			[
				['purchasePrice'],
				['rental', 'retail', 'other'],
				['carryingCosts', 'utilities', 'other']
			],[
				['terms'],
				['terms']
			]
		];
	let formContents =
		tierOne.map((mainObj, i) => {
			return(
				tierTwo[i].map((section, j) => {
					return(
						<Section
							name = {section.displayName}
							fields = {fields}
							assumptions = {assumptions}
						/>
						// <div key = {j}>{section.displayName}
						// 	tierThree[i][j].map((content, k) => {
						// 			mainObj === 'fields' ?
						// 			fields[section.objectName][content].map((specific, l) => {
						// 				return(
						// 				<div>
						// 					<i className="fa fa-question-circle-o" aria-hidden="true"></i>
						// 					<p>{specific.name}</p>
						// 				</div>
						// 				);
						// 			})
						// 			:
						// 			assumptions[section.objectName][content].map((specific, m) => {
						// 				return(
						// 				<div key = {m}>
						// 					<i className="fa fa-question-circle-o" aria-hidden="true"></i>
						// 					<p>{specific.field}</p>
						// 				</div>
						// 				);
						// 			})
						// 	})
						// </div>
					);
			}));
		});
			// tierTwo[i].map((section, j) => {
			// 	return(
			// 		<div key = {j}>{section.displayName}
			// 		</div>
				// );
				// tierThree[i][j].map((content, k) => {
				// 	mainObj === 'fields' ?
				// 	fields[section.objectName][content].map((specific, l) => {
				// 		console.log(specific);
				// 		return(
				// 		<div key = {l}>
				// 			<p>hello</p>
				// 		{/*
				// 			<i className="fa fa-question-circle-o" aria-hidden="true"></i>
				// 			<p>{specific.name}</p>
				// 		*/}
				// 		</div>
				// 		);
				// 	})
				// 	:
				// 	assumptions[section.objectName][content].map((specific, m) => {
				// 		return(
				// 		<div key = {m}>
				// 			<i className="fa fa-question-circle-o" aria-hidden="true"></i>
				// 			<p>{specific.field}</p>
				// 		</div>
				// 		);
				// 	})
				// })
		// 	})
		// });
	return(
		<div
			className = {'ipc-form-ad' + (view === 'showForm' ? ' open' : '')}
			data-item-clicked = 'closeForm'
			onClick = {handleClick}
		>
			<div className = {'cover' + (view === 'showForm' ? ' display-ipcform' : ' remove-ipcform')}>
				<CloseButton
					itemClicked = 'closeForm'
					handleClick = {handleClick}
				/>
				<div className = 'content'>
					<div>
						<p>
							welcome to the
							<br/>
							Investment Property Capitalization Rate Calculator
						</p>
						<p>
							Please complete the following fields (if known or estimated), then click "verify & calculate."
						</p>
					</div>
					<div>
						<form onSubmit = {(event) => handleSubmit(event)}>
							<div>
								{formContents}
								<button
									type="submit"
									className=''
									id="runSearch"
									>
									verify & calculate
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}