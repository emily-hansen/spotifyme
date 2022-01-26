import React from "react";
import { useNavigate } from "react-router-dom";
import Background from "./Background";
import { ColorButton, spotifyGreen, spotifyGreenDark } from "./Button";
import { Avatar, Stack } from "@mui/material";
import ICard from "./ItemCard";

export default function HomePage() {
	const navigator = useNavigate();
	return (
		<Background>
			{/* div is the header for the page */}
			<div
				style={{
					backgroundColor: "#000",
					height: "50px",
					width: "100vw",
				}}>
				<ColorButton
					style={{
						position: "relative",
						top: "50%",
						transform: "translate(20%, -50%)",
						paddingLeft: "30px",
						paddingRight: "30px",
						textTransform: "capitalize",
					}}
					onClick={() => navigator("/")}>
					Home
				</ColorButton>
				<Stack
					direction="row"
					spacing={2}
					style={{
						float: "right",
						color: "#fff",
						display: "flex",
						alignItems: "center",
						transform: "translate(-10%, 15%)",
					}}>
					<Avatar
						style={{
							backgroundColor: `${spotifyGreen}`,
							"&:hover": {
								backgroundColor: `${spotifyGreenDark}`,
							}, // need to change so hover animation works
						}}>
						P
					</Avatar>
					<span style={{ fontSize: "20px" }}>Profile</span>
					<ColorButton
						style={{
							textTransform: "capitalize",
							paddingLeft: "20px",
							paddingRight: "20px",
						}}>
						Sign Out
					</ColorButton>
				</Stack>
			</div>
			{/* Stack is the different playlist types */}
			<Stack
				direction="column"
				spacing={2}
				style={{ width: "50%", transform: "translate(50%, 10%)" }}>
				<ICard
					head="Time Playlist"
					text="Make a playlist that runs for a given time based on your recently
					listened."></ICard>
				<ICard
					head="Feature Playlist"
					text="Make a playlist based on specified features."></ICard>
				<ICard
					head="Statistic Playlist"
					text="Make a playlist based on listening statistics."></ICard>
			</Stack>
		</Background>
	);
}
