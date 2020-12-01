import React, {Component, Fragment} from 'react';
import axios from 'axios';

class Product extends Component {
	constructor() {
		super();
		this.state = {image: '', name: '', description: '', features: [], price: '', quantity: 1};
	}

	componentDidMount() {
		const id = this.props.match.params.id;	
		axios.get("/api/products/get/" + id)
			.then(response => {
				const data = response.data;
				if (data) {
					this.setState({
						image: data.image,
						name: data.name,
						description: data.description,
						features: data.features,
						price: data.price
					});	
				} else {
					this.setState({status: 'invalid'});
				}
			}).catch(error => {
				console.log(error);
				this.setState({status: "error"});
			});
	}

	render() {
		const listFeatures = this.state.features.map((feature, i) => (
			<li key={i}>{feature}</li>
		));
		return(
			<Fragment>
				<div className="media m-2 bg-light border border-primary p-1">
					<img className="mr-3" src={"data:image/jpeg;base64," + this.state.image} alt='product' />
					<div className="media-body">
						<h1 className="display 4">{this.state.name}</h1>
						<p>{this.state.description}</p>
						<ul>
							{listFeatures}
						</ul>
						<p>${this.state.price}</p>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Product;