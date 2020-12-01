import React, {Component, Fragment} from 'react';
import {Redirect}  from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

class AddProduct extends Component {
	constructor() {
		super();
		this.state = {image: '', name: '', description: '', featureList: [], feature: '', price: 0, invalid: false, success: false};
		this.handleImageChange = this.handleImageChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleFeatureChange = this.handleFeatureChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleAddFeature = this.handleAddFeature.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}

	componentDidMount() {
		if (cookie.load("loggedIn")) {
			const role = cookie.load("role");
			if (role === "USER") {
				this.setState({invalid: true});
			}
		} else {
			this.setState({invalid: true});
		}
	}

	handleImageChange = (e) => {
		let file = e.target.files[0];
		const reader = new FileReader();

		reader.addEventListener("load", () => {
			this.setState({image: reader.result.split(',')[1]});
		}, false);
		if (file) {
			reader.readAsDataURL(file);
		}
	}

	handleNameChange = (e) => {
		e.preventDefault();
		this.setState({name: e.target.value});
	}

	handleDescriptionChange = (e) => {
		e.preventDefault();
		this.setState({description: e.target.value});
	}

	handleFeatureChange = (e) => {
		e.preventDefault();
		this.setState({feature: e.target.value});
	}

	handlePriceChange = (e) => {
		e.preventDefault();
		this.setState({price: e.target.value});
	}

	handleAddFeature = (e) => {
		e.preventDefault();
		const feature = this.state.feature;
		const capitalised = feature.charAt(0).toUpperCase() + feature.slice(1);
		const list = this.state.featureList;
		if (capitalised && !list.includes(capitalised)) {
			this.setState(prevState => ({
				featureList: [...prevState.featureList, capitalised],
				feature: ''
			}));
		}
	}

	handleDeleteFeature = (e, index) => {
		var list = [...this.state.featureList];
		list.splice(index, 1);
		this.setState({featureList: list});
	}

	handleAdd = (e) => {
		e.preventDefault();
		const newImage = this.state.image;
		const newName = this.state.name;
		const newDescription = this.state.description;
		const newFeatures = Array.of(this.state.featureList);
		const newPrice = this.state.price;
		axios.post("/api/products/add", {
			image: newImage,
			name: newName,
			description: newDescription,
			feature: newFeatures,
			price: newPrice
		}).then(response => {
			const data = response.data;
			if (data) {
				this.setState({success: true});
			} else {
				this.setState({status: "Error in adding product."});
			}
		}).catch(error => {
			this.setState({status: "An error has occurred."});
		})
	}

	render() {
		if (this.state.invalid) {
			return (<Redirect to={{
				pathname: "/",
				state: {message: "Invalid access"}
			}}/>);
		}

		if (this.state.success) {
			return(<Redirect to={{
				pathname: "/manage-products",
				state: {message: "Successfully added product"}
			}}/>);
		}

		return(
			<Fragment>
				<div className="card">
					<h1 className="card-header text-center">Add Product</h1>
					<div className="card-body">
						<form className="m-5">
							<img src={"data:image/jpeg;base64," + this.state.image} width="200" alt="Preview" />
							<div className="form-group row">
								<label htmlFor="newImage">Image</label>
								<input type="file"
									id="newImage"
									onChange={this.handleImageChange}
									className="form-control"
								/>
							</div>
							<div className="form-group row">
								<label htmlFor="inpName">Name:</label>
								<input type="text"
									id="inpName"
									value={this.state.name}
									onChange={this.handleNameChange}
									className="form-control"
								/>
							</div>
							<div className="form-group row">
								<label htmlFor="inpDescrip">Description:</label>
								<textarea id="inpDescrip"
									value={this.state.description}
									onChange={this.handleDescriptionChange}
									className="form-control"
								/>
							</div>
							<h5>Features:</h5>
							<ul>
								{this.state.featureList.map((item, i) => (
									<li key={i} onClick={this.handleDeleteFeature.bind(this,i)}>{item}</li>
								))}
							</ul>
							<div className="form-group row">
								<label htmlFor="addfeature">Add Features:</label>
								<input type="text"
									id="addfeature"
									value={this.state.feature}
									onChange={this.handleFeatureChange}
									className="form-control"
								/>
								<button type="submit" className="btn btn-primary m-3" onClick={this.handleAddFeature}>
									Add Feature
								</button>
							</div>
							<div className="form-group row">
								<label htmlFor="inpPrice">Price:</label>
								<input type="number"
									step="0.01"
									min="0"
									value={this.state.price}
									onChange={this.handlePriceChange}
									className="form-control"
								/>
							</div>
							<input type="submit"
								value="Add Product"
								onClick={this.handleAdd}
								className="btn btn-primary"
							/>
						</form>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default AddProduct;