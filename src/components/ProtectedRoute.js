import React, { useState, useEffect, useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { SpotifyAuthListener } from "react-spotify-auth";
import SpotifyWebApi from "spotify-web-api-node";

export default function ProtectedRoute(props) {
	const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
	const [loading, setLoading] = useState(true);
	const [count, setCount] = useState(0);

	let spotifyApi = useMemo(
		() =>
			new SpotifyWebApi({
				accessToken: token,
			}),
		[token]
	);

	const tokenHandler = (token) => {
		spotifyApi.setAccessToken(token);
		setToken(token);
		setLoading(false);
	};

	useEffect(() => {
		if (token) {
			spotifyApi.setAccessToken(token);
			setLoading(false);
		}
		if (count <= 10) {
			setCount(count + 1);
		}
	}, [token, count, spotifyApi]);

	return (
		<>
			<SpotifyAuthListener
				localStorage
				onAccessToken={(token) => tokenHandler(token)}
			/>
			{!loading ? (
				token ? (
					props.children
				) : (
					<Navigate to="/" />
				)
			) : count > 10 ? (
				<Navigate to="/" />
			) : (
				<Outlet />
			)}
		</>
	);
}
