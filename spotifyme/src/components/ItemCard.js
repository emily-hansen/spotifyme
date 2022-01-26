import { Card, styled } from "@mui/material";

// Basic styling for the card
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

/**
 * Component takes in props:
 * @param {string} head - The title of the card
 * @param {string} text - The body of the card
 * @param {string} image - The image of the card (Not implemented)
 * @param {string} link - The link of the card (Not implemented)
 * @param {string} linkText - The text of the link (Not implemented)
 * @example <ICard head="Test" text="This is a test">{children}</ICard>
 */
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
