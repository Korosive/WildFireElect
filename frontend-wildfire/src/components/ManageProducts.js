import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

class ManageProducts extends Component {
	constructor() {
		super();
		this.state = {list: [], invalid: false, status: '', notLoggedIn: false};
	}

	componentDidMount() {
		if (cookie.load("loggedIn")) {
			if (cookie.load("role") === "USER") {
				this.setState({invalid: true});
			} else {
				axios.get("/api/products/get/list")
					.then(response => {
						const data = response.data;
						this.setState({list: data});
					}).catch(error => {
						this.setState({status: "Error in retrieving list."});
					});
			}
		} else {
			this.setState({notLoggedIn: true});
		}
	}

	render() {
		if (this.state.invalid) {
			return(<Redirect to={{
				pathname: "/",
				state: {
					message: "Invalid access"
				}
			}} />);
		}

		if (this.state.notLoggedIn) {
			return(<Redirect to={{
				pathname: "/user/login",
				state: {
					message: "Please login first."
				}
			}} />);
		}

		var list;

		if (Array.isArray(this.state.list) && this.state.list.length) {
			list = this.state.list.map((product, i) => (
				<div className="media m-3" key={i}>
					<img 
						className="mr-3"
						src={"data:image/jpeg;base64," + product.image} 
						alt={product.name} />
					<div className="media-body">
						<h5 className="mt-0">{product.name}</h5>
						<p>{product.description}</p>
						<p>${product.price}</p>
						<p>{product.addDate}</p>
						<button type="button" className="btn btn-primary m-2">
							<Link className="text-dark" to={"/product/" + product.productID}>View</Link>
						</button>
						<button type="button" className="btn btn-primary m-2">
							<Link className="text-dark" to={"/update-product/" + product.productID}>Update</Link>
						</button>
						<button type="button" className="btn btn-primary m-2">
							<Link className="text-dark" to={"/delete-product/" + product.productID}>Delete</Link>
						</button>
					</div>
				</div>
			))
		} else {
			list = <p>No products</p>
		}

		return(
			<Fragment>
				{this.state.status &&
					<div className="alert alert-danger alert-dismissible fade show" role="alert">
 						<strong>{this.state.status}</strong>
 					 	<button type="button" className="close" data-dismiss="alert" aria-label="Close">
    						<span aria-hidden="true">&times;</span>
  						</button>
					</div>
				}
				<div className="card">
					<h1 className="card-header text-center">Manage Products</h1>
					<div className="card-body">
						{list}
					</div>
				</div>
				<button type="button" className="btn btn-primary m-2">
					<Link className="text-dark" to="/add-product">Add Product</Link>
				</button>
			</Fragment>
		);
	}
}

export default ManageProducts;