import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  styled,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Cookies from 'js-cookie';
import { SpotifyAuthListener } from 'react-spotify-auth';
import SpotifyWebApi from 'spotify-web-api-node';

import ICard from '../ItemCard';
import { ColorButton } from '../Button';
import GeneralPage from './GeneralPage';
import CircleLoader from '../Loader';
import PlayListGenerator_simple from '../PlaylistGen';
import { timeToMs } from '../timeToMs';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { playlistColumns, addTrackColumns } from './Constants';
import { AddSongIconButton } from './PlaylistPage';
export const PlaylistColumns = [
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

export const AddTrackColumns = [
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

export const searchFieldStyling = {
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
};
