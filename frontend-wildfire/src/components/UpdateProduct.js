import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

class UpdateProduct extends Component {
	constructor() {
		super();
		this.state = {
			id: "",
			currentImage: "",
			newImage: "",
			name: '', 
			description: '', 
			price: '', 
			features: [], 
			inpFeatureText: '',
			notLoggedIn: false,
			invalid: false
		};
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleFeatureChange = this.handleFeatureChange.bind(this);
		this.handleFeatureAdd = this.handleFeatureAdd.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;

		if (cookie.load("loggedIn") && id) {
			const role = cookie.load("id");
			if (role === "USER") {
				this.setState({invalid: true});
			} else {
				axios.get("/api/products/get/" + id)
					.then(response => {
						const data = response.data;
						this.setState({
							id: id,
							currentImage: data.image,
							name: data.name,
							description: data.description,
							price: data.price,
							features: data.features
						});
					}).catch(error => {
						this.setState({error: true});
					});
			}
		} else {
			this.setState({notLoggedIn: true});
		}
	}

	handleNameChange = (e) => {this.setState({name: e.target.value});}

	handleDescriptionChange = (e) => {this.setState({description: e.target.value})};

	handleFeatureChange = (e) => {this.setState({inpFeatureText: e.target.value});}

	handlePriceChange = (e) => {this.setState({price: e.target.value});}

	handleFeatureAdd = (e) => {
		e.preventDefault();
		const feature = this.state.inpFeatureText;
		const capitalised = feature.charAt(0).toUpperCase() + feature.slice(1);
		const list = this.state.features;
		if (capitalised && !list.includes(capitalised)) {
			this.setState(prevState => ({
				features: [...prevState.features, capitalised],
				inpFeatureText: ''
			}));
		}
	}
	handleImageChange = (e) => {
		let file = e.target.files[0];
		const reader = new FileReader();

		reader.addEventListener("load", () => {
			this.setState({newImage: reader.result.split(',')[1]});
		}, false);
		if (file) {
			reader.readAsDataURL(file);
		}
	}

	handleDeleteFeature = (e, index) => {
		var list = [...this.state.features];
		list.splice(index, 1);
		this.setState({features: list});
	}

	handleUpdate = (e) => {
		e.preventDefault();
		const image = this.state.newImage;
		const name = this.state.name;
		const description = this.state.description;
		const features = Array.of(this.state.features);
		const price = this.state.price;
		if (image && name && description && features && price) {
			axios.put("/api/products/update", {
				id: this.props.match.params.id,
				image: image,
				name: name,
				description: description,
				features: features,
				price: price,
			}).then(response => {
				const data = response.data;
				if (data.result) {
					return(<Redirect to={{
						pathname: "/products/manage",
						state: {
							error: "133",
							message: data.message
						}
					}}/>);
				} else {
					this.setState({status: "Problem encountered"});
				}
			}).catch(error => {
				console.log(error);
				this.setState({status: "error"});
			});
		} else {
			this.setState({status: "empty"});
		}
	}

	render() {
		var msgError;
		if (this.state.error) {
			if (this.state.error === "empty") {
				msgError = <Fragment>
					<div class="alert alert-warning alert-dismissible fade show" role="alert">
  						<strong>Empty Input. Please try again.</strong>
  						<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    						<span aria-hidden="true">&times;</span>
  						</button>
					</div>
				</Fragment>
			} else if (this.state.error === "error") {
				msgError = <Fragment>
					<div class="alert alert-warning alert-dismissible fade show" role="alert">
  						<strong>Error in updating product. Please try again.</strong>
  						<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    						<span aria-hidden="true">&times;</span>
  						</button>
					</div>
				</Fragment>
			}
		}
		return(
			<Fragment>
				{msgError}
				<div className="card">
					<h1 className="card-header text-center">Edit Product</h1>
					<div className="card-body">
						<form className="m-5">
							<label>Current Image:</label>
							<img src={"data:image/jpeg;base64," + this.state.currentImage} width="200" alt="Preview" />
							<label>New Image:</label>
							<img src={"data:image/jpeg;base64," + this.state.newImage} width="200" alt="Preview" />
					
							<div className="form-group row">
								<label htmlFor="image">Image:</label>
								<input type="file"
									id="inpImage"
									onChange={this.handleImageChange}
									className="form-control"
									accept=".jpeg, .png, jpg"
								/>
							</div>
							<div className="form-group row">
								<label htmlFor="name">Name:</label>
								<input type="text"
									id="name"
									value={this.state.name}
									onChange={this.handleNameChange}
									className="form-control"
								/>
							</div>
							<div className="form-group row">
								<label htmlFor="description">Description:</label>
								<input type="text"
									id="description"
									value={this.state.description}
									onChange={this.handleDescriptionChange}
									className="form-control"
								/>
							</div>
							<h5>Features:</h5>
							<ul>
								{this.state.features.map((item, i) => (
									<li key={i} onClick={this.handleDeleteFeature.bind(this, i)}>{item}</li>
								))}
							</ul>
							<div className="form-group row">
								<label htmlFor="addFeature">Add Feature:</label>
								<input type="text"
									value={this.state.inpFeatureText}
									onChange={this.handleFeatureChange}
									className="form-control"
								/>
								<button type="button" className="btn btn-primary m-3" onClick={this.handleFeatureAdd}>
									Add to list
								</button>
							</div>
							<div className="form-group row">
								<label htmlFor="price">Price:</label>
								<input type="number"
									id="price"
									step="0.01"
									min="0"
									value={this.state.price}
									onChange={this.handlePriceChange}
									className="form-control"
								/>
							</div>
							<button type="button" onClick={this.handleUpdate} className="btn btn-primary">
								Confirm Update
							</button>
						</form>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default UpdateProduct;