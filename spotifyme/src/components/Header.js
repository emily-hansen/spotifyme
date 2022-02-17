import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Stack } from '@mui/material';
import { ColorButton, spotifyGreen, spotifyGreenDark } from './Button';
import Cookies from 'js-cookie';
import SpotifyWebApi from 'spotify-web-api-node';
import  CircleLoader  from "./Loader"

//TODO: Need to add functionallity for logging out of spotify
export default function Header(props) {
  // Values that have an easily-readable value are best to store as a cookie for now
  const [token, setToken] = useState(Cookies.get('spotifyAuthToken'));
  const [userName, setUserName] = useState(Cookies.get('currUser'));
  const [avatar, setAvatar] = useState(Cookies.get('avatarLink'));
  const [loading, setLoading] = React.useState(false);

  let spotifyApi = new SpotifyWebApi({
    accessToken: token,
  });

  const tokenHandler = (token) => {
    spotifyApi.setAccessToken(token);
    setToken(token);
  };

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
        setLoading(true);
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
        
        {loading ? (<Avatar
          src={avatar}
          style={{
            backgroundColor: `${spotifyGreen}`,
            '&:hover': {
              backgroundColor: `${spotifyGreenDark}`,
            }, // need to change so hover animation works
          }}
        ></Avatar>) : (
          <CircleLoader />
        )
        }
        

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
