import React, { useState } from "react";
import GeneralPage from "./GeneralPage";
import ICard from '../ItemCard';
import { Stack, TextField, Typography } from '@mui/material';
import { ColorButton } from '../Button';
import { useNavigate } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import Cookies from 'js-cookie';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import SpotifyWebApi from 'spotify-web-api-node';
import  CircleLoader  from "../Loader"

const color = '#FFFFFF';

export default function TimePage() {
	const [token, setToken] = useState(Cookies.get('spotifyAuthToken'));

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
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

  const [value, setValue] = React.useState(null);

  const navigator = useNavigate();

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <GeneralPage link="/homepage">
          <div>
            {token ? (
              console.log('Access Token Validated!')
            ) : (
              <SpotifyAuth
                redirectUri="http://localhost:3000/timepage"
                clientID="b3f5de56c9334d679e5f34871927c2cc"
                scopes={[
                  Scopes.userReadPrivate,
                  Scopes.userLibraryModify,
                  Scopes.userLibraryRead,
                  Scopes.playlistModifyPrivate,
                  Scopes.playlistReadCollaborative,
                  Scopes.userReadEmail,
                  Scopes.userTopRead,
                  Scopes.playlistModifyPublic,
                  Scopes.userReadRecentlyPlayed,
                ]}
                onAccessToken={(token) => tokenHandler(token)}
                noLogo={true}
              />
            )}
          </div>
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
					<ColorButton style={{ width: "150px", textTransform: "capitalize" }}
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
    </LocalizationProvider>
    </div>
	);
}
