import React, { useState } from "react";
import GeneralPage from "./GeneralPage";
import ICard from "../ItemCard";
import { Stack, Typography, TextField, MenuItem } from "@mui/material";
import { ColorButton } from "../Button";

//TODO: Need to format text field so inputs are always HH:MM:SS
export default function StatPage() {
	/**
	 * 0 = All time
	 * 1 = Past year
	 * 2 = Past month
	 * 3 = Past week
	 * 4 = Past day
	 */
	const [year, setYear] = useState(0);

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
						text="Make a playlist based on listening statistics."
						style={{
							width: "500px",
							height: "200px",
							justifyContent: "center",
						}}>
						<Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
							<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
								<Typography variant="h5">Time:</Typography>
								<TextField
									id="time"
									placeholder="00:00:00"
									variant="outlined"
									style={{ backgroundColor: "white", borderRadius: "5px" }}
								/>
							</Stack>
							<TextField
								value={year}
								select
								onChange={(e) => setYear(e.target.value)}
								sx={{
									backgroundColor: "white",
									borderRadius: "5px",
									width: "200px",
								}}>
								<MenuItem value={0}>All Time</MenuItem>
								<MenuItem value={1}>Past Year</MenuItem>
								<MenuItem value={2}>Past Month</MenuItem>
								<MenuItem value={3}>Past Week</MenuItem>
								<MenuItem value={4}>Past Day</MenuItem>
							</TextField>
						</Stack>
					</ICard>
					<ColorButton style={{ width: "150px", textTransform: "capitalize" }}>
						Create Playlist
					</ColorButton>
				</Stack>
			</div>
		</GeneralPage>
	);
}
