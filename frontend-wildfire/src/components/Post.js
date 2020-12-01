import React, {Component, Fragment} from 'react';
import axios from 'axios';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postID: '',
			title: '',
			postDate: '',
			editDate: '',
			post: ''
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;	
		axios.get("/api/blog/post/" + id)
			.then(response => {
				const data = response.data;
				if (data) {
					this.setState({
						postID: id,
						title: data.title,
						postDate: data.postDate,
						editDate: data.editDate,
						post: data.post
					});
				} else {
					this.setState({status: "invalid"});
				}
			}).catch(error => {
				console.log(error);
				this.setState({status: "error"});
			});
	}

	render() {
		const byline = "Wild Fire Team | Posted: " + this.state.postDate + " | Last Updated: " + this.state.editDate;
		return(
			<Fragment>
				<div className="media m-2 bg-light border border-primary p-1">
					<div className="media-body">
						<h1>{this.state.title}</h1>
						<small>{byline}</small>
						<p>{this.state.post}</p>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Post;