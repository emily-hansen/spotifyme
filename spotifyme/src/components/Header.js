import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Stack } from '@mui/material';
import { ColorButton, spotifyGreen, spotifyGreenDark } from './Button';
import { SpotifyAuthListener } from 'react-spotify-auth';
import Cookies from 'js-cookie';
import SpotifyWebApi from 'spotify-web-api-node';
import { User, SpotifyApiContext } from 'react-spotify-api';

//TODO: Need to add functionallity for logging out of spotify
export default function Header(props) {
  const [token, setToken] = useState(Cookies.get('spotifyAuthToken'));
  const [userName, setUserName] = useState(Cookies.get('currUser'));
  const [avatar, setAvatar] = useState(Cookies.get('avatarLink'));
  let spotifyApi = new SpotifyWebApi({
    accessToken: token,
  });

  const tokenHandler = (token) => {
    spotifyApi.setAccessToken(token);
    setToken(token);
  };
  function DisplayUsername() {
    return (
      <SpotifyApiContext.Provider value={token}>
        <User>
          {(user) =>
            user && user.data ? (
              <>
                <p>Welcome, {user.data.display_name}</p>
              </>
            ) : (
              <p>Loading...</p>
            )
          }
        </User>
      </SpotifyApiContext.Provider>
    );
  }

  // This function get, sets, and creates Cookies for current User's username and avatar
  const getCurrUser = () => {
    spotifyApi.getMe(function (err, data) {
      if (err) {
        console.error('Something went wrong');
      } else {
        console.log(data.body);
        let response = data.body.display_name;
        Cookies.set('currUserName', response);
        let imres = [];
        data.body.images.forEach(function (value, index) {
          imres.push(value.url);
        });

        Cookies.set('avatarLink', imres[0]);
        setAvatar(imres[0]);
        setUserName(response);
      }
    });
  };

  useEffect(getCurrUser, []);

  const navigator = useNavigate();
  return (
    <div
      style={{
        backgroundColor: '#000',
        height: '50px',
        width: '100vw',
      }}
    >
      <ColorButton
        style={{
          position: 'relative',
          top: '50%',
          transform: 'translate(20%, -50%)',
          paddingLeft: '30px',
          paddingRight: '30px',
          textTransform: 'capitalize',
        }}
        onClick={() => navigator(props.link)}
      >
        Home
      </ColorButton>
      <Stack
        direction="row"
        spacing={2}
        style={{
          float: 'right',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          transform: 'translate(-10%, 15%)',
        }}
      >
        <Avatar
          src={avatar}
          style={{
            backgroundColor: `${spotifyGreen}`,
            '&:hover': {
              backgroundColor: `${spotifyGreenDark}`,
            }, // need to change so hover animation works
          }}
        ></Avatar>

        <span style={{ fontSize: '20px' }}>{userName}</span>
        <ColorButton
          style={{
            textTransform: 'capitalize',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
          onClick={() => navigator('/')}
        >
          Sign Out
        </ColorButton>
      </Stack>
    </div>
  );
}
