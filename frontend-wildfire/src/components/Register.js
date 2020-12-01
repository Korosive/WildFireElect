import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

class Register extends Component {
	constructor() {
		super();
		this.state = {email: '', username: '', password:'', retype: '',success: false, status: '', role: 'USER', loggedIn: false};
		this.changeType = this.changeType.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleRetype = this.handleRetype.bind(this);
		this.handleCreateAccount = this.handleCreateAccount.bind(this);
	}

	conmponentDidMount() {
		document.title = "Register Account";
		if (cookie.load("loggedIn")) {
			this.setState({loggedIn: true});
		}
	}

	handleEmailChange = (e) => {
		e.preventDefault();
		this.setState({email: e.target.value});
	}

	handleUsernameChange = (e) => {
		e.preventDefault();
		this.setState({username: e.target.value});
	}

	handlePasswordChange = (e) => {
		e.preventDefault();
		this.setState({password: e.target.value});
	}

	handleRetype = (e) => {
		e.preventDefault();
		this.setState({retype: e.target.value});
	}

	handleCreateAccount = (e) => {
		e.preventDefault();
		const terms = document.getElementById("termsandconditions").checked;
		const inpUsername = this.state.username;
		const inpPassword = this.state.password;
		const inpEmail = this.state.email;
		const inpRetype = this.state.retype;
		if (terms) {
			if (inpUsername && inpPassword && inpEmail && inpRetype) {
				if (inpPassword === inpRetype) {
					axios.post("/api/profile/add", {
						email: inpEmail,
						username: inpUsername,
						password: inpPassword,
						role: this.state.role
					}).then(response => {
						const data = response.data;
						if (data.result) {
							this.setState({success: true});
						} else {
							this.setState({status: data.message});
						}
					}).catch(error => {
						this.setState({status: error.message});
					});
				} else {
					this.setState({status: "Passwords do not match."});
				}
			} else {
				this.setState({status: "Input has been left empty. Please try again."});
			}
		} else {
			this.setState({status: "Terms and conditions must be accepted first."});
		}
		
	}

	changeType = (e) => {
		e.preventDefault();
		var password = document.getElementById("inpPassword");
		if (password.type === "password") {
			password.type = "text";
		} else {
			password.type = "password";
		}
	}

	render() {
		if (this.state.loggedIn) {
			return(<Redirect to={{
				pathname: document.referrer,
				state: {
					message: "Already logged in"
				}
			}} />);
		}

		if (this.state.success) {
			return(<Redirect to={{
				pathname: "/login",
				state: {
					message: "Registeration successful."
				}
			}} />);
		}

		return(
			<Fragment>
				{this.state.status &&
					<div className="alert alert-danger alert-dismissible fade show" role="alert">
 						<strong>{this.state.status}</strong>
 					 	<button type="button" className="close" data-dismiss="alert" aria-label="Close">
    						<span aria-hidden="true">&times;</span>
  						</button>
					</div>
				}
				<div className="card">
					<h1 className="card-header text-center">Register An Account</h1>
					<div className="card-body">
						<form>
							<div className="form-group mx-5">
								<input type="email"
									value={this.state.email}
									onChange={this.handleEmailChange}
									placeholder="Email"
									className="form-control"
								/>
							</div>
							<div className="form-group mx-5">
								<input type="text"
									value={this.state.username}
									onChange={this.handleUsernameChange}
									placeholder="Username..."
									className="form-control"
								/>
							</div>
							<div className="form-group mx-5">
								<input type="password"
									id="inpPassword"
									value={this.state.password}
									onChange={this.handlePasswordChange}
									placeholder="Password..."
									className="form-control"
								/>
								<small>Password must have more than 8 characters</small>
							</div>
							<div className="form-group mx-5">
								<input type="password"
									value={this.state.retype}
									onChange={this.handleRetype}
									placeholder="Retype Password"
									className="form-control"
								/>
							</div>
							<div className="form-check form-check-inline mx-5">
								<input type="checkbox"
									className="m-1 form-check-input"
									id="showPassword"
									onClick={this.changeType}
								/>
								<label htmlFor="showPassword"
									className="form-check-label"
								>Show Password</label>
							</div> <br/>
							<div className="form-check form-check-inline mx-5">
								<input type="checkbox"
									className="m-1 form-check-input"
									id="termsandconditions"
								/>
								<label htmlFor="termsandconditions"
									className="form-check-label"
								>Agree to our terms & conditions</label>
							</div> <br/>
							<input type="submit"
								value="Create Account"
								className="btn btn-primary mx-5"
								onClick={this.handleCreateAccount}
							/>
						</form>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Register;