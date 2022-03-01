import React, { useEffect, useState, useRef } from 'react';
import GeneralPage from './GeneralPage';
import { DataGrid } from '@mui/x-data-grid';
import ICard from '../ItemCard';
import { Stack, Avatar, ToggleButtonGroup, ToggleButton, styled } from '@mui/material';
import Cookies from 'js-cookie';
import { SpotifyAuthListener } from 'react-spotify-auth';
import SpotifyWebApi from 'spotify-web-api-node';

export const SelectionGroup = styled(ToggleButtonGroup)(() => ({
    boxShadow: "0px 0px 10px #000", 
    justifyContent: 'center',
    alignItems: 'center',
})); 

export const SelectionButton = styled(ToggleButton)(() => ({
    fontWeight: 'bold',
    fontSize: '15px',
    textTransform: "capitalize",
    margin: "8px",
    width: "210px",
    height: "50px",
	  color: "#d4d4d4",
	"&:hover": {
        "&.Mui-selected": {
            color: "#fff",
            backgroundColor: "#1DB954"
        },
        color: "#fff",
        boxShadow: "0px 0px 10px #fff",
	},
    "&.Mui-selected": {
		color: "#fff",
        backgroundColor: "#1DB954"
    }
}));

const trackColumns = [
  {
    field: 'id',
    headerName: 'Rank',
    align: 'center',
    width: 100,
    editable: false,
  },
  {
    field: 'title',
    headerName: 'Title',
    renderCell: function (params) {
      return (
        <>
          <Avatar src={params.value.art} variant="square" sizes="small"></Avatar>
          <span display="inline" style={{ marginInlineStart: '25px' }}>
            {params.value.track}
          </span>
        </>
      );
    },
    width: 600,
    justifyContent: 'left',
    editable: false,
  },
  {
    field: 'artist',
    headerName: 'Artist',
    width: 350,
    editable: false,
  }
];

const artistColumns = [
    {
      field: 'id',
      headerName: 'Rank',
      align: 'center',
      width: 100,
      editable: false,
    },
    {
      field: 'artist',
      headerName: 'Artist',
      renderCell: function (params) {
        return (
          <>
            <Avatar src={params.value.art} variant="square" sizes="small"></Avatar>
            <span display="inline" style={{ marginInlineStart: '25px' }}>
              {params.value.artist}
            </span>
          </>
        );
      },
      width: 700,
      editable: false,
    }
  ];

export default function PlaylistPage() {
  const [topSelected, setTopSelection] = React.useState('tracks');
  const [timeSelected, setTimeSelection] = React.useState('short_term');
  let [trackRows, setTrackRows] = useState([]);
  let [artistRows, setArtistRows] = useState([]);

  const [token, setToken] = useState(Cookies.get('spotifyAuthToken'));

  const tokenHandler = (token) => {
    console.log(token);
    setToken(token);
  };

  let spotifyApi = new SpotifyWebApi({
    accessToken: token,
  });

  const getTracks = () => {
    spotifyApi.getMyTopTracks({ limit: 50, time_range: timeSelected }, function (err, data) {
      if (err) {
        console.error('Something went wrong!');
      } else {
        console.log(data.body.items);
        let response = [];

        data.body.items.forEach(function (value, index) {
          let artistArray = value.artists[0].name;
          let albumArt = value.album.images[0].url;

          response.push({
            id: index + 1,
            title: { art: albumArt, track: value.name },
            artist: artistArray,
            album: value.album.name,
          });
        });

        setTrackRows(response);
      }
    });

    return trackRows;
  };

  const getArtists = () => {
    spotifyApi.getMyTopArtists({ limit: 50, time_range: timeSelected }, function (err, data) {
      if (err) {
        console.error('Something went wrong!');
      } else {
        console.log(data.body.items);
        let response = [];

        data.body.items.forEach(function (value, index) {
          let artistArray = value.name;
          let albumArt = value.images[0].url;

          response.push({
            id: index + 1,
            artist: { art: albumArt, artist: artistArray },
          });
        });

        setArtistRows(response);
      }
    });

    console.log(artistRows);
    return artistRows;
  };

  const handleTopSelection = (event, newTopSelection) => {
    if (newTopSelection !== null) {
        setTopSelection(newTopSelection);
    }
  };

  const handleTimeSelection = (event, newTimeSelection) => {
    if (newTimeSelection !== null) {
        setTimeSelection(newTimeSelection);
    }
  };

  useEffect(getTracks, []);
  useEffect(getArtists, []);

  const didTrackMount = useRef(false);
  const didArtistMount = useRef(false);

  useEffect(() => {
    if(didTrackMount.current) {
      getTracks();
      getArtists();
    }
    else {
      didTrackMount.current = true;
    }
  }, [timeSelected]);

  useEffect(() => {
    if(didArtistMount.current) {
      getTracks();
      getArtists();
    }
    else {
      didArtistMount.current = true;
    }
  }, [topSelected]);

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
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                textAlign: "center",
              }}
            >
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
                <SelectionGroup
                    value={topSelected}
                    exclusive
                    onChange={handleTopSelection}
                    aria-label="stat selction">
                        <SelectionButton value="tracks">
                        Top Tracks
                        </SelectionButton>
                        <SelectionButton value="artists">
                        Top Artist
                        </SelectionButton>
                </SelectionGroup>

                <SelectionGroup
                    value={timeSelected}
                    exclusive
                    onChange={handleTimeSelection}
                    aria-label="stat selction">
                        <SelectionButton value="short_term">
                        Last Month
                        </SelectionButton>
                        <SelectionButton value="medium_term">
                        Last 6 Months
                        </SelectionButton>
                        <SelectionButton value="long_term">
                        All Time
                        </SelectionButton>
                </SelectionGroup>
            </Stack>

              <Stack direction="column" spacing={2} sx={{ alignItems: 'center' }}>
                <div
                  style={{
                    height: 500,
                    width: 1105,
                    backgroundColor: '#181818',
                  }}
                >
                    {topSelected === 'tracks' ? 
                    (<DataGrid
                        rows={trackRows}
                        columns={trackColumns}
                        pageSize={50}
                        rowsPerPageOptions={[50]}
                        sx={{ color: 'white' }}
                        rowHeight={50}
                      />) : topSelected === 'artists' ?
                    (<DataGrid
                        rows={artistRows}
                        columns={artistColumns}
                        pageSize={50}
                        rowsPerPageOptions={[50]}
                        sx={{ color: 'white' }}
                        rowHeight={50}
                    />) : null}
                </div>
              </Stack>
            </ICard>
          </Stack>
        </div>
      </GeneralPage>
    </div>
  );
}

