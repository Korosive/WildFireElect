import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

class Login extends Component {
	constructor() {
		super();
		this.state = {username: '', password: '', status: '', loginSuccess: false, redirect: false};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.changeType = this.changeType.bind(this);
	}

	componentDidMount() {
		if (cookie.load('loggedIn')) {
			this.setState({redirect: true});
		}
	}

	handleUsernameChange = (e) => {
		e.preventDefault();
		this.setState({username: e.target.value});
	}

	handlePasswordChange = (e) => {
		e.preventDefault();
		this.setState({password: e.target.value});
	}

	handleLogin(e) {
		e.preventDefault();
		if (this.state.username && this.state.password) {
			axios.post("/api/profile/login", {
				username: this.state.username,
				password: this.state.password
			}).then(response => {
				const data = response.data;
				if (data.result) {
					cookie.save('loggedIn', true, {path: '/'});
					cookie.save('id', data.id, {path: '/'});
					cookie.save('username', this.state.username, {path: '/'});
					cookie.save('role', data.role, {path: '/'});
					this.setState({loginSuccess: true, id: data.id});

				} else {
					this.setState({status: data.message});
				}
			}).catch(error => {
				this.setState({status: "Error with login process. Please try again."});
			});
		} else {
			this.setState({status: "Input has been left empty. Please try again."});
		}	
	}

	changeType = (e) => {
		var password = document.getElementById("inpPassword");
		if (password.type === "password") {
			password.type = "text";
		} else {
			password.type = "password";
		}
	}


	render() {
		if (this.state.loginSuccess) {
			window.location.reload(false);
			return(<Redirect to={{
				pathname: "/user/profile/" + this.state.id,
				state: {
					message: "Successfully logged in."
				}
			}} />);
		}

		if (this.state.redirect) {
			return(<Redirect to={{
				pathname: "/",
				state: {
					message: "Already logged in"
				}
			}}/>)
		}

		return(
			<Fragment>
				{this.state.status &&
					<div class="alert alert-danger alert-dismissible fade show" role="alert">
 						<strong>{this.state.status}</strong>
 					 	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    						<span aria-hidden="true">&times;</span>
  						</button>
					</div>
				}

				<div className="card">
					<h1 className="card-header text-center">Login</h1>
					<div className="card-body">
						<form>
							<div className="form-group mx-5">
								<input type="text"
									id="inpUsername"
									value={this.state.username}
									onChange={this.handleUsernameChange}
									placeholder="Username"
									className="form-control"
								/>
							</div>
							<div className="form-group mx-5">
								<input type="password"
									id="inpPassword"
									value={this.state.password}
									onChange={this.handlePasswordChange}
									placeholder="Password"
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
							<input type="submit"
								value="Login"
								className="btn btn-primary mx-5"
								onClick={this.handleLogin}
							/>
						</form>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Login;