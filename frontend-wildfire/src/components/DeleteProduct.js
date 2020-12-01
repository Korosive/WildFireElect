import React, {Component} from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class DeleteProduct extends Component {
	constructor() {
		super();
		this.state = {success: false, error: false, access: false};
	}

	componentDidMount() {
		if (cookie.load("loggedIn")) {
			const role = cookie.load("role");
			if (role !== "USER") {
				const id = this.props.match.params.id;
				axios.delete("/api/products/delete/" + id)
				.then(response => {
					const data = response.data;
					if (data.result) {
						this.setState({success: true});
					} else {
						this.setState({error: true});
					}
				}).catch(error => {
					this.setState({error: true});
				});
			} else {
				this.setState({access: true});
			}
		} else {
			this.setState({access: true});
		}
	}

	render() {
		if (this.state.success) {
			return(<Redirect to={{
				pathname: "/manage-products",
				state: {
					message: "Successfully deleted product."
				}
			}} />);
		}

		if (this.state.error) {
			return(<Redirect to={{
				pathname:"/manage-products",
				state: {
					message: "Error in deleting product."
				}
			}}/>);
		}

		if (this.state.error) {
			return(<Redirect to={{
				pathname: "/",
				state: {
					message: "Invalid access."
				}
			}}/>);
		}

		return <h1>Bruh</h1>;
	}
}

export default DeleteProduct;