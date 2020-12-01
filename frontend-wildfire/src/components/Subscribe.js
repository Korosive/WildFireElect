import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

class Subscribe extends Component {
	constructor() {
		super();
		this.state = {email: ''};
	}

	handleEmailChange(e) {
		this.setState({email: e.target.value});
	}

	handleSubmit() {
		if (this.state.email) {
			//Popout/Alert window
			this.setState({email: ''});
		}
	}

	render() {
		return(
			<Fragment>
				<div className="container-fluid fixed-bottom bg-primary">
					<div className="row">
						<div className="col-md-4 align-item-center">
							<form className="form-inline my-3">
								<label htmlFor="email" className="m-2">Subscribe to our newsletter:</label>
								<input 
									id="email"
									type="email" 
									value={this.state.email}
									onChange={this.handleEmailChange}
									className="m-2"
								/>
								<input 
									type="submit" 
									value="Submit email" 
									onClick={this.handleSubmit}
									className="btn btn-secondary my-2 my-sm-0 m-2"
								/>
							</form>
						</div>
						<div className="col-md-4 mt-1">
							<h5 className="display 4">Company</h5>
							<Link to="/info">About Us</Link>
						</div>
						<div className="col-md-4 mt-1">
							<h5 className="display 4">Customer Service</h5>
							<a href="/">Contact Us</a><br/>
							<a href="/">My Account</a>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Subscribe;