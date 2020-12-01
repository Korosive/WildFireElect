import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Blog extends Component {
	constructor() {
		super();
		this.state = {list: [], role: ''};
	}

	componentDidMount() {
		document.title = "Blog";
		axios.get("/api/blog/post/list")
			.then(response => {
				const data = response.data;
				if (Array.isArray(data) && data.length) {
					this.setState({list: data});
				} else {
					this.setState({status: "empty"});
				}
			}).catch(error => {
				console.log(error);
				this.setState({status: "error"});
			});
	}

	render() {
		var list;
		if (this.state.list.length) {
			list = this.state.list.map((post, i) => (
				<div key={i} className="media bg-light m-2 p-2">
					<div className="media-body">
						<h1>{post.title}</h1>
						<hr/>
						<small>{"Wild Fire Team | Posted: " + post.postDate + " | Last Updated: " + post.editDate}</small>
						<p>{post.post}</p>
						<button type="button" className="btn btn-secondary">
							<Link className="text-dark" to={"/blog/post/" + post.postID}>View</Link>
						</button>
					</div>
				</div>));
		} else {
			list = <p>No posts</p>;
		}
		return(
			<Fragment>
				<div className="card">
					<h1 className="card-header text-center">Wild Fire Blog</h1>
					<div className="card-header">
						{list}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Blog;