import React from 'react';
import { CloseButton } from './CloseButton';
import { MainSection } from './ipcFormComponents/MainSection';
import { StandardButton } from './StandardButton';
import { VerificationBox } from './ipcFormComponents/VerificationBox';

export const IpcFormDD = (props) => {
	let {
		view,
		tiers,
		fields,
		assumptions,
		handleClick,
		handleInputChange,
		handleSubmit,
		handleMouseEnter,
		handleMouseLeave,
		verificationBox
	} = props;
	let formContents =
		tiers.tierOne.map((mainObj, i) => {
			return(
				tiers.tierTwo[i].map((section, j) => {
					let specificFields = mainObj === 'fields' ? fields[section.objectName] : assumptions[section.objectName];
					let specFieldsIcon = section.fontAwesomeIcon;
					let sectionT2 = section.objectName;
					let fieldsGuide = tiers.tierThree[i][j];
					let sectionOpen = {key: {t1:i, t2:j}, bool: section.sectionOpen}
					return(
						<MainSection
							sectionTitle = {section.displayName}
							sectionT2 = {sectionT2}
							icon = {specFieldsIcon}
							fields = {specificFields}
							fieldsGuide = {fieldsGuide}
							handleChange = {handleInputChange}
							sectionOpen = {sectionOpen}
							handleMouseEnter = {handleMouseEnter}
							handleMouseLeave = {handleMouseLeave}
							mainObj = {mainObj}
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
					handleClick = ''
				/>
				<div className = 'content'>
					<div className = 'main-title'>
						<p>
							Investment Property Capitalization Rate Calculator
						</p>
						<p>
							Please complete the following fields (if known or estimated), then click "<a className = 'ipc-form-link' href = '#runSearch'>verify & calculate</a>."
						</p>
						<p>
							You may close this box at any time to review the analysis with the figures you have already provided.
						</p>
					</div>
					<div className = 'form-container'>
						<form onSubmit = {(event) => handleSubmit(event)}>
							{formContents}
							<StandardButton
								cssClass = 'sb-1'
								type = 'submit'
								id = 'runSearch'
								name = 'verify & calculate'
							/>
						</form>
					</div>
					< VerificationBox
						content = {verificationBox}
					/>
				</div>
			</div>
		</div>
	);
}