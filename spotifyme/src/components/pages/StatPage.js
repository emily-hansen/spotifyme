import React, { useState } from "react";
import GeneralPage from "./GeneralPage";
import ICard from "../ItemCard";
import { Stack, Typography, TextField, MenuItem } from "@mui/material";
import { ColorButton } from "../Button";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

const color = "#FFFFFF";

//TODO: Need to format text field so inputs are always HH:MM:SS
export default function StatPage() {
	const [value, setValue] = React.useState(null);


	/**
	 * 0 = All time
	 * 1 = Past year
	 * 2 = Past month
	 * 3 = Past week
	 * 4 = Past day
	 */
	const [year, setYear] = useState(0);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
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
							<TimePicker
									 ampm={false}
									 views={['hours', 'minutes']}
									 inputFormat="00:00"
									 mask="__:__"
									 label="Playlist Duration"
									 value={value}
									
									 onChange={(newValue) => {
									 	setValue(newValue);
									 }}
									renderInput={(params) => <TextField 
										sx={{ 
											svg: { color },
											input: { color },
											label: { color }
										}}
										{...params}/>}
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
		</LocalizationProvider>
	);
}
