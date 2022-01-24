import { Card, styled } from "@mui/material";

export const ItemCard = styled(Card)(({ theme }) => ({
	backgroundColor: "#000",
	borderRadius: "10px",
	boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
	padding: "20px",
	margin: "20px",
	color: "#fff",
	"&:hover": {
		boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
	},
}));
