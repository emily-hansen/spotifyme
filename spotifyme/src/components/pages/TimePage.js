import React, { useState } from "react";
import GeneralPage from "./GeneralPage";
import ICard from "../ItemCard";
import { Stack, Typography, TextField, MenuItem } from "@mui/material";
import { ColorButton } from "../Button";
import { useNavigate } from "react-router-dom";


export default function TimePage() {

	const navigator = useNavigate();
	return (
		<GeneralPage link="/homepage">
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					height: "calc(100vh - 50px)",
					width: "100vw",
				}}>
				<Stack
					direction="column"
					spacing={2}
					style={{
						alignItems: "center",
					}}>
					<ICard
						nohome
						text="Make a playlist that runs for a given time based on your recently listened."
						style={{
							width: "500px",
							height: "200px",
							justifyContent: "center",
						}}>
						<Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
							
								<Typography variant="h5">Time:</Typography>
								<TextField
									id="time"
									placeholder="00:00:00"
									variant="outlined"
									style={{ backgroundColor: "white", borderRadius: "5px" }}
								/>
						</Stack>
					</ICard>
					<ColorButton style={{ width: "150px", textTransform: "capitalize" }}
						onClick={() => navigator("/playlistpage")}>
						Create Playlist
					</ColorButton>
				</Stack>
			</div>
		</GeneralPage>
	);
}