import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import Cookies from "js-cookie";
import SpotifyWebApi from "spotify-web-api-node";

import GeneralPage from "./GeneralPage";
import ICard from '../ItemCard';
import { ColorButton } from '../Button';
import  CircleLoader  from "../Loader";
import TimeInput from "../TimeInput";
import { timeToMs } from "../timeToMs";

const color = "#FFFFFF";

export default function TimePage() {
	const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef();
  
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setLoading(false);
		navigator("/playlistpage");
      }, 2000);
    }
  };

  let spotifyApi = new SpotifyWebApi({
    accessToken: token,
  });

	const tokenHandler = (token) => {
		spotifyApi.setAccessToken(token);
		setToken(token);
	};

	const [value, setValue] = React.useState("HH:MM:SS");

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
							<TimeInput value={value} setValue={setValue} />
						</Stack>
					</ICard>
					<ColorButton style={{ width: "150px" }}
						disabled={loading}
						onClick={handleButtonClick}>
						Create Playlist
						{loading && (
							<CircleLoader></CircleLoader>
						)}
					</ColorButton>
				</Stack>
			</div>
		</GeneralPage>
	);
}
