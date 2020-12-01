import React, {Component, Fragment} from 'react';

class Info extends Component {
	render() {
		return(
			<Fragment>
				<div className="card">
					<h1 className="card-header text-center">About Us</h1>
					<div className="card-body">
						<p className="lead">We are a little corner-shop that sells party supplies. 
						Our main product stands out because of its superior quality and polish. 
						Our target audience is teens. 
						We want to convey a sense of importance, while at the same time being calm.</p>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Info;