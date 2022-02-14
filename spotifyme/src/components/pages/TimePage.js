import React, { useState } from "react";
import GeneralPage from "./GeneralPage";
import ICard from "../ItemCard";
import { Stack, TextField, Typography } from "@mui/material";
import { ColorButton } from "../Button";
import { useNavigate } from "react-router-dom";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import Cookies from 'js-cookie';
import { SpotifyApiContext, TrackAnalysis, useArtist } from 'react-spotify-api';
import { SpotifyAuth, SpotifyAuthListener, Scopes } from 'react-spotify-auth';
import { Artist, UserTop, User, useUser } from 'react-spotify-api';
import SpotifyWebApi from 'spotify-web-api-node';
import { arrayOf } from 'prop-types';

const color = '#FFFFFF';

export default function TimePage() {
	const [token, setToken] = useState(Cookies.get('spotifyAuthToken'));

  let spotifyApi = new SpotifyWebApi({
    accessToken: token,
  });

  const tokenHandler = (token) => {
    spotifyApi.setAccessToken(token);
    setToken(token);
  };

  const [value, setValue] = React.useState(null);

  const navigator = useNavigate();

  // const GetUser = (props) => {
  //   const { data } = useUser();

  //   if (data) {
  //     return <h1>{data.birthdate}</h1>;
  //   }
  //   return <h1>Hello</h1>;
  // };

  // function DisplayShit() {
  //   return (
  //     <SpotifyApiContext.Provider value={token}>
  //       <h1>{GetUser()}</h1>
  //     </SpotifyApiContext.Provider>
  //   );
  // }

  // function DisplayUserTopTracks() {
  //   return (
  //     <SpotifyApiContext.Provider value={token}>
  //       <UserTop type="tracks">
  //         {(tracks) =>
  //           tracks && tracks.data ? (
  //             tracks.data.items.map((track, index) => {
  //               return <p key={`${track.name}`}>{track.name}</p>;
  //             })
  //           ) : (
  //             <p>NO TRACKS RETURNED</p>
  //           )
  //         }
  //       </UserTop>
  //     </SpotifyApiContext.Provider>
  //   );
  // }

  // const testSpotifyAPI = () => {
  //   spotifyApi.getMyTopTracks().then(
  //     function (data) {
  //       let topTracks = data.body.items;
  //       Cookies.set('trackRowData', data.body.items);
  //       console.log(topTracks);
  //     },
  //     function (err) {
  //       console.log('Something went wrong!', err);
  //       return null;
  //     }
  //   );
  // };

  // function handleCreationClick() {

  //   spotifyApi.getMyTopTracks({ limit: 10 }, function (err, data) {
  //     if (err) {
  //       console.error('Something went wrong!');
  //     } else {
  //       console.log(data.body);
  //       console.log(data.body.items);

  //       let arr = [];
  //       data.body.items.map((track, index) => arr.push(track));

  //       //Cookies.set('trackRowData', data.body.items);
  //       navigator('/playlistpage', { trackRowData: arr });
  //     }
  //   });
  // }

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
					<ColorButton
						style={{ width: "150px", textTransform: "capitalize" }}
						onClick={() => navigator("/playlistpage")}>
						Create Playlist
					</ColorButton>
				</Stack>
			</div>
		</GeneralPage>
    </LocalizationProvider>
    </div>
	);
}
