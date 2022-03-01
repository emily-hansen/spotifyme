import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import  CircleLoader  from "../Loader";
import { PlaylistGenerator_features } from "../PlaylistGen";

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
			var minutes = Math.floor(milli / 60000);
			var seconds = ((milli % 60000) / 1000).toFixed(0);

			//[TODO] Support songs over 60 minutes (basically format it to hh:mm:ss not just mm:ss like it is now)
			var finalMinute = minutes < 10 ? "0" + `${minutes}` : `${minutes}`;
			var finalSecond = (seconds < 10 ? "0" : "") + `${seconds}`;
			var finalFormat = finalMinute + ":" + finalSecond;

			return finalFormat;
		},
		width: 125,
		editable: false,
		hideable: true,
	},
	{
		field: "valence",
		headerName:"VAL",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
    {
		field: "tempo",
		headerName:"BPM",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
		toFixed: true 
	},
    {
		field: "instrumental",
		headerName:"INSTR",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
    {
		field: "speech",
		headerName:"SPCH",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
    {
		field: "energy",
		headerName:"NRG",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
    {
		field: "dance",
		headerName:"DNCE",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
    {
		field: "acoustic",
		headerName:"ACST",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
	{
		field: "pop",
		headerName:"POP",
		align: "center",
		width: 75,
		editable: false,
		hideable: true,
	},
];

export default function PlaylistPage() {
	let [rows, setRows] = useState([]);
	const [featureRows, setFeatureRows] = useState([]);
	let featureArray = [];

	const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
  	const [loading, setLoading] = React.useState(false);

    const [savedPlaylist, setSavedPlaylist] = useState([null, false]);
    const [playlistSaved, setPlaylistSaved] = useState(false);
    const [info, setInfo] = useState(["", ""]);
    
	const tokenHandler = (token) => {
		console.log(token);
		setToken(token);
	};

	let spotifyApi = new SpotifyWebApi({
		accessToken: token,
	});

	let trackFeatures = [];
	
    // Get audio features from selected songs
	const getFeatures = () => {
		let response = [];
		let popular = [];

		spotifyApi.getMyTopTracks({limit: 50}).then(function(data) {
            for (let i = 0; i < 50; i++) {
			    popular.push(data.body.items[i]);
            };
            return data;
        }).then(function(data) {
            return data.body.items.map(function(t) {
				return t.id;
			});
		}).then(function(trackIds) {
			return spotifyApi.getAudioFeaturesForTracks(trackIds);
		}).then(function(data) {
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
				})
			})

			console.log(popular);
			console.log(response);

			let array = new Array(50);
			for (let i = 0; i < 50; i++){
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

			let selected_songs = []; // stores id of the songs selected (result from PlaylistGen,js)

			//console.log(localStorage.getItem("time"));
			let time = localStorage.getItem("time"); // Given time by user
			let time_char_array = time.split(':');
			let time_array = [];

			for (var i = 0; i < time_char_array.length; i++){
				var temp = parseInt(time_char_array[i]);
				if(isNaN(temp)){
					time_array[i] = 0;
				}
				else{
					time_array[i] = temp;
				}
			}
			let ms = time_array[0] * 3600000 + time_array[1] * 60000 + time_array[2] * 1000;


			//selected_songs = PlayListGenerator_simple(900000, array); // 60mins (test)
			selected_songs = PlaylistGenerator_features(ms, array, featureData); // a playlist that lasts a given duration

			//console.log(selected_songs);
			let result = []; 
			for (let i = 0; i < selected_songs.length; i++){
				result.push(response[selected_songs[i] - 1]);
			}
			result = result.filter(function(element) {
				return element !== undefined;
			});
            console.log(result);

            let newResults = [];
            let index = 0;
            for (let i = 0; i < popular.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if(result[j].trackID === popular[i].id) {
                        newResults.push({
                            id: index + 1,
                            duration: result[j].duration,
                            track: {art: popular[i].album.images[0].url, name: popular[i].name},
							valence: result[j].valence.toFixed(2),
							tempo: result[j].tempo.toFixed(),
							instrumental: result[j].instrumental.toFixed(2),
							speech: result[j].speech.toFixed(2),
							energy: result[j].energy.toFixed(2),
							dance: result[j].dance.toFixed(2),
							acoustic: result[j].acoustic.toFixed(2),
							pop: popular[j].popularity.toFixed(0),
                            songID: result[j].trackID
                        });
                    }
                    index++;
                }
            }
            console.log(newResults);

			setFeatureRows(newResults);
			setLoading(true);

		}).catch(function(error) {
			console.error(error);
		});

		return featureRows;
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
						featureRows.map((featureRows) => `spotify:track:${featureRows.songID}`)
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

	let update = 0;

	useEffect(getFeatures, []);

	const navigator = useNavigate();
	const location = useLocation();
	const featureData = location.state.featureData;

	useEffect(() => {
		if(featureData !== "None") {
			console.log(featureData);
		}
		else {
			console.log("No features");
		}
	}, [featureData]);

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
							head="Features Playlist"
							style={{
								width: "90%",
								height: "100%",
								justifyContent: "center",
                                textAlign: 'center'
							}}>
							<Stack
								direction="column"
								spacing={2}
								sx={{ alignItems: "center"}}>
								<div
									style={{
										height: "50vh",
										width: "60vw",
										backgroundColor: "#181818",
									}}>
									{loading ? (
                                        <DataGrid
										rows={featureRows}
										columns={featureColumns}
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
								onClick={() => navigator("/homepage")}>
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
