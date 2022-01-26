import { Card, styled } from "@mui/material";

export const ItemCard = styled(Card)(({ theme }) => ({
	backgroundColor: "#000",
	borderRadius: "10px",
	boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
	padding: "20px",
	color: "#fff",
	"&:hover": {
		boxShadow: "0px 0px 10px #fff",
	},
}));

export default function ICard(props) {
	return (
		<ItemCard style={props.style}>
			<div style={{ display: "grid" }}>
				{props.head ? (
					<span style={{ fontSize: "50px" }}>{props.head}</span>
				) : null}
				<p style={{ color: "#888" }}>{props.text}</p>
				{props.children}
			</div>
		</ItemCard>
	);
}
