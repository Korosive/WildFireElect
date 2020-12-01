import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

class Profile extends Component {
	constructor() {
		super();
		this.state = {email: '', username: '', registerDate: ''};
	}

	componentDidMount() {
		if (cookie.load("loggedIn")) {
			var sessionID = cookie.load("id");
			const paramID = this.props.match.params.id;

			if (sessionID === paramID) {
				axios.get("/api/profile/" + paramID)
					.then(response => {
						const data = response.data;
						this.setState({
							id: paramID,
							email: data.email,
							username: data.username,
							registerDate: data.register_date
						});
					}).catch(error => {
						console.log(error);
						this.setState({status: "Failed to retrieve profile"});
				});
			} else {
				this.setState({status: "Incorrect profile"});
			}
		} else {
			this.setState({status: "Not logged in"});
		}
	}

	render() {
		if (this.state.status) {
			return(<Redirect to={{
				pathname: document.referrer,
				state: {
					message: this.state.status
				}
			}}/>);
		}

		return(
			<Fragment>
				<div className="card">
					<h1 className="card-header text-center">Profile</h1>
					<div className="card-body">
						<div className="media">
							<div className="media-body">
								<p>Username: {this.state.username}</p>
								<p>Email: {this.state.email}</p>
								<p>Password is not shown for security purposes</p>
								<small>Account registered on: {this.state.registerDate}</small><br/>
								<button type="button" className="btn btn-primary">
									<Link to={"/update-user/" + this.state.id}>Update Account</Link>
								</button>
								<button type="button" className="btn btn-secondary">
									<Link to={"/delete/user" + this.state.id}>Disable Account</Link>
								</button>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Profile;