import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Home extends Component {
	constructor() {
		super();
		this.state = {products: []};
	}

	componentDidMount() {
		axios.get("/api/products/get/list")
			.then(response => {
				const data = response.data;
				this.setState({products: data});
			}).catch(error => {
				console.log(error);
				this.setState({status: "error"});
			});
	}

	render() {
		var mappedList;
		if (this.state.products.length) {
			mappedList = this.state.products.map((product, i) => (
				<div key={i} className="media m-2 bg-light border border-primary p-1">
					<img 
						className="mr-3"
						src={"data:image/jpeg;base64," + product.image} 
						alt={product.name} />
					<div className="media-body">
						<h5 className="mt-0">{product.name}</h5>
						<p>{product.description}</p>
						<p>${product.price}</p>
						<p>{product.addDate}</p>
						<button type="button" className="btn btn-secondary">
							<Link className="text-dark" to={"/product/" + product.productID}>View</Link>
						</button>
					</div>
				</div>
			));
		} else {
			mappedList = <p>No products</p>;
		}
		
		return(
			<Fragment>
				<div id="carouselHome" className="carousel slide" data-ride="carousel">
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img src="" alt="banner" />
						</div>
					</div>
				</div>
				<div className="card">
					<h1 className="card-header text-center">Products</h1>
					<div className="card-body">
						{mappedList}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Home;