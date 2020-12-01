import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home';
import Error from './components/Error';
import Product from './components/Product';
import Blog from './components/Blog';
import Info from './components/Info';
import Navigation from './components/Navigation';
import Values from './components/Values';
import Post from './components/Post';
import Subscribe from './components/Subscribe';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import ManageProducts from './components/ManageProducts';
import UpdateProduct from './components/UpdateProduct';
import AddProduct from './components/AddProduct';
import DeleteProduct from './components/DeleteProduct';
import UpdateAccount from './components/UpdateAccount';
import DeleteAccount from './components/DeleteAccount';
import Logout from './components/Logout';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles/style.css';

const routing = (
	<Router>
		<Navigation />
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/product/:id" component={Product} />
			<Route exact path="/manage-products" component={ManageProducts} />
			<Route path="/update-product/:id" component={UpdateProduct}/>
			<Route exact path="/add-product" component={AddProduct} />
			<Route path="/delete-product/:id" component={DeleteProduct} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register}/>
			<Route path="/profile/:id" component={Profile} />
			<Route path="/update-user/:id" component={UpdateAccount}/>
			<Route path="/delete-user/:id" component={DeleteAccount}/>
			<Route exact path="/party-supplies" component={LandingPage} />
			<Route exact path="/blog" component={Blog} />
			<Route path="/post/:id" component={Post}/>
			<Route exact path="/info" component={Info} />
			<Route exact path="/values" component={Values} />
			<Route exact path="/logout" component={Logout} />
			<Route component={Error} />
		</Switch>
		<Subscribe />
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
