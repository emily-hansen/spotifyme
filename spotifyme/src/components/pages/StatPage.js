import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, TextField, MenuItem } from "@mui/material";

import GeneralPage from "./GeneralPage";
import ICard from "../ItemCard";
import { ColorButton } from "../Button";
import TimeInput from "../TimeInput";

const color = "#FFFFFF";

export default function StatPage() {
	const navigator = useNavigate();
	/**
	 * 0 = All time
	 * 1 = Past year
	 * 2 = Past month
	 * 3 = Past week
	 * 4 = Past day
	 */
	const [year, setYear] = useState(0);
	const [value, setValue] = useState("HH:MM:SS");

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
						nohome="true"
						text="Make a playlist based on listening statistics."
						style={{
							width: "500px",
							height: "200px",
							justifyContent: "center",
						}}>
						<Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
							<Stack
								direction="row"
								spacing={2}
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}>
								<Typography variant="h5" sx={{ color: color }}>
									Time:
								</Typography>
								<TimeInput value={value} setValue={setValue} />
							</Stack>
							<TextField
								value={year}
								select
								onChange={(e) => setYear(e.target.value)}
								sx={{
									backgroundColor: color,
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
					<ColorButton
						style={{ width: "150px" }}
						onClick={() => navigator("/playlistpage")}>
						Create Playlist
					</ColorButton>
				</Stack>
			</div>
		</GeneralPage>
	);
}
