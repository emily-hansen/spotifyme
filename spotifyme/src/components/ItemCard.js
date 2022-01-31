import { useNavigate } from "react-router-dom";
import { Card, styled } from "@mui/material";

// Basic styling for the card
export const ItemCard = styled(Card)(() => ({
	backgroundColor: "#000",
	borderRadius: "10px",
	boxShadow: "0px 0px 10px #000",
	padding: "20px",
	color: "#fff",
	"&:hover": {
		boxShadow: "0px 0px 10px #fff",
	},
}));

/**
 * Component takes in props:
 * @example <ICard head="Test" text="This is a test">{children}</ICard>
 * @param {string} head - The title of the card
 * @param {string} text - The body of the card
 * @param {string} image - The image of the card (Not implemented)
 * @param {string} link - The link of the card
 */
export default function ICard(props) {
	const navigator = useNavigate();

	return (
		<ItemCard
			style={props.style}
			onClick={() => (props.link ? navigator(props.link) : null)}>
			<div style={{}}>
				{props.head ? (
					<span
						style={{
							fontSize: "50px",
						}}>
						{props.head}
					</span>
				) : null}
				{props.text ? (
					<p
						style={{
							color: "#888",
						}}>
						{props.text}
					</p>
				) : null}
				{props.children}
			</div>
		</ItemCard>
	);
}
