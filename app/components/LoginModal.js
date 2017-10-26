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
						<input
							type = 'text'
							id = 'password'
							value = {loginForm.passwordHidden}
							placeholder = 'password'
							onChange = {onChange}
						/>
					*/}
						<input
							type = 'password'
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
						<Link to = '/userpage'>visit without credentials</Link>
					</form>
				</div>
				<div className="modal-footer">
					<span>thank you</span>
				</div>
			</div>
		</div>
	);
}