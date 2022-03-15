import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Alert,
	Avatar,
	Box,
  Button,
	IconButton,
	Modal,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Cookies from "js-cookie";
import { SpotifyAuthListener } from "react-spotify-auth";
import SpotifyWebApi from "spotify-web-api-node";

import ICard from "../ItemCard";
import { ColorButton } from "../Button";
import GeneralPage from "./GeneralPage";
import CircleLoader from "../Loader";
import PlayListGenerator_simple from '../PlaylistGen';
import { timeToMs } from '../timeToMs';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
const columns = [
  {
    field: 'id',
    headerName: 'Track #',
    align: 'center',
    width: 100,
    editable: false,
    hide: true,
  },
  {
    field: 'title',
    headerName: 'Title',
    renderCell: function (params) {
      return (
        <>
          <Avatar
            src={params.value.art}
            variant="square"
            sx={{ width: 45, height: 45, paddingLeft: 0.4 }}
          ></Avatar>
          <span display="inline" style={{ marginInlineStart: '25px' }}>
            {params.value.track}
          </span>
        </>
      );
    },
    flex: 1,
    justifyContent: 'left',
    editable: false,
  },
  {
    field: 'artist',
    headerName: 'Artist',
    flex: 0.6,
    editable: false,
  },
  {
    field: 'album',
    headerName: 'Album',
    flex: 0.7,
    editable: false,
  },
  {
    field: 'duration',
    headerName: 'Track Length',

    align: 'center',
    valueFormatter: (params) => {
      let milli = params.value;
      let seconds = ((milli % 60000) / 1000).toFixed(0);
      let minutes = Math.floor(milli / 60000);
      let hours = Math.floor(minutes / 60);

      if (hours > 0) minutes = minutes % 60;

      var finalSecond = seconds < 10 ? `0${seconds}` : `${seconds}`;
      var finalMinute = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
      let finalHour = hours < 10 ? (hours === 0 ? '' : `0${hours}:`) : `${hours}:`;

      return finalHour + finalMinute + finalSecond;
    },
    flex: 0.3,
    editable: false,
    hideable: true,
  },
];

export default function PlaylistPage() {
  const navigator = useNavigate();
  const [rows, setRows] = useState([]);
  const [token, setToken] = useState(Cookies.get('spotifyAuthToken'));
  const [loading, setLoading] = useState(false);
  const [savedPlaylist, setSavedPlaylist] = useState([null, false]);
  const [playlistSaved, setPlaylistSaved] = useState(false);
  const [info, setInfo] = useState(['', '']);

  const [searchFieldVal, setSearchFieldVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultDisplay, setSearchResultDisplay] = useState('hidden');
  const [searchLoading, setSearchLoading] = useState(true);

  const [addSongButtonColor, setAddSongButtonColor] = useState('#1DB954');
  const [searchButtonColor, setSearchButtonColor] = useState('#1DB954');
  const [cancelButtonColor, setCancelButtonColor] = useState('#1DB954');
  const [addButtonColor, setAddButtonColor] = useState('#1DB954');

  const [addSongButtonText, setAddSongButtonText] = useState('white');
  const [addSongButtonVis, setAddSongButtonVis] = useState('block');
  const [searchButtonVis, setSearchButtonVis] = useState('none');
  const [cancelButtonVis, setCancelButtonVis] = useState('none');

  const [searchFieldVis, setSearchFieldVis] = useState('none');

  let addSongModalHeight = `${Math.imul(searchResults.length, 62)}`;
  let spotifyApi = new SpotifyWebApi({
    accessToken: token,
  });

  const addTrackColumns = [
    {
      field: 'id',
      headerName: 'Track #',
      align: 'center',
      width: 100,
      editable: false,
      hide: true,
    },
    {
      field: 'title',
      headerName: 'Title',
      renderCell: function (params) {
        return (
          <>
            <IconButton onClick={() => handlePlusClick(params)}>
              <AddCircleOutlineOutlinedIcon sx={{ color: 'white' }} />
            </IconButton>
            <Avatar
              src={params.value.art}
              variant="square"
              sx={{ width: 45, height: 45, paddingLeft: 0.4 }}
            ></Avatar>
            <span display="inline" style={{ marginInlineStart: '25px' }}>
              {params.value.track}
            </span>
          </>
        );
      },
      flex: 1,
      justifyContent: 'left',
      editable: false,
    },
    {
      field: 'artist',
      headerName: 'Artist',
      flex: 0.5,
      editable: false,
    },
    {
      field: 'album',
      headerName: 'Album',
      flex: 0.6,
      editable: false,
    },
    {
      field: 'duration',
      headerName: 'Track Length',

      align: 'center',
      valueFormatter: (params) => {
        let milli = params.value;
        let seconds = ((milli % 60000) / 1000).toFixed(0);
        let minutes = Math.floor(milli / 60000);
        let hours = Math.floor(minutes / 60);

        if (hours > 0) minutes = minutes % 60;

        var finalSecond = seconds < 10 ? `0${seconds}` : `${seconds}`;
        var finalMinute = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
        let finalHour = hours < 10 ? (hours === 0 ? '' : `0${hours}:`) : `${hours}:`;

        return finalHour + finalMinute + finalSecond;
      },
      //width: 150,
      flex: 0.2,
      editable: false,
      hideable: true,
    },
  ];

  const tokenHandler = (token) => {
    setToken(token);
  };

  const handleSearchFieldChange = (event) => {
    setSearchFieldVal(event.target.value);
  };

  const handleMouseEnterSongButton = () => {
    setAddSongButtonText('#1DB954');
    setAddSongButtonColor('#178E41');
  };

  const handleMouseExitSongButton = () => {
    setAddSongButtonColor('#1DB954');
    setAddSongButtonText('white');
  };

  const handleMouseEnterSearchButton = () => {
    setSearchButtonColor('#178E41');
  };

  const handleMouseExitSearchButton = () => {
    setSearchButtonColor('#1DB954');
  };

  const handleMouseEnterCancelButton = () => {
    setCancelButtonColor('#178E41');
  };

  const handleMouseExitCancelButton = () => {
    setCancelButtonColor('#1DB954');
  };

  const handleAddButtonClick = () => {
    setAddSongButtonVis('none'); // hide Add Song button
    setSearchFieldVis('block'); // display Search Field
    setSearchButtonVis('inline'); // Display Search Button
    setCancelButtonVis('inline'); // Display Cancel Button
  };
  const handleCancelButtonClick = () => {
    setAddSongButtonVis('block');
    setSearchFieldVis('none');
    setSearchFieldVal('');
    setSearchButtonVis('none');
    setCancelButtonVis('none');
    setSearchFieldVal('');
    setSearchResults([]);
  };

  const handleSearchAbort = () => {
    setSearchFieldVal('');
    setSearchResults([]);
  };

  const handlePlusClick = (params) => {
    console.log(params.value.trackId);
    let currSearchRows = searchResults;
    let currPlaylistRows = [];
    rows.forEach((item) => currPlaylistRows.push(item));

    // Get song object to add
    let songToAdd = currSearchRows.find((el) => el.title.trackId == params.value.trackId);
    console.log(songToAdd);

    // Remove song from results
    let res = currSearchRows.filter((item) => item !== songToAdd);
    console.log(res);

    // set updated result list
    setSearchResults(res);

    // set updated playlist
    currPlaylistRows.push(songToAdd);
    console.log(currPlaylistRows);
    setRows(currPlaylistRows);
  };

  /*********************************** EXECUTE SEARCH FOR TRACKS ******************************************/

  const executeSearch = () => {
    spotifyApi.searchTracks(`${searchFieldVal}`, { limit: 10 }, function (err, data) {
      if (err) {
        console.error('Error occurred while searching for tracks');
      } else {
        let response = [];

        data.body.tracks.items.forEach(function (value, index) {
          let id = value.id;
          let trackName = value.name;
          let trackArt = value.album.images[1].url;

          let artist = value.artists[0].name;

          let album = value.album.name;
          let duration = value.duration_ms;

          response.push({
            id: index + 1,
            title: { art: trackArt, track: trackName, trackId: id },
            artist: artist,
            album: album,
            duration: duration,
          });
        });
        setSearchResults(response);
      }
    });

    setTimeout(setSearchResultDisplay('visible'), 1000);
    setTimeout(setSearchLoading(false), 1000);
  };

  /*********************************** GET TRACKS ******************************************/

  const getTracks = () => {
    spotifyApi.getMyTopTracks({ limit: 50 }, function (err, data) {
      if (err) {
        console.error('Something went wrong!');
      } else {
        let response = [];
        // "response" stores User's top 50 items

        data.body.items.forEach(function (value, index) {
          let artistArray = value.artists[0].name;
          response.push({
            id: index + 1,
            title: { art: value.album.images[0].url, track: value.name },
            artist: artistArray,
            album: value.album.name,
            duration: value.duration_ms,
            songID: value.id,
          });
        });

        // create an array  [[id, length], [id, length], ..., [id, length]]
        let array = new Array(50);
        for (let i = 0; i < 50; i++) {
          array[i] = new Array(2);
          array[i][0] = i + 1; //id
          array[i][1] = response[i].duration; //length
        }

        // stores id of the songs selected (result from PlaylistGen,js)
        let selected_songs = PlayListGenerator_simple(
          timeToMs(localStorage.getItem('time')),
          array
        ); // a playlist that lasts a given duration

        let result = [];
        for (let i = 0; i < selected_songs.length; i++) {
          result.push(response[selected_songs[i] - 1]);
        }

        setRows(result);
        setLoading(true);
      }
    });

    return rows;
  };

  /*********************************** SAVE PLAYLIST ******************************************/

  // Saves playlist to user's Spotify account
  const savePlaylist = () => {
    spotifyApi
      .createPlaylist(Cookies.get('spotifyUserID'), {
        name: info[0] === '' ? 'New Playlist' : info[0],
        public: true,
        description: info[1],
      })
      .then((data) => {
        spotifyApi
          .addTracksToPlaylist(
            data.body.id,
            rows.map((row) => `spotify:track:${row.songID}`)
          )
          .then((data) => {
            setSavedPlaylist(['saved', false]);
            setPlaylistSaved(false);
            setInfo(['', '']);
          })
          .catch((err) => {
            setSavedPlaylist(['error', false]);
            setPlaylistSaved(false);
            setInfo(['', '']);
            console.log(err);
          });
      })
      .catch((err) => {
        setSavedPlaylist(['error', false]);
        setPlaylistSaved(false);
        setInfo(['', '']);
        console.log(err);
      });
  };

  /********************************************************************************************/

  useEffect(getTracks, []);
  return (
    <>
      <SpotifyAuthListener onAccessToken={(token) => tokenHandler(token)} />
      <GeneralPage link="/homepage">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 50px)',
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
                width: '70vw',
                minHeight: '50vh',
                maxHeight: '100%',
                justifyContent: 'center',
              }}
            >
              <Stack direction="column" spacing={2} sx={{ alignItems: 'center' }}>
                <div
                  style={{
                    height: Math.imul(62, rows.length) + 58,
                    maxHeight: '50vh',
                    width: '60vw',
                    backgroundColor: '#181818',
                  }}
                >
                  {loading ? (
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={50}
                      rowsPerPageOptions={[50]}
                      sx={{ color: 'white', margin: '5px' }}
                      rowHeight={62}
                      hideFooter
                      disableSelectionOnClick
                    />
                  ) : (
                    <CircleLoader />
                  )}
                </div>
              </Stack>

              <Box
                sx={{
                  position: 'relative',
                  width: '60vw',
                  height: `${addSongModalHeight}`,
                  backgroundColor: 'none',
                  marginTop: '18px',
                  paddingLeft: '6%',
                }}
              >
                <Button
                  style={{
                    width: '150px',
                    color: `${addSongButtonText}`,
                    borderColor: `${addSongButtonColor}`,
                    textTransform: 'capitalize',
                    display: `${addSongButtonVis} `,
                    accentColor: 'white',
                    marginTop: '2vh',
                  }}
                  variant="outlined"
                  color="primary"
                  onMouseEnter={handleMouseEnterSongButton}
                  onMouseOut={handleMouseExitSongButton}
                  size="small"
                  onClick={handleAddButtonClick}
                >
                  Add Songs
                </Button>

                <div
                  style={{
                    display: `${searchFieldVis}`,
                    height: 'fit-content',
                    maxHeight: '80vh',
                    width: '60vw',
                    backgroundColor: '#181818',
                  }}
                >
                  <TextField
                    id="searchfield"
                    label="Find track..."
                    value={searchFieldVal}
                    type="search"
                    size="small"
                    variant="outlined"
                    fullWidth={true}
                    onChange={handleSearchFieldChange}
                    onAbort={handleSearchAbort}
                    sx={{
                      marginBottom: '0px',
                      marginTop: '2vh',

                      '& label.Mui-focused': {
                        color: '#1DB954',
                        backgroundColor: 'none',
                        '& fieldset': {
                          color: '#1DB954',
                        },
                      },

                      '& label': {
                        color: '#afbacc',
                      },

                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#1DB954',
                        backgroundColor: 'none',
                        color: 'white',
                      },

                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        label: 'white',
                        '& fieldset': {
                          borderColor: 'white',
                          backgroundColor: 'none',
                          color: 'white',
                        },

                        '&:hover fieldset': {
                          borderColor: '#afbacc',
                          backgroundColor: 'none',
                          color: 'white',
                        },

                        '&.Mui-focused fieldset': {
                          borderColor: '#1DB954',
                          backgroundColor: 'none',
                          color: 'white',
                        },

                        '&.Mui-focused': {
                          borderColor: '#1DB954',
                          backgroundColor: 'none',
                          color: 'white',
                        },
                      },
                    }}
                  />
                  <div
                    style={{
                      visibility: `${searchResultDisplay}`,
                      height: Math.imul(62, 3) + 58,
                      marginTop: '3%',
                    }}
                  >
                    <DataGrid
                      rows={searchResults}
                      loading={searchLoading}
                      columns={addTrackColumns}
                      pageSize={10}
                      rowsPerPageOptions={[3]}
                      sx={{
                        backgroundColor: '#181818',
                        accentColor: '#181818',
                        color: 'white',
                        margin: '5px',
                      }}
                      rowHeight={62}
                      hideFooter
                      disableSelectionOnClick
                    />
                  </div>
                </div>

                <Button
                  variant="outlined"
                  size="small"
                  sx={{ color: 'white', borderColor: 'white', outlineColor: 'white' }}
                  onClick={executeSearch}
                  style={{
                    width: '150px',
                    color: `${searchButtonColor}`,
                    borderColor: `${searchButtonColor}`,
                    textTransform: 'capitalize',
                    accentColor: 'white',
                    display: `${searchFieldVis}`,
                  }}
                  onMouseEnter={handleMouseEnterSearchButton}
                  onMouseOut={handleMouseExitSearchButton}
                >
                  Search
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ color: 'white', borderColor: 'white', outlineColor: 'white' }}
                  style={{
                    width: '150px',
                    color: `${cancelButtonColor}`,
                    borderColor: `${cancelButtonColor}`,
                    textTransform: 'capitalize',
                    accentColor: 'white',
                    display: `${searchFieldVis}`,
                  }}
                  onMouseEnter={handleMouseEnterCancelButton}
                  onMouseOut={handleMouseExitCancelButton}
                  onClick={handleCancelButtonClick}
                >
                  Cancel
                </Button>
              </Box>
            </ICard>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <ColorButton style={{ width: '150px' }} onClick={() => navigator('/TimePage')}>
                Create New
              </ColorButton>
              <ColorButton
                style={{ width: '150px' }}
                onClick={() => setSavedPlaylist([null, true])}
              >
                Save Playlist
              </ColorButton>
              <ColorButton style={{ width: '150px' }} onClick={() => getTracks()}>
                Regenerate Playlist
              </ColorButton>
            </Stack>
          </Stack>
        </div>
      </GeneralPage>

      <Modal
        open={savedPlaylist[1]}
        onClose={() => setSavedPlaylist([null, false])}
        aria-labelledby="modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          <Typography id="modal-title" variant="h6" sx={{ marginBottom: '5px' }}>
            Enter Playlist Information:
          </Typography>
          <Stack spacing={2}>
            <TextField
              autoFocus
              value={info[0]}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setPlaylistSaved(true);
                  savePlaylist();
                }
              }}
              onChange={(e) => setInfo([e.target.value, info[1]])}
              placeholder="Playlist Name"
            />
            <TextField
              value={info[1]}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setPlaylistSaved(true);
                  savePlaylist();
                }
              }}
              onChange={(e) => setInfo([info[0], e.target.value])}
              placeholder="Playlist Description"
            />
            <ColorButton
              style={{ width: '150px', height: '40px', alignSelf: 'center' }}
              onClick={() => {
                setPlaylistSaved(true);
                savePlaylist();
              }}
            >
              {playlistSaved ? <CircleLoader /> : 'Save Playlist'}
            </ColorButton>
          </Stack>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={savedPlaylist[0]}
        autoHideDuration={3000}
        onClose={() => setSavedPlaylist([null, savedPlaylist[1]])}
      >
        {savedPlaylist[0] === 'error' ? (
          <Alert severity="error">Error saving playlist.</Alert>
        ) : (
          <Alert severity="success">Playlist saved!</Alert>
        )}
      </Snackbar>
    </>
  );
}
