import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Alert,
	Avatar,
	Box,
	Modal,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
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
			let seconds = ((milli % 60000) / 1000).toFixed(0);
			let minutes = Math.floor(milli / 60000);
			let hours = Math.floor(minutes / 60);

			if (hours > 0) minutes = minutes % 60;

			var finalSecond = seconds < 10 ? `0${seconds}` : `${seconds}`;
			var finalMinute = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
			let finalHour =
				hours < 10 ? (hours === 0 ? "" : `0${hours}:`) : `${hours}:`;

			return finalHour + finalMinute + finalSecond;
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
	const [savedPlaylist, setSavedPlaylist] = useState([null, false]);
	const [playlistSaved, setPlaylistSaved] = useState(false);
	const [info, setInfo] = useState(["", ""]);

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
						songID: value.id,
					});
				});

				// create an array  [[id, length], [id, length], ..., [id, length]]
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

	// Saves playlist to user's Spotify account
	const savePlaylist = () => {
		spotifyApi
			.createPlaylist(Cookies.get("spotifyUserID"), {
				name: info[0] === "" ? "New Playlist" : info[0],
				public: true,
				description: info[1],
			})
			.then((data) => {
				spotifyApi
					.addTracksToPlaylist(
						data.body.id,
						rows.map((row) => `spotify:track:${row.songID}`)
					)
					.then((data) => {
						setSavedPlaylist(["saved", false]);
						setPlaylistSaved(false);
						setInfo(["", ""]);
					})
					.catch((err) => {
						setSavedPlaylist(["error", false]);
						setPlaylistSaved(false);
						setInfo(["", ""]);
						console.log(err);
					});
			})
			.catch((err) => {
				setSavedPlaylist(["error", false]);
				setPlaylistSaved(false);
				setInfo(["", ""]);
				console.log(err);
			});
	};

	useEffect(getTracks, []);

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
						<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
							<ColorButton
								style={{ width: "150px" }}
								onClick={() => navigator("/TimePage")}>
								Create New
							</ColorButton>
							<ColorButton
								style={{ width: "150px" }}
								onClick={() => setSavedPlaylist([null, true])}>
								Save Playlist
							</ColorButton>
							<ColorButton
								style={{ width: "150px" }}
								onClick={() => getTracks()}>
								Regenerate Playlist
							</ColorButton>
						</Stack>
					</Stack>
				</div>
			</GeneralPage>
			<Modal
				open={savedPlaylist[1]}
				onClose={() => setSavedPlaylist([null, false])}
				aria-labelledby="modal-title">
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
						bgcolor: "background.paper",
						border: "2px solid #000",
						boxShadow: 24,
						p: 4,
						borderRadius: "10px",
					}}>
					<Typography
						id="modal-title"
						variant="h6"
						sx={{ marginBottom: "5px" }}>
						Enter Playlist Information:
					</Typography>
					<Stack spacing={2}>
						<TextField
							autoFocus
							value={info[0]}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									setPlaylistSaved(true);
									savePlaylist();
								}
							}}
							onChange={(e) => setInfo([e.target.value, info[1]])}
							placeholder="Playlist Name"
						/>
						<TextField
							value={info[1]}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									setPlaylistSaved(true);
									savePlaylist();
								}
							}}
							onChange={(e) => setInfo([info[0], e.target.value])}
							placeholder="Playlist Description"
						/>
						<ColorButton
							style={{ width: "150px", height: "40px", alignSelf: "center" }}
							onClick={() => {
								setPlaylistSaved(true);
								savePlaylist();
							}}>
							{playlistSaved ? <CircleLoader /> : "Save Playlist"}
						</ColorButton>
					</Stack>
				</Box>
			</Modal>
			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				open={savedPlaylist[0]}
				autoHideDuration={3000}
				onClose={() => setSavedPlaylist([null, savedPlaylist[1]])}>
				{savedPlaylist[0] === "error" ? (
					<Alert severity="error">Error saving playlist.</Alert>
				) : (
					<Alert severity="success">Playlist saved!</Alert>
				)}
			</Snackbar>
		</>
	);
}
