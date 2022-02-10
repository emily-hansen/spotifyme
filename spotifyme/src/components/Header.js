import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Stack } from "@mui/material";
import { ColorButton, spotifyGreen, spotifyGreenDark } from "./Button";

//TODO: Need to add functionallity for logging out of spotify
export default function Header(props) {
	const navigator = useNavigate();
	return (
		<div
			style={{
				backgroundColor: "#000",
				height: "50px",
				width: "100vw",
			}}>
			<ColorButton
				style={{
					position: "relative",
					top: "50%",
					transform: "translate(20%, -50%)",
					paddingLeft: "30px",
					paddingRight: "30px",
					textTransform: "capitalize",
				}}
				onClick={() => navigator(props.link)}>
				Home
			</ColorButton>
			<Stack
				direction="row"
				spacing={2}
				style={{
					float: "right",
					color: "#fff",
					display: "flex",
					alignItems: "center",
					transform: "translate(-10%, 15%)",
				}}>
				<Avatar
					style={{
						backgroundColor: `${spotifyGreen}`,
						"&:hover": {
							backgroundColor: `${spotifyGreenDark}`,
						}, // need to change so hover animation works
					}}>
					P
				</Avatar>
				<span style={{ fontSize: "20px" }}>Profile</span>
				<ColorButton
					style={{
						textTransform: "capitalize",
						paddingLeft: "20px",
						paddingRight: "20px",
					}}
					onClick={() => navigator("/")}>
					Sign Out
				</ColorButton>
			</Stack>
		</div>
	);
}
