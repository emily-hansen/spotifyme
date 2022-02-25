import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Cookies from "js-cookie";
import { SpotifyAuthListener } from "react-spotify-auth";
import SpotifyWebApi from "spotify-web-api-node";

import ICard from "../ItemCard";
import { ColorButton } from "../Button";
import GeneralPage from "./GeneralPage";
import CircleLoader from "../Loader";
import PlayListGenerator_simple from "../PlaylistGen";

import { timeToMs } from "../timeToMs";

const columns = [
	{
		field: "id",
		headerName: "Track #",
		align: "center",
		width: 100,
		editable: false,
		hide: true,
	},
	{
		field: "title",
		headerName: "Title",
		renderCell: function (params) {
			return (
				<>
					<Avatar
						src={params.value.art}
						variant="square"
						sizes="small"></Avatar>
					<span display="inline" style={{ marginInlineStart: "25px" }}>
						{params.value.track}
					</span>
				</>
			);
		},
		width: 300,
		justifyContent: "left",
		editable: false,
	},
	{
		field: "artist",
		headerName: "Artist",
		width: 200,
		editable: false,
	},
	{
		field: "album",
		headerName: "Album",
		width: 200,
		editable: false,
	},
	{
		field: "duration",
		headerName: "Track Length",
		align: "right",
		valueFormatter: (params) => {
			let milli = params.value;
			var minutes = Math.floor(milli / 60000);
			var seconds = ((milli % 60000) / 1000).toFixed(0);

			//[TODO] Support songs over 60 minutes (basically format it to hh:mm:ss not just mm:ss like it is now)
			var finalMinute = minutes < 10 ? "0" + `${minutes}` : `${minutes}`;
			var finalSecond = (seconds < 10 ? "0" : "") + `${seconds}`;
			var finalFormat = finalMinute + ":" + finalSecond;

			return finalFormat;
		},
		width: 150,
		editable: false,
		hideable: true,
	},
];

export default function PlaylistPage() {
	const navigator = useNavigate();
	const [rows, setRows] = useState([]);
	const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
	const [loading, setLoading] = useState(false);

	let spotifyApi = new SpotifyWebApi({
		accessToken: token,
	});

	const tokenHandler = (token) => {
		setToken(token);
	};

	const getTracks = () => {
		spotifyApi.getMyTopTracks({ limit: 50 }, function (err, data) {
			if (err) {
				console.error("Something went wrong!");
			} else {
				let response = []; // "response" stores User's top 50 items

				data.body.items.forEach(function (value, index) {
					let artistArray = value.artists[0].name;
					let albumArt = value.album.images[0].url;

					response.push({
						id: index + 1,
						title: { art: value.album.images[0].url, track: value.name },
						artist: artistArray,
						album: value.album.name,
						duration: value.duration_ms,
					});
				});

				// create an array  [[id, length], [id, length]...[id, length]]
				let array = new Array(50);
				for (let i = 0; i < 50; i++) {
					array[i] = new Array(2);
					array[i][0] = i + 1; //id
					array[i][1] = response[i].duration; //length
				}

				// stores id of the songs selected (result from PlaylistGen,js)
				let selected_songs = PlayListGenerator_simple(
					timeToMs(localStorage.getItem("time")),
					array
				); // a playlist that lasts a given duration

				let result = [];
				for (let i = 0; i < selected_songs.length; i++) {
					result.push(response[selected_songs[i] - 1]);
				}

				setRows(result);
				setLoading(true);
			}
		});

		return rows;
	};

	let update = 0;

	useEffect(getTracks, [update]);

	return (
		<>
			<SpotifyAuthListener onAccessToken={(token) => tokenHandler(token)} />
			<GeneralPage link="/homepage">
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
							head="Playlist"
							style={{
								width: "100%",
								height: "100%",
								justifyContent: "center",
							}}>
							<Stack
								direction="column"
								spacing={2}
								sx={{ alignItems: "center" }}>
								<div
									style={{
										height: "50vh",
										width: "60vw",
										backgroundColor: "#181818",
									}}>
									{loading ? (
										<DataGrid
											rows={rows}
											columns={columns}
											pageSize={50}
											rowsPerPageOptions={[50]}
											sx={{ color: "white" }}
											rowHeight={50}
										/>
									) : (
										<CircleLoader />
									)}
								</div>
							</Stack>
						</ICard>
						<ColorButton
							style={{ width: "150px" }}
							onClick={() => navigator("/homepage")}>
							Create New
						</ColorButton>
					</Stack>
				</div>
			</GeneralPage>
		</>
	);
}
