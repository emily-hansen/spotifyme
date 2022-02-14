import React, { useEffect, useState } from 'react';
import GeneralPage from './GeneralPage';
import { DataGrid } from '@mui/x-data-grid';
import ICard from '../ItemCard';
import { Stack } from '@mui/material';
import { ColorButton } from '../Button';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SpotifyApiContext } from 'react-spotify-api';
import { SpotifyAuthListener } from 'react-spotify-auth';
import { Artist } from 'react-spotify-api';
import SpotifyWebApi from 'spotify-web-api-node';
import { chainPropTypes } from '@mui/utils';
import PropTypes from 'prop-types';
import { validateDate } from '@mui/lab/internal/pickers/date-utils';
import { BorderVertical } from '@mui/icons-material';

// const columns = [
//   {
//     field: 'songTitle',
//     headerName: 'Title',
//     width: 400,
//     editable: true,
//   },
//   {
//     field: 'artist',
//     headerName: 'Artist',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'Album',
//     headerName: 'Album',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'time',
//     headerName: 'Time',
//     width: 100,
//   },
// ];

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 400,
    editable: true,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'track_id',
    headerName: 'Track ID',
    width: 400,
    editable: true,
  },
];

export default function PlaylistPage() {
  let [rows, setRows] = useState([]);

  const [token, setToken] = useState(Cookies.get('spotifyAuthToken'));

  const tokenHandler = (token) => {
    console.log(token);
    setToken(token);
  };

  let spotifyApi = new SpotifyWebApi({
    accessToken: token,
  });

  const getTracks = () => {
    spotifyApi.getMyTopTracks({ limit: 10 }, function (err, data) {
      if (err) {
        console.error('Something went wrong!');
      } else {
        //console.log(data.body.items);
        //data.body.items.forEach((track) => arr.push(track));
        //console.log(arr);
        //let arr = [];
        let response = [];

        data.body.items.forEach(function (value, index) {
          response.push({
            id: index + 1,
            title: value.name,
            track_id: value.id,
          });
        });
        console.log(response);

        // data.body.items.forEach((index) => response.push({ id: index, title: index.name }));
        // console.log(response);

        setRows(response);
        //setRows(arr);
      }
    });

    console.log(rows);
    return rows;
  };

  let update = 0;

  useEffect(getTracks, update);

  const navigator = useNavigate();
  return (
    <div>
      <SpotifyAuthListener onAccessToken={(token) => tokenHandler(token)} />
      <GeneralPage link="/homepage">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 50px)',
            width: '100vw',
          }}
        >
          <Stack
            direction="column"
            spacing={2}
            style={{
              alignItems: 'center',
            }}
          >
            <ICard
              nohome="true"
              head="Playlist"
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Stack direction="column" spacing={2} sx={{ alignItems: 'center' }}>
                <div
                  style={{
                    height: 400,
                    width: 1000,
                    backgroundColor: '#181818',
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    sx={{ color: 'white' }}
                  />
                </div>
              </Stack>
            </ICard>
            <ColorButton
              style={{ width: '150px', textTransform: 'capitalize' }}
              onClick={() => navigator('/homepage')}
            >
              Create New
            </ColorButton>
          </Stack>
        </div>
      </GeneralPage>
    </div>
  );
}
