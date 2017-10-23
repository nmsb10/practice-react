import React from 'react';
import { Link } from 'react-router-dom';

export const LoginModal = (props) => {
	let {loginModal, loginForm, onClick, onChange, onSubmit} = props;
	return(
		<div className={loginModal.containerClass} id = 'modal-container' onClick = {onClick}>
			<div className={loginModal.animateClass} id = 'login-modal-content'>
				<span className="closeSpan" id = 'login-close-span'>&times;</span>
				<div className="modal-header">
					<span>welcome</span>
				</div>
				<div className="modal-body">
					<form id = 'welcome-login-form' onSubmit = {onSubmit}>
					{/*
						<label htmlFor = 'username'>
							<span>username | e-mail</span>
						</label>
					*/}
						<input
							type = 'text'
							id = 'username'
							value = {loginForm.username}
							placeholder = 'username'
							onChange = {onChange}
						/>
					{/*
						<label htmlFor = 'password'>
							<span>password</span>
						</label>
					*/}
						<input
							type = 'text'
							id = 'password'
							value = {loginForm.passwordHidden}
							placeholder = 'password'
							onChange = {onChange}
						/>
						<button
							type="submit"
							className=''
						>enter
						</button>
					</form>
				</div>
				<div className="modal-footer">
					<span><Link to = '/userpage'>click here to represent signing in...</Link>thank you</span>
				</div>
			</div>
		</div>
	);
}