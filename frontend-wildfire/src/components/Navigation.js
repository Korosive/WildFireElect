import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';

class Navigation extends Component {
	constructor() {
		super();
		this.state = {loggedIn: false, role: ''};
	}

	componentDidMount() {
		if (cookie.load("loggedIn")) {
			this.setState({
				loggedIn: true,
				role: cookie.load("role"),
				id: cookie.load("id")
			});
		}
	}

	render() {
		var btnAccount;
		if (this.state.loggedIn) {
			if (this.state.role === "USER") {
				btnAccount = <Fragment>
					<li className="nav-item">
						<Link className="nav-link" to={"/profile/" + this.state.id}>Profile</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/logout">Logout</Link>
					</li>
				</Fragment>;
			} else {
				btnAccount = <Fragment>
					<li className="nav-item">
						<Link className="nav-link" to={"/profile/" + this.state.id}>Profile</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={"/manage-products"}>Manage Products</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/logout">Logout</Link>
					</li>
				</Fragment>;
			}
		} else {
			btnAccount = <Fragment>
				<li className="nav-item">
					<Link className="nav-link" to="/login">Login</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/register">Create an Account</Link>
				</li>
			</Fragment>;
		}

		return(
			<Fragment>
				<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary mb-5">
					<Link to="/" className="navbar-brand">Wild Fire Electronics</Link>
					<button 
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/blog">Blog</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/info">Info</Link>
							</li>
							{btnAccount}
						</ul>
					</div>
				</nav>
			</Fragment>
		);
	}
}

export default Navigation;