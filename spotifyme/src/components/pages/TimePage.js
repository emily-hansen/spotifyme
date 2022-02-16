import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import SpotifyWebApi from "spotify-web-api-node";

import GeneralPage from "./GeneralPage";
import ICard from "../ItemCard";
import { ColorButton } from "../Button";
import { timeToMs } from "../timeToMs";

const color = "#FFFFFF";

export default function TimePage() {
	const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

	let spotifyApi = new SpotifyWebApi({
		accessToken: token,
	});

	const tokenHandler = (token) => {
		spotifyApi.setAccessToken(token);
		setToken(token);
	};

	const [value, setValue] = React.useState("HH:MM:SS");

	const navigator = useNavigate();

	return (
		<GeneralPage link="/homepage">
			<div>
				{token ? console.log("Access Token Validated!") : navigator("/")}
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					height: "calc(100vh - 50px)",
					width: "100vw",
				}}>
				<Stack
					direction="column"
					spacing={2}
					style={{
						alignItems: "center",
					}}>
					<ICard
						nohome="true"
						text="Make a playlist that runs for a given time based on your recently listened."
						style={{
							width: "500px",
							height: "200px",
							justifyContent: "center",
						}}>
						<Stack
							direction="row"
							spacing={2}
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Typography variant="h5" sx={{ color: color }}>
								Time:
							</Typography>
							<TextField
								sx={{
									backgroundColor: color,
									borderRadius: "5px",
								}}
								placeholder="00:00:00"
								value={value}
								onChange={(e) => {
									let newValue = e.target.value.replace(/[^0-9]/g, "");

									for (let i = 0; i < newValue.length; i++) {
										if (newValue[i] === "0") {
											newValue = newValue.slice(i + 1);
											i--;
										} else {
											break;
										}
									}

									if (newValue.length === 0) {
										newValue = "HH:MM:SS";
									} else if (newValue.length === 1) {
										newValue = "HHMM0" + newValue;
									} else if (newValue.length === 2) {
										newValue = "HHMM" + newValue;
									} else if (newValue.length === 3) {
										newValue = "HH0" + newValue;
									} else if (newValue.length === 4) {
										newValue = "HH" + newValue;
									} else if (newValue.length === 5) {
										newValue = "0" + newValue;
									} else if (newValue.length === 6) {
										newValue = newValue;
									} else {
										newValue = newValue.slice(0, 6);
									}

									newValue = newValue.replace(/^(\w{2})(\w{2})/, "$1:$2:");
									setValue(newValue);
								}}
							/>
						</Stack>
					</ICard>
					<ColorButton
						style={{ width: "150px" }}
						onClick={() => console.log(timeToMs(value))}>
						Create Playlist
					</ColorButton>
				</Stack>
			</div>
		</GeneralPage>
	);
}
