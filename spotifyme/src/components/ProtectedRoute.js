import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute(props) {
	const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"));

	return token ? props.children : <Navigate to="/" />;
}
