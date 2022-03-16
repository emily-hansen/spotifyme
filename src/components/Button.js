import { Button, styled } from "@mui/material";

// Standard Spotify colors
export const spotifyGreen = "#1DB954";
export const spotifyGreenDark = "#178E41";

// Default button style
export const ColorButton = styled(Button)(() => ({
	color: "#fff",
	backgroundColor: spotifyGreen,
	borderRadius: "10px",
	textTransform: "capitalize",
	"&:hover": {
		backgroundColor: spotifyGreenDark,
	},
}));
