import { useNavigate } from "react-router-dom";
import { Card, Grid, styled } from "@mui/material";

// Basic styling for the card
export const ItemCard = styled(Card)((props) =>
	Object.assign(
		{},
		{
			backgroundColor: "#000",
			borderRadius: "10px",
			boxShadow: "0px 0px 10px #000",
			padding: "20px",
			color: "#fff",
		},
		!props.nohome
			? {
					"&:hover": {
						boxShadow: "0px 0px 10px #fff",
					},
			  }
			: null
	)
);

/**
 * Component takes in props:
 * @example <ICard head="Test" text="This is a test">{children}</ICard>
 * @param {string} head - The title of the card
 * @param {string} text - The body of the card
 * @param {string} image - The image of the card (Not implemented)
 * @param {string} link - The link of the card
 * @param {string} nohome - If the card is not a home page card
 */
export default function ICard(props) {
	const navigator = useNavigate();

	return (
		<ItemCard
			nohome={props.nohome}
			style={Object.assign(
				{},
				{
					display: "flex",
					flexDirection: "row",
				},
				props.style
			)}
			onClick={() => (props.link ? navigator(props.link) : null)}>
			<Grid container spacing={2}>
				{props.head ? (
					<Grid
						item
						xs={11.5}
						style={{
							fontSize: "50px",
						}}>
						{props.head}
					</Grid>
				) : null}

				{props.text ? (
					<Grid
						item
						xs={11.5}
						style={
							props.nohome
								? {
										color: "#888",
										textAlign: "center",
								  }
								: {
										color: "#888",
								  }
						}>
						{props.text}
					</Grid>
				) : null}
				<Grid item xs={11.5}>
					{props.children}
				</Grid>
			</Grid>
			{props.icon ? props.icon : null}
		</ItemCard>
	);
}
