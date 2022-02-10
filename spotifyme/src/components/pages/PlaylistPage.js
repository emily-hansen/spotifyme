import React from "react";
import GeneralPage from "./GeneralPage";
import { DataGrid } from "@mui/x-data-grid";
import ICard from "../ItemCard";
import { Stack } from "@mui/material";
import { ColorButton } from "../Button";
import { useNavigate } from "react-router-dom";

const columns = [
	{
		field: "songTitle",
		headerName: "Title",
		width: 400,
		editable: true,
	},
	{
		field: "artist",
		headerName: "Artist",
		width: 150,
		editable: true,
	},
	{
		field: "Album",
		headerName: "Album",
		width: 150,
		editable: true,
	},
	{
		field: "time",
		headerName: "Time",
		width: 100,
	},
];

const rows = [];

export default function PlaylistPage() {
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
						nohome="true"
						head="Playlist"
						style={{
							width: "100%",
							height: "100%",
							justifyContent: "center",
						}}>
						<Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
							<div
								style={{
									height: 400,
									width: 1000,
									backgroundColor: "#181818",
								}}>
								<DataGrid
									rows={rows}
									columns={columns}
									pageSize={9}
									rowsPerPageOptions={[5]}
									sx={{ color: "white" }}
								/>
							</div>
						</Stack>
					</ICard>
					<ColorButton
						style={{ width: "150px", textTransform: "capitalize" }}
						onClick={() => navigator("/homepage")}>
						Create New
					</ColorButton>
				</Stack>
			</div>
		</GeneralPage>
	);
}
