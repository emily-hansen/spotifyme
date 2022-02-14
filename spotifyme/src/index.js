import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SpotifyApiContext } from 'react-spotify-api';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
