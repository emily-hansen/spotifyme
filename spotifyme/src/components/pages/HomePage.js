import React from "react";
import { LibraryAddCheck, ShutterSpeed, Speed } from "@mui/icons-material";
import { Stack } from "@mui/material";

import { spotifyGreen } from "../Button";
import ICard from "../ItemCard";
import GeneralPage from "./GeneralPage";

export default function HomePage() {
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
					listened."
					icon={
						<ShutterSpeed
							style={{ width: "200px", height: "128px", color: spotifyGreen }}
						/>
					}></ICard>
				<ICard
					link="/featurepage"
					head="Feature Playlist"
					text="Make a playlist based on specified features."
					icon={
						<LibraryAddCheck
							style={{ width: "200px", height: "128px", color: spotifyGreen }}
						/>
					}></ICard>
				<ICard
					link="/statpage"
					head="Statistic Playlist"
					text="Make a playlist based on listening statistics."
					icon={
						<Speed
							style={{ width: "200px", height: "128px", color: spotifyGreen }}
						/>
					}></ICard>
			</Stack>
		</GeneralPage>
	);
}