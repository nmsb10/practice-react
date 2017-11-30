import React from 'react';
import { Link } from 'react-router-dom';
import { CloseButton } from './CloseButton';

export const LoginModal = (props) => {
	let {loginModal, loginForm, handleClick, onChange, onSubmit} = props;
	return(
		<div className={loginModal.containerClass} data-item-clicked = 'modal-container' onClick = {handleClick}>
			<div className={loginModal.animateClass} id = 'login-modal-content'>
				<CloseButton
					itemClicked = 'login-close'
					handleClick = ''
				/>
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
						NB: input type should be "password" for a password input
						(see below)
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
						<div className = 'visit'>
							<Link to = '/user'>visit without credentials</Link>
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<span>thank you</span>
				</div>
			</div>
		</div>
	);
}