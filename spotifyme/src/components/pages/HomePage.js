import React, { useState } from "react";
import { LibraryAddCheck, ShutterSpeed, Speed } from "@mui/icons-material";
import { Stack } from "@mui/material";

import { SpotifyAuthListener } from "react-spotify-auth";
import Cookies from "js-cookie";
import SpotifyWebApi from "spotify-web-api-node";

import { spotifyGreen } from "../Button";
import ICard from "../ItemCard";
import GeneralPage from "./GeneralPage";

export default function HomePage() {
	const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

	// To remove previously entered times.
	localStorage.removeItem("time");
	localStorage.removeItem("val");
	localStorage.removeItem("tempo");
	localStorage.removeItem("focus");
	localStorage.removeItem("features");

	let spotifyApi = new SpotifyWebApi({
		accessToken: token,
	});

	const tokenHandler = (token) => {
		spotifyApi.setAccessToken(token);
		setToken(token);
	};

	return (
		<>
			<SpotifyAuthListener onAccessToken={(token) => tokenHandler(token)} />
			<GeneralPage link="/">
				{/* Stack is the different playlist types */}
				<Stack
					direction="column"
					spacing={2}
					style={{ width: "50%", transform: "translate(50%, 10%)" }}>
					<ICard
						link="/timepage"
						head="Time Playlist"
						text="Make a playlist that runs for a given time based on your recent top songs."
						icon={
							<ShutterSpeed
								style={{ width: "200px", height: "128px", color: spotifyGreen }}
							/>
						}></ICard>
					<ICard
						link="/featurepage"
						head="Feature Playlist"
						text="Make a playlist based on given time and specified features."
						icon={
							<LibraryAddCheck
								style={{ width: "200px", height: "128px", color: spotifyGreen }}
							/>
						}></ICard>
					<ICard
						link="/statpage"
						head="View Statistic"
						text="View top tracks and artists based on your listening statistics."
						icon={
							<Speed
								style={{ width: "200px", height: "128px", color: spotifyGreen }}
							/>
						}></ICard>
				</Stack>
			</GeneralPage>
		</>
	);
}
