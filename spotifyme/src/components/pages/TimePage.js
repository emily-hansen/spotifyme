import React, { useState } from "react";
import GeneralPage from "./GeneralPage";
import ICard from "../ItemCard";
import { Stack, TextField, Typography } from "@mui/material";
import { ColorButton } from "../Button";
import { useNavigate } from "react-router-dom";

const color = "#FFFFFF";

export default function TimePage() {
	const navigator = useNavigate();
	const [value, setValue] = useState(null);

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
						text="Make a playlist that runs for a given time based on your recently listened."
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
							<Typography variant="h5" sx={{ color: color }}>
								Time:
							</Typography>
							<TextField
								sx={{
									backgroundColor: color,
									borderRadius: "5px",
								}}
								placeholder="00:00:00"
								value={value}
								onChange={(e) => {
									let newValue = e.target.value.replace(/[^0-9]/g, "");
									if (newValue.length === 3 || newValue.length === 4) {
										newValue =
											newValue.substring(0, 2) + ":" + newValue.substring(2);
									} else if (newValue.length === 5 || newValue.length === 6) {
										newValue =
											newValue.substring(0, 2) +
											":" +
											newValue.substring(2, 4) +
											":" +
											newValue.substring(4);
									} else if (newValue.length > 6) {
										newValue =
											newValue.substring(0, 2) +
											":" +
											newValue.substring(2, 4) +
											":" +
											newValue.substring(4, 6);
									}
									setValue(newValue);
								}}
							/>
						</Stack>
					</ICard>
					<ColorButton
						style={{ width: "150px", textTransform: "capitalize" }}
						onClick={() => navigator("/playlistpage")}>
						Create Playlist
					</ColorButton>
				</Stack>
			</div>
		</GeneralPage>
	);
}
