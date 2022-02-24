import React from "react";
import { Slider, styled, alpha } from "@mui/material";

export const spotifyGreen = "#1DB954";
export const spotifyGreenDark = "#178E41";

const ColorSlider = styled(Slider)(({ theme }) => ({
	width: 300,
	height: 8,
	margin: 15,
	color: spotifyGreen,
	"& .MuiSlider-thumb": {
		"&:hover, &.Mui-focusVisible": {
			boxShadow: `0px 0px 0px 8px ${alpha(spotifyGreen, 0.16)}`,
		},
		"&.Mui-active": {
			boxShadow: `0px 0px 0px 14px ${alpha(spotifyGreenDark, 0.16)}`,
		},
	},
	"& .MuiSlider-valueLabel": {
		lineHeight: 1,
		fontSize: 15,
		padding: 0,
		width: 25,
		height: 25,
		borderRadius: "50% 50% 50% 0%",
		backgroundColor: spotifyGreen,
		transformOrigin: "bottom left",
		transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
		"&:before": { display: "none" },
		"&.MuiSlider-valueLabelOpen": {
			transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
		},
		"& > *": {
			transform: "rotate(45deg)",
		},
	},
}));

export default function SpotifySlider() {
	return (
		<ColorSlider
			aria-label="Hours"
			getAriaValueText={(value) => {
				return `${value}`;
			}}
			valueLabelDisplay="on"
			step={1}
			marks
			min={1}
			max={10}
		/>
	);
}
