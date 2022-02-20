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
import PlayListGenerator_simple from "../PlaylistGen.js;

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
			var finalFormat = finalMinute + ":" + finalSecond + "s";

			return finalFormat;
		},
		width: 150,
		editable: false,
		hideable: true,
	},
];

export default function PlaylistPage() {
	let [rows, setRows] = useState([]);

	const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

	const tokenHandler = (token) => {
		console.log(token);
		setToken(token);
	};

	let spotifyApi = new SpotifyWebApi({
		accessToken: token,
	});

	const getTracks = () => {
		spotifyApi.getMyTopTracks({ limit: 50 }, function (err, data) {
			if (err) {
				console.error("Something went wrong!");
			} else {
				console.log(data.body.items);
				let response = [];
				let devResponse = []; // this one includes the track ids (maybe for alternative usage?)

				data.body.items.forEach(function (value, index) {
					let artistArray = value.artists[0].name;
					let albumArt = value.album.images[0].url;

					console.log(albumArt);
					response.push({
						id: index + 1,
						title: { art: value.album.images[0].url, track: value.name },
						artist: artistArray,
						album: value.album.name,
						duration: value.duration_ms,
					});
				});

								//console.log(response); // "response" stores User's top 50 items
				//setRows(response);


				// create an array  [[id, length], [id, length]...[id, length]] 
				let array = new Array(50);
				for (let i = 0; i < 50; i++){
					array[i] = new Array(2);
					array[i][0] = i + 1; //id
					array[i][1] = response[i].duration; //length
				}
				//console.log(array);


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
				console.log(ms);

 
    			//selected_songs = PlayListGenerator_simple(900000, array); // 60mins (test)
    			selected_songs = PlayListGenerator_simple(ms, array); // a playlist that lasts a given duration
    			//console.log(selected_songs);
    			let result = []; 
    			for (let i = 0; i < selected_songs.length; i++){
    				result.push(response[selected_songs[i] - 1]);
    			}
    			//console.log(result);

    			
    			setRows(result);
			}
		});

		console.log(rows);
		return rows;
	};

	let update = 0;

	useEffect(getTracks, [update]);

	const navigator = useNavigate();
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
										height: 400,
										width: 1000,
										backgroundColor: "#181818",
									}}>
									<DataGrid
										rows={rows}
										columns={columns}
										//pageSize={10}
										pageSize={50}
										//rowsPerPageOptions={[10]}
										rowsPerPageOptions={[50]}
										sx={{ color: "white" }}
										rowHeight={100}
									/>
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
