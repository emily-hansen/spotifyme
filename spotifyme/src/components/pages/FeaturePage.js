import React, { useState, useEffect, useRef } from "react";
import {
	Box,
	Stack,
	Typography,
	Tooltip,
	Paper,
	styled,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import GeneralPage from "./GeneralPage";
import ICard from '../ItemCard';
import { ColorButton } from "../Button";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import SpotifyWebApi from 'spotify-web-api-node';
import TimeInput from "../TimeInput";

const color = "#FFFFFF";

// Styling for box/features grid layout
export const FeatureGrid = styled(ToggleButtonGroup)(() => ({
    justifyContent: 'center',
    alignItems: 'center',
	display: "grid",
	gap: 1,
	gridTemplateColumns: "repeat(2, 4fr)",
}));

// Styling for paper
export const CustomPaper = styled(Paper)(() => ({
	backgroundColor: "#181818",
	padding: "10px",
	marginTop: "15px", 
}));

// Styling for audio feature buttons
export const StyledButton = styled(ToggleButton)(() => ({
	fontWeight: "bold",
	fontSize: "20px",
	textTransform: "capitalize",
	outline: "round",
	borderRadius: "10px",
	margin: "8px",
	width: "210px",
	height: "50px",
	color: "#fff",
	"&:hover": {
		boxShadow: "0px 0px 10px #fff",
	},
	"&.Mui-selected": {
		color: "#fff",
		outlineColor: "#1DB954",
		outlineStyle: "solid",
		outlineWidth: "4px",
	},
}));

export default function FeaturePage() {
	const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

	const [value, setValue] = React.useState("HH:MM:SS");

	let spotifyApi = new SpotifyWebApi({
		accessToken: token,
	});

	const tokenHandler = (token) => {
		spotifyApi.setAccessToken(token);
		setToken(token);
	};

	const navigator = useNavigate();

	const [valFeature, setValenceFeatures] = React.useState(() => []);
	const [tempoFeature, setTempoFeatures] = React.useState(() => []);
	const [focusFeature, setFocusFeatures] = React.useState(() => []);
	const [features, setOtherFeatures] = React.useState(() => []);
	let featureArray = [];

	const handleValence = (event, newFeature) => {
		setValenceFeatures(newFeature);
	};
	const handleTempo = (event, newFeature) => {
		setTempoFeatures(newFeature);
	};
	const handleFocus = (event, newFeature) => {
		setFocusFeatures(newFeature);
	};
	const handleOtherFeatures = (event, newFeature) => {
		setOtherFeatures(newFeature);
	};

	const didFeaturesMount = useRef(false);

	useEffect(() => {
		if(didFeaturesMount.current) {
			featureArray = [].concat(valFeature, focusFeature, tempoFeature, features);
			featureArray = featureArray.filter(function(element) {
				return element !== null;
			});
			console.log(featureArray);
		}
		else {
			didFeaturesMount.current = true;
		}
	  }, [valFeature, tempoFeature, focusFeature, features]);

	return (
		<GeneralPage link="/homepage">
			{token ? (
				console.log("Access Token Validated!")
			) : (
				<SpotifyAuth
					redirectUri="http://localhost:3000/featurepage"
					clientID="b3f5de56c9334d679e5f34871927c2cc"
					scopes={[
						Scopes.userReadPrivate,
						Scopes.userLibraryModify,
						Scopes.userLibraryRead,
						Scopes.playlistModifyPrivate,
						Scopes.playlistReadCollaborative,
						Scopes.userReadEmail,
						Scopes.userTopRead,
						Scopes.playlistModifyPublic,
						Scopes.userReadRecentlyPlayed,
					]}
					onAccessToken={(token) => tokenHandler(token)}
					noLogo={true}
				/>
			)}
			{/* Stack is the different playlist types */}
			<Box
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
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
						head="Feature Playlist"
						text="Make a playlist that runs for a given time and selected features based on your recently listened."
						style={{
							width: "500px",
							backgroundColor: "#000",
						}}>
						<Stack
							direction="row"
							spacing={2}
							sx={{
								justifyContent: "center",
								alignItems: "center",
								margin: "10px",
							}}>
							<Typography variant="h5" sx={{ color: color }}>
								Time:
							</Typography>
							<TimeInput value={value} setValue={setValue} />
						</Stack>

						<CustomPaper>
							<FeatureGrid
								orientation="horizontal"
								exclusive
								value={valFeature}
								onChange={handleValence}
								aria-label="feature"
								>
								<Tooltip title="Positive-Type Songs" enterDelay={500} leaveDelay={200} placement="top">
									<StyledButton value="uplift" style={{backgroundColor: '#73b7b8'}}>
									Uplifting
									</StyledButton>
								</Tooltip>

								<Tooltip title="Negative-Type Songs" enterDelay={500} leaveDelay={200} placement="top">
									<StyledButton value="vex" style={{backgroundColor: '#52a1a3'}}>
									Vexing
									</StyledButton>
								</Tooltip>
							</FeatureGrid>

							<FeatureGrid
								orientation="horizontal"
								exclusive
								value={tempoFeature}
								onChange={handleTempo}
								aria-label="feature"
								>
								<Tooltip title="Lower Songs" enterDelay={500} leaveDelay={200} placement="top">
									<StyledButton value="slowtempo" style={{backgroundColor: '#76c8b1'}}>
									Slow Tempo
									</StyledButton>
								</Tooltip>

								<Tooltip title="Faster Songs" enterDelay={500} leaveDelay={200} placement="top">
									<StyledButton value="fasttempo" style={{backgroundColor: '#50b99b'}}>
									Fast Tempo
									</StyledButton>
								</Tooltip>
							</FeatureGrid>

							<FeatureGrid
								orientation="horizontal"
								exclusive
								value={focusFeature}
								onChange={handleFocus}
								aria-label="feature"
								>
								<Tooltip title="Songs with Mostly Instrumentals" enterDelay={500} leaveDelay={200} placement="top">
									<StyledButton value="instrumental" style={{backgroundColor: '#dc244b'}}>
									Instrumentalness
									</StyledButton>
								</Tooltip>

								<Tooltip title="Songs with Mostly Vocals" enterDelay={500} leaveDelay={200} placement="top">
									<StyledButton value="speech" style={{backgroundColor: '#af1d3c'}}>
									Speechiness
									</StyledButton>
								</Tooltip>
							</FeatureGrid>

							<FeatureGrid
								orientation="horizontal"
								value={features}
								onChange={handleOtherFeatures}
								aria-label="feature"
								>
								<Tooltip title="Mainstream Songs" enterDelay={500} leaveDelay={200} placement="top">
									<StyledButton value="pop" style={{backgroundColor: '#f6cb52'}}>
									Popularity
									</StyledButton>
								</Tooltip>

								<Tooltip title="INTENSE SONGS" enterDelay={500} leaveDelay={200} placement="top">
									<StyledButton value="energy" style={{backgroundColor: '#f3b816'}}>
									Energetic
									</StyledButton>
								</Tooltip>
							</FeatureGrid>

							<FeatureGrid
								orientation="horizontal"
								value={features}
								onChange={handleOtherFeatures}
								aria-label="feature"
								>
								<Tooltip title="Danceable Songs" enterDelay={500} leaveDelay={200} placement="top">
									<StyledButton value="dance" style={{backgroundColor: '#f05a29'}}>
									Danceability
									</StyledButton>
								</Tooltip>

								<Tooltip title="Analog Songs" enterDelay={500} leaveDelay={200} placement="top">
									<StyledButton value="acoustic" style={{backgroundColor: '#d23f0f'}}>
									Acousticness
									</StyledButton>
								</Tooltip>
							</FeatureGrid>
						</CustomPaper>
					</ICard>
				</Stack>
				
				<ColorButton style={{ width: "150px", textTransform: "capitalize", marginTop: "10px" }}
						onClick={() => navigator("/featureplaylist", {state: { featureData: featureArray}})}>
						Create Playlist
				</ColorButton>
			</Box>
		</GeneralPage>
	);
}
