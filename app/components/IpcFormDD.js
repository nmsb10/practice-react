import React from 'react';
import { CloseButton } from './CloseButton';
import { MainSection } from './ipcFormComponents/MainSection';

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
						displayName: 'financing',
						fontAwesomeIcon: 'fa fa-university'
					},{
						objectName: 'other',
						displayName: 'other',
						fontAwesomeIcon: 'fa fa-check-square-o'
					}]];
	let tierThree =
		[
			[
				[{name: 'purchasePrice', allowAdd: false}],
				[{name: 'rental', allowAdd: true}, {name: 'retail', allowAdd: true}, {name: 'other', allowAdd: true}],
				[{name: 'carryingCosts', allowAdd: true}, {name: 'utilities', allowAdd: true}, {name: 'other', allowAdd: true}]
			],[
				[{name: 'terms', allowAdd: false}],
				[{name: 'terms', allowAdd: false}]
			]
		];
	let formContents =
		tierOne.map((mainObj, i) => {
			return(
				tierTwo[i].map((section, j) => {
					let specificFields = mainObj === 'fields' ? fields[section.objectName] : assumptions[section.objectName];
					let specFieldsIcon = section.fontAwesomeIcon;
					let fieldsGuide = tierThree[i][j];
					let fieldsBool = mainObj === 'fields' ? true : false;
					return(
						<MainSection
							sectionTitle = {section.displayName}
							icon = {specFieldsIcon}
							fields = {specificFields}
							fieldsGuide = {fieldsGuide}
							fieldsBool = {fieldsBool}
							handleChange = {handleInputChange}
						/>
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
					<div className = 'main-title'>
						<p>
							Investment Property Capitalization Rate Calculator
						</p>
						<p>
							Please complete the following fields (if known or estimated), then click "verify & calculate."
						</p>
						<p>
							You may close this box at any time to review the analysis with the figures you have already provided.
						</p>
					</div>
					<div className = 'form-container'>
						<form onSubmit = {(event) => handleSubmit(event)}>
							{formContents}
							<button
								type="submit"
								className=''
								id="runSearch"
								>
								verify & calculate
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}