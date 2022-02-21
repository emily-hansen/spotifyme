import React, { useEffect, useState, useRef } from 'react';
import GeneralPage from './GeneralPage';
import { DataGrid } from '@mui/x-data-grid';
import ICard from '../ItemCard';
import { makeStyles, InputLabel, MenuItem, FormControl, Select, Accordion, AccordionSummary, AccordionDetails, Stack, Avatar, ToggleButtonGroup, ToggleButton, styled, Paper, Typography } from '@mui/material';
import { ColorButton } from '../Button';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { SpotifyAuthListener } from 'react-spotify-auth';
import SpotifyWebApi from 'spotify-web-api-node';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

export const CustomAccordion = styled(Accordion)(() => ({
  backgroundColor: '#000',
  margin: "8px",
  color: "#d4d4d4",
  "&:hover": {
    color: "#fff",
    boxShadow: "0px 0px 10px #fff",
  },
}));

export const CustomAccordionSummary = styled(AccordionSummary)(() => ({
  fontWeight: 'bold',
  fontSize: '15px',
  textTransform: "capitalize",
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
          <Avatar src={params.value.art} variant="square" sx={{ width: 70, height: 70 }}></Avatar>
          <span display="inline" style={{ marginInlineStart: '25px' }}>
            {params.value.track}
          </span>
        </>
      );
    },
    width: 400,
    justifyContent: 'left',
    editable: false,
  },
  {
    field: 'artist',
    headerName: 'Artist',
    width: 200,
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
            <Avatar src={params.value.art} variant="square" sx={{ width: 70, height: 70 }}></Avatar>
            <span display="inline" style={{ marginInlineStart: '25px' }}>
              {params.value.artist}
            </span>
          </>
        );
      },
      width: 300,
      editable: false,
    }
  ];

export default function PlaylistPage() {
  const [itemSize, setItemSize] = React.useState(10);
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
        let devResponse = []; // this one includes the track ids (maybe for alternative usage?)

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
        let devResponse = []; // this one includes the track ids (maybe for alternative usage?)

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

  const handleItemSize = (event) => {
    setItemSize(event.target.value);
  }

  const didMountTracks = useRef(false);
  const didMountArtists = useRef(false);
  const didMountSize = useRef(false);

  useEffect(() => {
    if(didMountTracks.current) {
      getTracks();
      getArtists();
    }
    else {
        didMountTracks.current = true;
    }
  }, [timeSelected]);

  useEffect(() => {
    if(didMountArtists.current) {
      getTracks();
      getArtists();
    }
    else {
        didMountArtists.current = true;
    }
  }, [topSelected]);


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
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
              <CustomAccordion>
                <CustomAccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }}/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  Advanced Options
                </CustomAccordionSummary>

                <AccordionDetails
                  sx={{backgroundColor: "#1DB954"}}>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
                    <Typography sx={{fontWeight: 'bold', fontSize: '15px', textTransform: "capitalize"}}>
                      Items per Page: 
                    </Typography>

                    <FormControl fullwidth>
                      <InputLabel id='item-size-select-label' sx={{ color: '#fff'}}>Item Size</InputLabel>
                      <Select
                        labelId='item-size-select-label'
                        id='item-size-select'
                        value={itemSize}
                        label='Item Size'
                        autoWidth
                        onChange={handleItemSize}>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                          <MenuItem value={40}>Fourty</MenuItem>
                          <MenuItem value={50}>Fifty</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </AccordionDetails>
              </CustomAccordion>
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
                        pageSize={itemSize}
                        rowsPerPageOptions={[10]}
                        sx={{ color: 'white' }}
                        rowHeight={100}
                      />) : topSelected === 'artists' ?
                    (<DataGrid
                        rows={artistRows}
                        columns={artistColumns}
                        pageSize={itemSize}
                        rowsPerPageOptions={[10]}
                        sx={{ color: 'white' }}
                        rowHeight={100}
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

