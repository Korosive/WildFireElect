import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router-dom';
import React, {Component} from 'react';

class DeleteAccount extends Component {
	constructor() {
		super();
		this.state = {success: false, error: false};
	}
	componentDidMount(props) {
		const sessionID = cookie.load("id");
		if (sessionID) {
			axios.delete("/api/users/delete/" + cookie.load("id"))
				.then(response => {
					cookie.remove('loggedIn', {path: '/'});
					cookie.remove('id', {path: '/'});
					cookie.remove('username', {path: '/'});
					this.setState({success: true});
				}).catch(error => {
					this.setState({error: true});
				});
		}
	}

	render() {
		if (this.state.success) {
			return(<Redirect to={{
				pathname: "/",
				state: {
					message: "Successfully disabled account."
				}
			}} />);
		} else if (this.state.error) {
			return(<Redirect to={{
				pathname: "/user/profile/" + cookie.load("id"),
				state: {
					message: "Unable to disable account"
				}
			}} />);
		} else {
			return(<Redirect to={{
				pathname: "/user/profile/" + cookie.load("id"),
				state: {
					message: "Error in disable account"
				}
			}} />);
		}
	}
}

export default DeleteAccount;