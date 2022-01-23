import { Button, styled } from "@mui/material";

const spotifyGreen = "#1DB954";
const spotifyGreenDark = "#178E41";

export const ColorButton = styled(Button)(({ theme }) => ({
	color: "#fff",
	backgroundColor: spotifyGreen,
	borderRadius: "10px",
	"&:hover": {
		backgroundColor: spotifyGreenDark,
	},
}));
