import React, { useState } from "react";
import GeneralPage from "./GeneralPage";
import ICard from "../ItemCard";
import { Stack, Typography, TextField, MenuItem } from "@mui/material";
import { ColorButton } from "../Button";
import { useNavigate } from "react-router-dom";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

const color = "#FFFFFF";

export default function TimePage() {

	const [value, setValue] = React.useState(null);

	const navigator = useNavigate();
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
						nohome="true"
						text="Make a playlist that runs for a given time based on your recently listened."
						style={{
							width: "500px",
							height: "200px",
							justifyContent: "center",
						}}>
						<Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
							
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
					</ICard>
					<ColorButton style={{ width: "150px", textTransform: "capitalize" }}
						onClick={() => navigator("/playlistpage")}>
						Create Playlist
					</ColorButton>
				</Stack>
			</div>
		</GeneralPage>
		</LocalizationProvider>
	);
}