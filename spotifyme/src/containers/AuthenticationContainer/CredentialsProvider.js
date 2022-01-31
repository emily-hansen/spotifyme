import React from 'react';

// OKAY ORDER OF EVENTS FOR AUTHORIZATION CODE FLOW
// 1. Request Authorization to Access data
// PARAMS: client_id, response_type, redirect_uri, state, scope

// 2. display scopes and prompt user to log in
// RETURNS: code, state
// code: An authorization code that can be exchanged for an Access Token.
// state: The value of the state parameter supplied in the request.

// 3. request access and request tokens
// PARAMS: client_id, client_secret, grant_type, code, redirect_uri

// 4. Return access and refresh tokens
// RETURNS: access_token, token_type, expires_in, refresh_token

// 5. Use access tokens in requests to Web API

// 6. return requested data
// RETURNS: access_token, JSON object

// STATE, SCOPE, AND SHOW DIALOG ARE OPTIONAL PARAMS. State is strongly recommended. Provides protection against
// cross-site request forgery (attacks)

// show dialog: Whether or not to force the user to approve the app again if they’ve already done so. If false (default), a user who has already approved the application may be automatically redirected to the URI specified by redirect_uri. If true, the user will not be automatically redirected and will have to approve the app again.

const SpotifyWebApi = require('spotify-web-api-node');

const redirectUri = 'http://localhost:3000/homepage';
const clientId = '5fe01282e44241328a84e7c5cc169165'; // our client id
const clientSecret = '2be98ffaad9647ab8249a7a27d6c9f45'; // our secret

export const getCredentials = () => {
  var credentials = {
    clientId: clientId, // our client id
    clientSecret: clientSecret, // our secret
    scopes: [
      'user-library-modify',
      'user-library-read',
      'playlist-modify-private',
      'playlist-read-collaborative',
      'playlist-read-private',
      'playlist-modify-public',
      'user-read-recently-played',
    ],
    redirectURL: redirectUri,
  };

  return credentials;
};
