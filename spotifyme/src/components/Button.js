import { Button, styled } from "@mui/material";

export const spotifyGreen = "#1DB954";
export const spotifyGreenDark = "#178E41";

export const ColorButton = styled(Button)(({ theme }) => ({
	color: "#fff",
	backgroundColor: spotifyGreen,
	borderRadius: "10px",
	textTransform: "capitalize",
	"&:hover": {
		backgroundColor: spotifyGreenDark,
	},
}));
