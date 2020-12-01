import React from 'react';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

const Logout = () => {
	cookie.remove('loggedIn', {path: '/'});
	cookie.remove('id', {path: '/'});
	cookie.remove('username', {path: '/'});
	cookie.remove("role", {path: '/'});
	window.location.reload(false);
	return(<Redirect to={{
		pathname: "/",
		state: {
			message: 'Successfully logged out.'
		}
	}}/>);
}

export default Logout;