import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Alert,
	Avatar,
	Box,
	Button,
	IconButton,
	Modal,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
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
import {
	PlaylistColumns,
	AddTrackColumns,
	searchFieldStyling,
} from "./Constants";

// Column formatting for the data grid
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
						sx={{ width: 45, height: 45, paddingLeft: 0.4 }}></Avatar>
					<span display="inline" style={{ marginInlineStart: "25px" }}>
						{params.value.track}
					</span>
				</>
			);
		},
		flex: 1,
		justifyContent: "left",
		editable: false,
	},
	...PlaylistColumns,
];

export default function PlaylistPage() {
	const navigator = useNavigate();
	// Returned songs from playlist generation
	const [rows, setRows] = useState([]);

	// Auth token
	const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
	const [loading, setLoading] = useState(false);

	// Save Playlist states
	const [savedPlaylist, setSavedPlaylist] = useState([null, false]);
	const [playlistSaved, setPlaylistSaved] = useState(false);
	const [info, setInfo] = useState(["", ""]);

	// Add songs to playlist states
	const [searchFieldVal, setSearchFieldVal] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [searchResultDisplay, setSearchResultDisplay] = useState("hidden");
	const [searchLoading, setSearchLoading] = useState(true);
	const [addSongs, setAddSongs] = useState(true);

	let spotifyApi = new SpotifyWebApi({
		accessToken: token,
	});

	// Column formatting for the data grid
	const addTrackColumns = [
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
						<IconButton onClick={() => handlePlusClick(params)}>
							<AddCircleOutlineOutlinedIcon sx={{ color: "white" }} />
						</IconButton>
						<Avatar
							src={params.value.art}
							variant="square"
							sx={{ width: 45, height: 45, paddingLeft: 0.4 }}></Avatar>
						<span display="inline" style={{ marginInlineStart: "25px" }}>
							{params.value.track}
						</span>
					</>
				);
			},
			flex: 1,
			justifyContent: "left",
			editable: false,
		},
		...AddTrackColumns,
	];

	const tokenHandler = (token) => {
		setToken(token);
	};

	// Handles adding songs to playlist
	const handlePlusClick = (params) => {
		let currSearchRows = searchResults;
		let currPlaylistRows = [];
		rows.forEach((item) => currPlaylistRows.push(item));

		// Get song object to add
		let songToAdd = currSearchRows.find(
			(el) => el.title.trackId === params.value.trackId
		);

		// Remove song from results
		let res = currSearchRows.filter((item) => item !== songToAdd);

		// set updated result list
		setSearchResults(res);

		// set updated playlist
		songToAdd = { ...songToAdd, songID: songToAdd.title.trackId };
		currPlaylistRows.push(songToAdd);
		setRows(currPlaylistRows);
	};

	/*********************************** EXECUTE SEARCH FOR TRACKS ******************************************/

	const executeSearch = () => {
		spotifyApi.searchTracks(
			`${searchFieldVal}`,
			{ limit: 10 },
			function (err, data) {
				if (err) {
					console.error("Error occurred while searching for tracks");
				} else {
					let response = [];

					data.body.tracks.items.forEach(function (value, index) {
						let id = value.id;
						let trackName = value.name;
						let trackArt = value.album.images[1].url;

						let artist = value.artists[0].name;

						let album = value.album.name;
						let duration = value.duration_ms;

						response.push({
							id: index + 1,
							title: { art: trackArt, track: trackName, trackId: id },
							artist: artist,
							album: album,
							duration: duration,
						});
					});
					setSearchResults(response);
				}
			}
		);

		setTimeout(setSearchResultDisplay("visible"), 1000);
		setTimeout(setSearchLoading(false), 1000);
	};

	/*********************************** GET TRACKS ******************************************/

	const getTracks = () => {
		spotifyApi.getMyTopTracks({ limit: 50 }, function (err, data) {
			if (err) {
				console.error(err);
			} else {
				let response = [];
				// "response" stores User's top 50 items

				data.body.items.forEach(function (value, index) {
					let artistArray = value.artists[0].name;
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

	/*********************************** SAVE PLAYLIST ******************************************/

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
						console.error(err);
					});
			})
			.catch((err) => {
				setSavedPlaylist(["error", false]);
				setPlaylistSaved(false);
				setInfo(["", ""]);
				console.error(err);
			});
	};

	/********************************************************************************************/

	useEffect(getTracks, []);

	return (
		<>
			<SpotifyAuthListener onAccessToken={(token) => tokenHandler(token)} />
			<GeneralPage
				link="/homepage"
				style={!addSongs ? { height: "calc(150vh)", width: "100vw" } : null}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						height: "calc(100vh - 50px)",
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
							style={addSongs ? null : { marginTop: "300px" }}>
							<Stack
								direction="column"
								spacing={2}
								sx={{ alignItems: "center" }}>
								<div
									style={{
										height: Math.imul(62, rows.length) + 58,
										minHeight: "50vh",
										maxHeight: "50vh",
										width: "60vw",
										backgroundColor: "#181818",
									}}>
									{loading ? (
										<DataGrid
											rows={rows}
											columns={columns}
											pageSize={50}
											rowsPerPageOptions={[50]}
											sx={{ color: "white", margin: "5px" }}
											rowHeight={62}
											hideFooter
											disableSelectionOnClick
										/>
									) : (
										<CircleLoader />
									)}
								</div>
							</Stack>

							<Box
								sx={{
									position: "relative",
									width: "60vw",
									height: `${Math.imul(searchResults.length, 62)}`,
									backgroundColor: "none",
									marginTop: "18px",
									paddingLeft: "6%",
								}}>
								{addSongs ? (
									<Button
										sx={{
											width: "150px",
											color: "white",
											borderColor: "white",
											textTransform: "capitalize",
											accentColor: "white",
											marginTop: "2vh",
											"&:hover": {
												color: "#1DB954",
												borderColor: "#1DB954",
											},
										}}
										variant="outlined"
										color="primary"
										size="small"
										onClick={() => setAddSongs(false)}>
										Add Songs
									</Button>
								) : (
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}>
										<div
											style={{
												height: "fit-content",
												maxHeight: "80vh",
												width: "60vw",
											}}>
											<TextField
												autoFocus
												id="searchfield"
												label="Find track..."
												value={searchFieldVal}
												type="search"
												size="small"
												variant="outlined"
												fullWidth={true}
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														executeSearch();
													}
												}}
												onChange={(event) =>
													setSearchFieldVal(event.target.value)
												}
												onAbort={() => {
													setSearchFieldVal("");
													setSearchResults([]);
												}}
												sx={{
													...searchFieldStyling,
												}}
											/>
											<div
												style={{
													height: Math.imul(62, 3) + 58,
													marginTop: "3%",
													backgroundColor: "#181818",
													marginBottom: "30px",
													borderRadius: "5px",
												}}>
												<DataGrid
													rows={searchResults}
													loading={searchLoading}
													columns={addTrackColumns}
													pageSize={10}
													rowsPerPageOptions={[3]}
													sx={{
														visibility: `${searchResultDisplay}`,
														backgroundColor: "#181818",
														accentColor: "#181818",
														color: "white",
													}}
													rowHeight={62}
													hideFooter
													disableSelectionOnClick
												/>
											</div>
										</div>
										<div>
											<Button
												variant="outlined"
												size="small"
												sx={{
													width: "150px",
													color: "white",
													borderColor: "white",
													outlineColor: "white",
													textTransform: "capitalize",
													accentColor: "white",
													"&:hover": {
														color: "#1DB954",
														borderColor: "#1DB954",
													},
												}}
												onClick={executeSearch}>
												Search
											</Button>
											<Button
												variant="outlined"
												size="small"
												sx={{
													width: "150px",
													color: "white",
													borderColor: "white",
													outlineColor: "white",
													textTransform: "capitalize",
													accentColor: "white",
													"&:hover": {
														color: "#1DB954",
														borderColor: "#1DB954",
													},
												}}
												onClick={() => {
													setAddSongs(true);
													setSearchResultDisplay("hidden");
													setSearchResults([]);
													setSearchFieldVal("");
												}}>
												Cancel
											</Button>
										</div>
									</div>
								)}
							</Box>
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
