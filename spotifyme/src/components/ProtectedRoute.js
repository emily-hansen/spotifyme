import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute(props) {
	const getToken = async () => {
		return Cookies.get("spotifyAuthToken");
	};

	return getToken() ? props.children : <Navigate to="/" />;
}
