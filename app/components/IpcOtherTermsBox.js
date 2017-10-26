import React from 'react';
import {OtherTermsForm} from './OtherTermsForm';

export const IPCOtherTermsBox  = (props) => {
	let {assumptions, onChange} = props;
	return(
		<div className = 'ipc-other-terms'>
			<div className = 'term-container'>
				<div className = 'show-inputs' title = 'financing terms'>
					<i className="fa fa-university" aria-hidden="true">
					</i>
					<OtherTermsForm
						terms = {assumptions.financing}
						section = 'financing'
						title = 'financing terms'
						onChange = {onChange}
					/>
				</div>
			</div>
			<div className = 'term-container'>
				<div className = 'show-inputs' title = 'other assumptions'>
					<i className="fa fa-check-square-o" aria-hidden="true">
					</i>
					<OtherTermsForm
						terms = {assumptions.other}
						section = 'other'
						title = 'other assumptions'
						onChange = {onChange}
					/>
				</div>
			</div>
		</div>
	);
}