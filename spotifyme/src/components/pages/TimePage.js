import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Alert, Snackbar } from "@mui/material";

import GeneralPage from "./GeneralPage";
import ICard from "../ItemCard";
import { ColorButton } from "../Button";
import TimeInput from "../TimeInput";

export default function TimePage() {
	const navigator = useNavigate();
	const [error, setError] = useState(false);
	const [value, setValue] = useState(
		localStorage.getItem("time") || "HH:MM:SS"
	);

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
						text="Make a playlist that runs for a given time based on your recent top songs."
						style={{
							width: "500px",
							height: "200px",
							justifyContent: "center",
						}}>
						<Stack
							direction="row"
							spacing={2}
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Typography variant="h5" sx={{ color: "#fff" }}>
								Time:
							</Typography>
							<TimeInput
								value={value}
								error={error}
								setError={setError}
								setValue={setValue}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										if (value.replace(/[^1-9]/g, "").length === 0) {
											setError(true);
											return;
										}
										localStorage.setItem("time", value);
										navigator("/playlistpage");
									}
								}}
							/>
						</Stack>
					</ICard>
					<ColorButton
						style={{ width: "150px" }}
						onClick={() => {
							if (value.replace(/[^1-9]/g, "").length === 0) {
								setError(true);
								return;
							}
							navigator("/playlistpage");
						}}>
						Create Playlist
					</ColorButton>
				</Stack>
			</div>
			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				open={error}
				autoHideDuration={3000}
				onClose={() => setError(false)}>
				<Alert severity="error">Please enter a valid time.</Alert>
			</Snackbar>
		</GeneralPage>
	);
}
