import React from 'react';

export const IPCOtherTermsBox  = (props) => {
	let {assumptions, onChange} = props;
	return(
		<div className = 'ipc-other-terms'>
			<div className = 'term-container'>
				<div className = 'show-inputs' title = 'financing terms'>
					<i className="fa fa-university" aria-hidden="true">
					</i>
					<div className = 'terms-form-container'>
						<form>
							<input
								className = ''
								type='text'
								id='firstInput'
								data-key = ''
								data-request = ''
								data-section = ''
								value = ''
								placeholder = ''
							/>
							<label htmlFor = 'firstInput'>
								<span className = 'label-span'>here's the label</span>
							</label>
							<input
								className = ''
								type='text'
								id='firstInput'
								data-key = ''
								data-request = ''
								data-section = ''
								value = ''
								placeholder = ''
							/>
							<label htmlFor = 'firstInput'>
								<span className = 'label-span'>here's the label</span>
							</label>
							<input
								className = ''
								type='text'
								id='firstInput'
								data-key = ''
								data-request = ''
								data-section = ''
								value = ''
								placeholder = ''
							/>
							<label htmlFor = 'firstInput'>
								<span className = 'label-span'>here's the label</span>
							</label>
						</form>
					</div>
				</div>
			</div>
			<div className = 'term-container'>
				<div className = 'show-inputs' title = 'other assumptions'>
					<i className="fa fa-check-square-o" aria-hidden="true">
					</i>
				</div>
			</div>
		</div>
	);
}