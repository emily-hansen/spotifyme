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
const FeatureGrid = styled(ToggleButtonGroup)(() => ({
	justifyContent: "center",
	alignItems: "center",
	display: "grid",
	gap: 1,
	gridTemplateColumns: "repeat(2, 4fr)",
}));

// Styling for paper
const CustomPaper = styled(Paper)(() => ({
	backgroundColor: "#181818",
	padding: "10px",
	marginTop: "15px",
}));

// Styling for audio feature buttons
const StyledButton = styled(ToggleButton)(() => ({
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

const ToggleTip = styled(Tooltip)(({ selected }) =>
	selected
		? {
				outlineColor: "#1DB954",
				outlineStyle: "solid",
				outlineWidth: "4px",
		  }
		: null
);

export default function FeaturePage() {
	const navigator = useNavigate();
	const [value, setValue] = useState(
		localStorage.getItem("time") || "HH:MM:SS"
	);
	const [error, setError] = useState(false);
	const [valFeature, setValenceFeatures] = useState(
		localStorage.getItem("val") || []
	);
	const [tempoFeature, setTempoFeatures] = useState(
		localStorage.getItem("tempo") || []
	);
	const [focusFeature, setFocusFeatures] = useState(
		localStorage.getItem("focus") || []
	);
	const [features, setOtherFeatures] = useState(
		JSON.parse(localStorage.getItem("features")) || []
	);

	const featureArray = useRef([]);

	const didFeaturesMount = useRef(false);

	useEffect(() => {
		if (didFeaturesMount.current) {
			featureArray.current = [].concat(
				valFeature,
				focusFeature,
				tempoFeature,
				features
			);
			featureArray.current = featureArray.current.filter(function (element) {
				return element !== null;
			});
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
						text="Make a playlist based on given time and specified features. Final playlist will be shorter than provided time if songs do not fill time perfectly."
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
										localStorage.setItem("val", valFeature);
										localStorage.setItem("tempo", tempoFeature);
										localStorage.setItem("focus", focusFeature);
										localStorage.setItem("features", JSON.stringify(features));
										navigator("/featureplaylist", {
											state: { featureData: featureArray.current },
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
								<ToggleTip
									selected={valFeature === "uplift"}
									title="Positive-Type Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="uplift"
										style={{ backgroundColor: "#73b7b8", color: "#fff" }}>
										Uplifting
									</StyledButton>
								</ToggleTip>
								<ToggleTip
									selected={valFeature === "vex"}
									title="Negative-Type Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="vex"
										style={{ backgroundColor: "#52a1a3", color: "#fff" }}>
										Vexing
									</StyledButton>
								</ToggleTip>
							</FeatureGrid>

							<FeatureGrid
								orientation="horizontal"
								exclusive
								value={tempoFeature}
								onChange={(event, newFeature) => setTempoFeatures(newFeature)}
								aria-label="feature">
								<ToggleTip
									selected={tempoFeature === "slowtempo"}
									title="Lower Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="slowtempo"
										style={{ backgroundColor: "#76c8b1", color: "#fff" }}>
										Slow Tempo
									</StyledButton>
								</ToggleTip>

								<ToggleTip
									selected={tempoFeature === "fasttempo"}
									title="Faster Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="fasttempo"
										style={{ backgroundColor: "#50b99b", color: "#fff" }}>
										Fast Tempo
									</StyledButton>
								</ToggleTip>
							</FeatureGrid>

							<FeatureGrid
								orientation="horizontal"
								exclusive
								value={focusFeature}
								onChange={(event, newFeature) => setFocusFeatures(newFeature)}
								aria-label="feature">
								<ToggleTip
									selected={focusFeature === "instrumental"}
									title="Songs with Mostly Instrumentals"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="instrumental"
										style={{ backgroundColor: "#dc244b", color: "#fff" }}>
										Instrumental
									</StyledButton>
								</ToggleTip>

								<ToggleTip
									selected={focusFeature === "speech"}
									title="Songs with Mostly Vocals"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="speech"
										style={{ backgroundColor: "#af1d3c", color: "#fff" }}>
										Lyrics
									</StyledButton>
								</ToggleTip>
							</FeatureGrid>

							<FeatureGrid
								orientation="horizontal"
								value={features}
								onChange={(event, newFeature) => setOtherFeatures(newFeature)}
								aria-label="feature">
								<ToggleTip
									selected={features.includes("pop")}
									title="Mainstream Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="pop"
										style={{ backgroundColor: "#f6cb52", color: "#fff" }}>
										Popularity
									</StyledButton>
								</ToggleTip>

								<ToggleTip
									selected={features.includes("energy")}
									title="Fast, loud, and noisy"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="energy"
										style={{ backgroundColor: "#f3b816", color: "#fff" }}>
										Energetic
									</StyledButton>
								</ToggleTip>
							</FeatureGrid>

							<FeatureGrid
								orientation="horizontal"
								value={features}
								onChange={(event, newFeature) => setOtherFeatures(newFeature)}
								aria-label="feature">
								<ToggleTip
									selected={features.includes("dance")}
									title="Songs suitable for dancing"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="dance"
										style={{ backgroundColor: "#f05a29", color: "#fff" }}>
										Danceability
									</StyledButton>
								</ToggleTip>

								<ToggleTip
									selected={features.includes("acoustic")}
									title="Analog Songs"
									enterDelay={500}
									leaveDelay={200}
									placement="top">
									<StyledButton
										value="acoustic"
										style={{ backgroundColor: "#d23f0f", color: "#fff" }}>
										Acousticness
									</StyledButton>
								</ToggleTip>
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
						localStorage.setItem("val", valFeature);
						localStorage.setItem("tempo", tempoFeature);
						localStorage.setItem("focus", focusFeature);
						localStorage.setItem("features", JSON.stringify(features));
						navigator("/featureplaylist", {
							state: { featureData: featureArray.current },
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
