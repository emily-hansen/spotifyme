import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import ICard from "../ItemCard";
import GeneralPage from "./GeneralPage";

export default function HomePage() {
	const navigator = useNavigate();
	return (
		<GeneralPage link="/">
			{/* Stack is the different playlist types */}
			<Stack
				direction="column"
				spacing={2}
				style={{ width: "50%", transform: "translate(50%, 10%)" }}>
				<ICard
					link="/timepage"
					head="Time Playlist"
					text="Make a playlist that runs for a given time based on your recently
					listened."></ICard>
				<ICard
					link="/featurepage"
					head="Feature Playlist"
					text="Make a playlist based on specified features."></ICard>
				<ICard
					link="/statpage"
					head="Statistic Playlist"
					text="Make a playlist based on listening statistics."></ICard>
			</Stack>
		</GeneralPage>
	);
}
