import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

class UpdateAccount extends Component {
	constructor() {
		super();
		this.state = {
			id: '',
			username: '', 
			email: '', 
			password: '',
			retype: '',
			invalid: false,
			success: false,
			notLoggedIn: false,
			error: false,
			empty: false,
			mismatch: false
		};
		this.changeType = this.changeType.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePassswordChange = this.handlePassswordChange.bind(this);
		this.handleRetypeChange = this.handleRetypeChange.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		if (cookie.load("loggedIn")) {
			if (id === cookie.load("id")) {
				axios.get("/api/profile/" + id)
					.then(response => {
						const data = response.data;
						this.setState({
							id: id,
							username: data.username,
							email: data.email,
						});
					}).catch(error => {
						this.setState({error: true});
					})
			} else {
				this.setState({invalid: true});
			}
		} else {
			this.setState({notLoggedIn: true});
		}
	}

	handleUsernameChange = (e) => {
		e.preventDefault();
		this.setState({username: e.target.value});
	}

	handleEmailChange = (e) => {
		e.preventDefault();
		this.setState({email: e.target.value});
	}

	handlePassswordChange = (e) => {
		e.preventDefault();
		this.setState({password: e.target.value});
	}

	handleRetypeChange = (e) => {
		e.preventDefault();
		this.setState({retype: e.target.value});
	}

	handleUpdate = (e) => {
		e.preventDefault();
		const username = this.state.username;
		const password = this.state.password;
		const email = this.state.email; 
		const retype = this.state.retype;

		if (username && email && password && retype) {
			if (retype === password) {
				axios.put("/api/profile/update", {
					user_id: this.state.id,
					username: username,
					email: email,
					password: password
				}).then(response => {
					const data = response.data;
					if (data.result) {
						this.setState({success: true});
					}
				}).catch(error => {
					this.setState({error: true});
				});
			}
			
		}
	}

	changeType = (e) => {
		e.preventDefault();
		var inpPassword = document.getElementById("newPassword");

		if (inpPassword.type === "password") {
			inpPassword.type = "text";
		} else {
			inpPassword.type = "password";
		}
	}

	render() {
		if (this.state.success) {
			return(<Redirect to={{
				pathname: "/profile/" + cookie.load("id"),
				state: {
					message: "Sucessfully updated account."
				}
			}}/>);
		}

		if (this.state.invalid) {
			return(<Redirect to={{
				pathname: "/profile/" + cookie.load("id"),
				state: {
					message: "Invalid access"
				}
			}} />);
		}

		if (this.state.notLoggedIn) {
			return(<Redirect to={{
				pathname: "/login",
				state: {
					message: "Please login first."
				}
			}} />);
		}

		return(
			<Fragment>
				<div className="card">
					<h1 className="card-header text-center">Update Account</h1>
					<div className="card-body">
						<form className="m-5">
							<div className="form-group row">
								<label htmlFor="newUsername">Enter a new username:</label>
								<input type="text"
									id="newUsername"
									value={this.state.username}
									onChange={this.handleUsernameChange}
									className="form-control"
								/>
							</div>
							<div className="form-group row">
								<label htmlFor="newEmail">Email:</label>
								<input type="email"
									id="newEmail"
									value={this.state.email}
									onChange={this.handleEmailChange}
									className="form-control"
								/>
							</div>
							<div className="form-group row">
								<label htmlFor="newPassword">New Password:</label>
								<input type="text"
									id="newPassword"
									value={this.state.password}
									onChange={this.handlePassswordChange}
									className="form-control"
								/>
							</div>
							<div className="form-check">
								<input type="checkbox"
									id="showPassword"
									value="Show Password"
									onClick={this.changeType}
									className="form-check-input"
								/>
								<label htmlFor="showPassword" className="form-check-label">
									Show Password
								</label>	
							</div>
							<div className="form-group row">
								<label htmlFor="newPassword">Retype New Password:</label>
								<input type="password"
									id="retypePassword"
									value={this.state.retype}
									onChange={this.handleRetypeChange}
									className="form-control"
								/>
							</div>
							<input type="submit"
								className="btn btn-primary"
								value="Update Account Details"
								onClick={this.handleUpdate}
							/>
						</form>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default UpdateAccount;