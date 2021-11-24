import React, { useEffect } from 'react';
import axiosInstance from '../axios';
import Header from "./HeaderLogIn";


export default function SignUp() {

	useEffect(() => {
		localStorage.removeItem('token');
		axiosInstance.defaults.headers['Authorization'] = null;
	});
	return <div> <Header /> Logout Success</div>;
}
