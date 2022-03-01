import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Alert,
	Snackbar,
	Stack,
	Typography,
	Tooltip,
	Paper,
	styled,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";

import GeneralPage from "./GeneralPage";
import ICard from "../ItemCard";
import { ColorButton } from "../Button";
import TimeInput from "../TimeInput";

const color = "#FFFFFF";

// Styling for box/features grid layout
export const FeatureGrid = styled(ToggleButtonGroup)(() => ({
	justifyContent: "center",
	alignItems: "center",
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
	width: "220px",
	height: "6vh",
	color: "#fff",
	"&:hover": {
		boxShadow: "0px 0px 10px #fff",
	},
}));

export default function FeaturePage() {
	const navigator = useNavigate();
	const [value, setValue] = useState(
		localStorage.getItem("time") || "HH:MM:SS"
	);
	const [error, setError] = useState(false);
	const [valFeature, setValenceFeatures] = useState([]);
	const [tempoFeature, setTempoFeatures] = useState([]);
	const [focusFeature, setFocusFeatures] = useState([]);
	const [features, setOtherFeatures] = useState([]);

	let featureArray = [];

	const didFeaturesMount = useRef(false);

	useEffect(() => {
		if (didFeaturesMount.current) {
			featureArray = [].concat(
				valFeature,
				focusFeature,
				tempoFeature,
				features
			);
			featureArray = featureArray.filter(function (element) {
				return element !== null;
			});
			console.log(featureArray);
		} else {
			didFeaturesMount.current = true;
		}
	}, [valFeature, tempoFeature, focusFeature, features]);

	return (
		<GeneralPage link="/homepage">
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
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										if (value.replace(/[^1-9]/g, "").length === 0) {
											setError(true);
											return;
										}
										localStorage.setItem("time", value);
										navigator("/featureplaylist", {
											state: { featureData: featureArray },
										});
									}
								}}
							/>
						</Stack>

						<CustomPaper>
							<FeatureGrid
								orientation="horizontal"
								exclusive
								value={valFeature}
								onChange={(event, newFeature) => setValenceFeatures(newFeature)}
								aria-label="feature">
								<Tooltip
									title="Positive-Type Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="uplift"
										style={{ backgroundColor: "#73b7b8" }}>
										Uplifting
									</StyledButton>
								</Tooltip>
								<Tooltip
									title="Negative-Type Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="vex"
										style={{ backgroundColor: "#52a1a3" }}>
										Vexing
									</StyledButton>
								</Tooltip>
							</FeatureGrid>

							<FeatureGrid
								orientation="horizontal"
								exclusive
								value={tempoFeature}
								onChange={(event, newFeature) => setTempoFeatures(newFeature)}
								aria-label="feature">
								<Tooltip
									title="Lower Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="slowtempo"
										style={{ backgroundColor: "#76c8b1" }}>
										Slow Tempo
									</StyledButton>
								</Tooltip>

								<Tooltip
									title="Faster Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="fasttempo"
										style={{ backgroundColor: "#50b99b" }}>
										Fast Tempo
									</StyledButton>
								</Tooltip>
							</FeatureGrid>

							<FeatureGrid
								orientation="horizontal"
								exclusive
								value={focusFeature}
								onChange={(event, newFeature) => setFocusFeatures(newFeature)}
								aria-label="feature">
								<Tooltip
									title="Songs with Mostly Instrumentals"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="instrumental"
										style={{ backgroundColor: "#dc244b" }}>
										Instrumentalness
									</StyledButton>
								</Tooltip>

								<Tooltip
									title="Songs with Mostly Vocals"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="speech"
										style={{ backgroundColor: "#af1d3c" }}>
										Speechiness
									</StyledButton>
								</Tooltip>
							</FeatureGrid>

							<FeatureGrid
								orientation="horizontal"
								value={features}
								onChange={(event, newFeature) => setOtherFeatures(newFeature)}
								aria-label="feature">
								<Tooltip
									title="Mainstream Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="pop"
										style={{ backgroundColor: "#f6cb52" }}>
										Popularity
									</StyledButton>
								</Tooltip>

								<Tooltip
									title="INTENSE SONGS"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="energy"
										style={{ backgroundColor: "#f3b816" }}>
										Energetic
									</StyledButton>
								</Tooltip>
							</FeatureGrid>

							<FeatureGrid
								orientation="horizontal"
								value={features}
								onChange={(event, newFeature) => setOtherFeatures(newFeature)}
								aria-label="feature">
								<Tooltip
									title="Danceable Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="dance"
										style={{ backgroundColor: "#f05a29" }}>
										Danceability
									</StyledButton>
								</Tooltip>

								<Tooltip
									title="Analog Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="acoustic"
										style={{ backgroundColor: "#d23f0f" }}>
										Acousticness
									</StyledButton>
								</Tooltip>
							</FeatureGrid>
						</CustomPaper>
					</ICard>
				</Stack>

				<ColorButton
					style={{
						width: "150px",
						textTransform: "capitalize",
						marginTop: "10px",
					}}
					onClick={() => {
						if (value.replace(/[^1-9]/g, "").length === 0) {
							setError(true);
							return;
						}
						navigator("/featureplaylist", {
							state: { featureData: featureArray },
						});
					}}>
					Create Playlist
				</ColorButton>
			</Box>

			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				open={error}
				autoHideDuration={3000}
				onClose={() => setError(false)}>
				<Alert severity="error">Please enter a valid time.</Alert>
			</Snackbar>
		</GeneralPage>
	);
}
