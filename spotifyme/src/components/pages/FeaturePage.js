import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Stack,
	Typography,
	styled,
	ToggleButton,
	ToggleButtonGroup,
	Alert,
	Snackbar,
} from "@mui/material";
import Cookies from "js-cookie";

import { SpotifyAuth, Scopes } from "react-spotify-auth";
import SpotifyWebApi from "spotify-web-api-node";
import ICard from "../ItemCard";
import { ColorButton } from "../Button";
import GeneralPage from "./GeneralPage";
import TimeInput from "../TimeInput";

const color = "#FFFFFF";

// Styling for box/features grid layout
export const FeatureGrid = styled(ToggleButtonGroup)(() => ({
	backgroundColor: "#181818",
	borderRadius: "10px",
	boxShadow: "0px 0px 10px #000",
	padding: "15px",
	marginTop: "15px",
	justifyContent: "center",
	alignItems: "center",
	display: "grid",
	gap: 1,
	gridTemplateColumns: "repeat(2, 4fr)",
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
	const [error, setError] = useState(false);

	const [value, setValue] = React.useState("HH:MM:SS");

	let spotifyApi = new SpotifyWebApi({
		accessToken: token,
	});

	const tokenHandler = (token) => {
		spotifyApi.setAccessToken(token);
		setToken(token);
	};

	const navigator = useNavigate();
	const [features, setFeatures] = React.useState(() => []);

	const handleFeatures = (event, newFeature) => {
		setFeatures(newFeature);
		console.log(newFeature);
	};

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
						text="Make a playlist that runs for a given time based on your recently listened."
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
							<TimeInput
								value={value}
								error={error}
								setError={setError}
								setValue={setValue}
							/>
						</Stack>
						<FeatureGrid
							orientation="vertical"
							value={features}
							onChange={handleFeatures}
							aria-label="feature">
							<StyledButton
								value="acousticness"
								style={{ backgroundColor: "#B08968" }}>
								Acousticness
							</StyledButton>

							<StyledButton
								value="danceability"
								style={{ backgroundColor: "#5390D9" }}>
								Danceability
							</StyledButton>

							<StyledButton
								value="energy"
								style={{ backgroundColor: "#FF9100" }}>
								Energy
							</StyledButton>

							<StyledButton
								value="tempo"
								style={{ backgroundColor: "#F15156" }}>
								Tempo
							</StyledButton>

							<StyledButton
								value="valence"
								style={{ backgroundColor: "#8A41FB" }}>
								Valence
							</StyledButton>

							<StyledButton
								value="length"
								style={{ backgroundColor: "#9A8C98" }}>
								Length
							</StyledButton>

							<StyledButton
								value="popularity"
								style={{ backgroundColor: "#FF758F" }}>
								Popularity
							</StyledButton>

							<StyledButton
								value="loudness"
								style={{ backgroundColor: "#2D6A4F" }}>
								Loudness
							</StyledButton>
						</FeatureGrid>
					</ICard>
				</Stack>
				<Snackbar
					anchorOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					open={error}
					autoHideDuration={3000}
					key={"top" + "center"}
					onClose={() => setError(false)}>
					<Alert severity="error">Please enter a valid time.</Alert>
				</Snackbar>
				<ColorButton
					style={{
						width: "150px",
						textTransform: "capitalize",
						marginTop: "10px",
					}}
					onClick={() => {
						if (value.replace(/[^1-9]/g, "").length === 0) {
							setError(true);
						} else {
							navigator("/playlistpage");
						}
					}}>
					Create Playlist
				</ColorButton>
			</Box>
		</GeneralPage>
	);
}
