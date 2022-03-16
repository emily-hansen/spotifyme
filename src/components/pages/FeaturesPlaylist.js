import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Modal,
	IconButton,
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
import { PlaylistGenerator_features, shuffle } from "../PlaylistGen";
import { timeToMs } from "../timeToMs";

// Formatting for the data grid
const featureColumns = [
	{
		field: "id",
		headerName: "Track #",
		align: "center",
		width: 100,
		editable: false,
		hide: true,
	},
	{
		field: "track",
		headerName: "Title",
		renderCell: function (params) {
			return (
				<>
					<Avatar
						src={params.value.art}
						variant="square"
						sizes="small"></Avatar>
					<span display="inline" style={{ marginInlineStart: "25px" }}>
						{params.value.name}
					</span>
				</>
			);
		},
		width: 350,
		justifyContent: "left",
		editable: false,
	},
	{
		field: "duration",
		headerName: "Track Length",
		align: "center",
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
		width: 125,
		editable: false,
		hideable: true,
	},
	{
		field: "valence",
		headerName: "VAL",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
	{
		field: "tempo",
		headerName: "BPM",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
		toFixed: true,
	},
	{
		field: "instrumental",
		headerName: "INSTR",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
	{
		field: "speech",
		headerName: "SPCH",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
	{
		field: "energy",
		headerName: "NRG",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
	{
		field: "dance",
		headerName: "DNCE",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
	{
		field: "acoustic",
		headerName: "ACST",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
	{
		field: "pop",
		headerName: "POP",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
];

export default function PlaylistPage() {
	const navigator = useNavigate();
	const location = useLocation();

	// Get feature array from browser router
	const featureData = location.state.featureData;

	// Auth token
	const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

	// Playlist information
	const [featureRows, setFeatureRows] = useState([]);

	// Saved playlist information
	const [savedPlaylist, setSavedPlaylist] = useState([null, false]);
	const [playlistSaved, setPlaylistSaved] = useState(false);
	const [info, setInfo] = useState(["", ""]);

	// Add songs to playlist states
	const [loading, setLoading] = useState(false);
	const [searchFieldVal, setSearchFieldVal] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [searchResultDisplay, setSearchResultDisplay] = useState("hidden");
	const [searchLoading, setSearchLoading] = useState(true);
	const [addSongs, setAddSongs] = useState(true);

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
		{
			field: "artist",
			headerName: "Artist",
			flex: 0.5,
			editable: false,
		},
		{
			field: "album",
			headerName: "Album",
			flex: 0.6,
			editable: false,
		},
		{
			field: "duration",
			headerName: "Track Length",

			align: "center",
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
			//width: 150,
			flex: 0.2,
			editable: false,
			hideable: true,
		},
	];

	const tokenHandler = (token) => {
		setToken(token);
	};

	let spotifyApi = new SpotifyWebApi({
		accessToken: token,
	});

	// Handles adding songs to playlist
	const handlePlusClick = (params) => {
		let currSearchRows = searchResults;
		let currPlaylistRows = [];
		featureRows.forEach((item) => currPlaylistRows.push(item));

		// Get song object to add
		let songToAdd = currSearchRows.find(
			(el) => el.title.trackId === params.value.trackId
		);

		// Remove song from results
		let res = currSearchRows.filter((item) => item !== songToAdd);

		// set updated result list
		setSearchResults(res);

		// set updated playlist
		spotifyApi.getAudioFeaturesForTrack(songToAdd.title.trackId).then(
			(data) => {
				let newRow = {
					id: currPlaylistRows.length + 1,
					duration: data.body.duration_ms,
					track: {
						art: params.value.art,
						name: params.value.track,
					},
					valence: data.body.valence.toFixed(2),
					tempo: data.body.tempo.toFixed(),
					instrumental: data.body.instrumentalness.toFixed(2),
					speech: data.body.speechiness.toFixed(2),
					energy: data.body.energy.toFixed(2),
					dance: data.body.danceability.toFixed(2),
					acoustic: data.body.acousticness.toFixed(2),
					pop: 0, // No popularity data available
					songID: data.body.id,
				};
				currPlaylistRows.push(newRow);
				setFeatureRows(currPlaylistRows);
			},
			(err) => {
				console.error(err);
			}
		);
	};

	// Handles searching for songs
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

	// Get audio features from selected songs
	const getFeatures = () => {
		let popular = [];

		spotifyApi
			.getMyTopTracks({ limit: 50 })
			.then(function (data) {
				for (let i = 0; i < 50; i++) {
					popular.push(data.body.items[i]);
				}
				return data;
			})
			.then(function (data) {
				return data.body.items.map(function (t) {
					return t.id;
				});
			})
			.then(function (trackIds) {
				return spotifyApi.getAudioFeaturesForTracks(trackIds);
			})
			.then(function (data) {
				let response = [];
				data.body.audio_features.forEach(function (value, index) {
					response.push({
						id: index + 1,
						duration: value.duration_ms,
						trackID: value.id,
						valence: value.valence,
						tempo: value.tempo,
						instrumental: value.instrumentalness,
						speech: value.speechiness,
						energy: value.energy,
						dance: value.danceability,
						acoustic: value.acousticness,
					});
				});

				let array = new Array(50);
				for (let i = 0; i < 50; i++) {
					array[i] = new Array(11);
					array[i][0] = i + 1; //id
					array[i][1] = response[i].duration; //length
					array[i][2] = response[i].trackID;
					array[i][3] = response[i].valence;
					array[i][4] = response[i].tempo;
					array[i][5] = response[i].instrumental;
					array[i][6] = response[i].speech;
					array[i][7] = response[i].energy;
					array[i][8] = response[i].dance;
					array[i][9] = response[i].acoustic;
					array[i][10] = popular[i].popularity;
				}

				//selected_songs = PlayListGenerator_simple(900000, array); // 60mins (test)
				let selected_songs = PlaylistGenerator_features(
					timeToMs(localStorage.getItem("time")),
					array,
					featureData
				); // a playlist that lasts a given duration

				let result = [];
				for (let i = 0; i < selected_songs.length; i++) {
					result.push(response[selected_songs[i] - 1]);
				}
				result = result.filter(function (element) {
					return element !== undefined;
				});

				let newResults = [];
				let index = 0;
				for (let i = 0; i < popular.length; i++) {
					for (let j = 0; j < result.length; j++) {
						if (result[j].trackID === popular[i].id) {
							newResults.push({
								id: index + 1,
								duration: result[j].duration,
								track: {
									art: popular[i].album.images[0].url,
									name: popular[i].name,
								},
								valence: result[j].valence.toFixed(2),
								tempo: result[j].tempo.toFixed(),
								instrumental: result[j].instrumental.toFixed(2),
								speech: result[j].speech.toFixed(2),
								energy: result[j].energy.toFixed(2),
								dance: result[j].dance.toFixed(2),
								acoustic: result[j].acoustic.toFixed(2),
								pop: popular[j].popularity.toFixed(0),
								songID: result[j].trackID,
							});
						}
						index++;
					}
				}

				shuffle(newResults);

				setFeatureRows(newResults);
				setLoading(true);
			})
			.catch(function (error) {
				console.error(error);
			});
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
						featureRows.map(
							(featureRows) => `spotify:track:${featureRows.songID}`
						)
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

	useEffect(getFeatures, []);

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
										height: Math.imul(62, featureRows.length) + 58,
										minHeight: "50vh",
										maxHeight: "50vh",
										width: "60vw",
										backgroundColor: "#181818",
									}}>
									{loading ? (
										<DataGrid
											rows={featureRows}
											columns={featureColumns}
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
													marginBottom: "0px",
													marginTop: "2vh",

													"& label.Mui-focused": {
														color: "#1DB954",
														backgroundColor: "none",
														"& fieldset": {
															color: "#1DB954",
														},
													},

													"& label": {
														color: "#afbacc",
													},

													"& .MuiInput-underline:after": {
														borderBottomColor: "#1DB954",
														backgroundColor: "none",
														color: "white",
													},

													"& .MuiOutlinedInput-root": {
														color: "white",
														label: "white",
														"& fieldset": {
															borderColor: "white",
															backgroundColor: "none",
															color: "white",
														},

														"&:hover fieldset": {
															borderColor: "#afbacc",
															backgroundColor: "none",
															color: "white",
														},

														"&.Mui-focused fieldset": {
															borderColor: "#1DB954",
															backgroundColor: "none",
															color: "white",
														},

														"&.Mui-focused": {
															borderColor: "#1DB954",
															backgroundColor: "none",
															color: "white",
														},
													},
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
								onClick={() => navigator("/FeaturePage")}>
								Create New
							</ColorButton>
							<ColorButton
								style={{ width: "150px" }}
								onClick={() => setSavedPlaylist([null, true])}>
								Save Playlist
							</ColorButton>
							<ColorButton
								style={{ width: "150px" }}
								onClick={() => getFeatures()}>
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
