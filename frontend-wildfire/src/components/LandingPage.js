import React, {Component, Fragment} from 'react';

class LandingPage extends Component {
	render() {
		return(
			<Fragment>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4 align-item-center">
							<h1 className="display 4">Best Quality Party Supplies at the Best Prices</h1>
							<p className="lead">
								Wild Fire Electronics
							</p>
						</div>
						<div className="col-md-4 align-item-center">
							<form>
								<h1 className="display 4">Subscribe To Our Newsletter</h1>
								<small>Our newsletter will keep you up to date with us!</small>
								<div class="form-group">
									<label htmlFor="inputEmail">Email Address:</label>
									<input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" />
									<small id="emailHelp" className="form-text text-muted">We'll never share your email</small>
								</div>
								<button type="submit" className="btn btn-primary">Subscribe</button>
							</form>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default LandingPage;