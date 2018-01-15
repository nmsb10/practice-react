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
				[{name: 'rental', displayName: 'rental: residential', allowAdd: true, title: 'add a source of (residential) rental income'}, {name: 'retail', displayName: 'rental: retail', allowAdd: true, title: 'add a source of retail rental income'}, {name: 'other', allowAdd: true, title: 'add a source of other income'}],
				[{name: 'carryingCosts', displayName: 'carrying costs', allowAdd: true, title: 'add a different carrying cost'}, {name: 'utilities', allowAdd: true, title: 'add another utilities expense'}, {name: 'other', allowAdd: true, title:'add a miscellaneous expense'}]
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
					let sectionT2 = section.objectName;
					let fieldsGuide = tierThree[i][j];
					//let fieldsBool = mainObj === 'fields' ? true : false;
					return(
						<MainSection
							sectionTitle = {section.displayName}
							sectionT2 = {sectionT2}
							icon = {specFieldsIcon}
							fields = {specificFields}
							fieldsGuide = {fieldsGuide}
							handleChange = {handleInputChange}
						/>
					);
			}));
		});
	return(
		// this onClick will handle any click on the entire modal
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