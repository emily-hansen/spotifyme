import React, { useLayoutEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Stack } from "@mui/material";
import { ColorButton, spotifyGreen, spotifyGreenDark } from "./Button";
import Cookies from "js-cookie";
import SpotifyWebApi from "spotify-web-api-node";

//TODO: Need to add functionallity for logging out of spotify
export default function Header(props) {
	// Values that have an easily-readable value are best to store as a cookie for now
	const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
	const [userName, setUserName] = useState(Cookies.get("currUser"));
	const [avatar, setAvatar] = useState(Cookies.get("avatarLink"));

	let spotifyApi = useMemo(() => {
		return new SpotifyWebApi({
			accessToken: token,
		});
	}, [token]);

	const tokenHandler = (token) => {
		spotifyApi.setAccessToken(token);
		setToken(token);
	};

	// This function get, sets, and creates Cookies for current User's username and avatar
	const getCurrUser = () => {
		spotifyApi.getMe((err, data) => {
			if (err) {
				console.error("Something went wrong");
			} else {
				console.log(data.body);

				let response = data.body.display_name;
				Cookies.set("currUserName", response);
				let imres = [];
				data.body.images.forEach(function (value, index) {
					imres.push(value.url);
				});

				Cookies.set("avatarLink", imres[0]);
				setAvatar(imres[0]);
				setUserName(response);
			}
		});
	};

	const signOut = () => {
		const url = "https://accounts.spotify.com/en/logout";
		const spotifyLogoutWindow = window.open(
			url,
			"Spotify Logout",
			"width=700,height=500,top=40,left=40"
		);
		setTimeout(() => spotifyLogoutWindow.close(), 2000);
		document.cookie.split(";").forEach((c) => {
			document.cookie = c
				.replace(/^ +/, "")
				.replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
		});
		navigator("/");
	};

	useLayoutEffect(getCurrUser, [spotifyApi]);

	const navigator = useNavigate();
	return (
		<div
			style={{
				backgroundColor: "#000",
				height: "50px",
				width: "100vw",
			}}>
			<ColorButton
				style={{
					position: "relative",
					top: "50%",
					transform: "translate(20%, -50%)",
					paddingLeft: "30px",
					paddingRight: "30px",
				}}
				onClick={() => navigator(props.link)}>
				Home
			</ColorButton>
			<Stack
				direction="row"
				spacing={2}
				style={{
					float: "right",
					color: "#fff",
					display: "flex",
					alignItems: "center",
					transform: "translate(-10%, 15%)",
				}}>
				<Avatar
					src={avatar}
					style={{
						backgroundColor: `${spotifyGreen}`,
						"&:hover": {
							backgroundColor: `${spotifyGreenDark}`,
						}, // need to change so hover animation works
					}}></Avatar>

				<span style={{ fontSize: "20px" }}>{userName}</span>
				<ColorButton
					style={{
						paddingLeft: "20px",
						paddingRight: "20px",
					}}
					onClick={() => signOut()}>
					Sign Out
				</ColorButton>
			</Stack>
		</div>
	);
}
