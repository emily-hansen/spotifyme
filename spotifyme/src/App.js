import React, { Component } from 'react';

import HomePage from './components/pages/HomePage';
import LandingPage from './components/pages/LandingPage';
import TimePage from './components/pages/TimePage';
import FeaturePage from './components/pages/FeaturePage';
import StatPage from './components/pages/StatPage';
import PlaylistPage from './components/pages/PlaylistPage';
import 'react-spotify-auth/dist/index.css'; // if using the included styles
import { SpotifyApiContext, Artist } from 'react-spotify-api';
import Cookies from 'js-cookie';
import { SpotifyAuth, Scopes, SpotifyAuthListener } from 'react-spotify-auth';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthorizeUser from './containers/AuthenticationContainer/authorizeUser';

function App() {
  return (
    /** How to use the router:
     * For a new page, add a new <Route/> component.
     * For that new page add a path="your-route-name",
     * and an element={YourComponent}. There are other options
     * you can use, but I think these are the ones that
     * will be used the most.
     * */
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="homepage" element={<HomePage />} />
        <Route path="timepage" element={<TimePage />} />
        <Route path="featurepage" element={<FeaturePage />} />
        <Route path="statpage" element={<StatPage />} />
        <Route path="playlistpage" element={<PlaylistPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// function App() {
//   const [token, setToken] = React.useState(Cookies.get('spotifyAuthToken'));

//   return (
//     /** How to use the router:
//      * For a new page, add a new <Route/> component.
//      * For that new page add a path="your-route-name",
//      * and an element={YourComponent}. There are other options
//      * you can use, but I think these are the ones that
//      * will be used the most.
//      * */
//     <div className="app">
//       {token ? (
//         <SpotifyApiContext.Provider value={token}>
//           <Router>
//             <Routes>
//               <Route path="/" element={<LandingPage authButton={<AuthorizeUser/>}/>} />
//               <Route path="homepage" element={<HomePage />} />
//               <Route path="timepage" element={<TimePage />} />
//               <Route path="featurepage" element={<FeaturePage />} />
//               <Route path="statpage" element={<StatPage />} />
//               <Route path="playlistpage" element={<PlaylistPage />} />
//             </Routes>
//           </Router>
//         </SpotifyApiContext.Provider>
//       ) : (
//         <div>
//           <LandingPage>
//             <SpotifyAuth
//               redirectUri="http://localhost:3000/homepage"
//               clientID="b3f5de56c9334d679e5f34871927c2cc"
//               scopes={[
//                 Scopes.userReadPrivate,
//                 Scopes.userLibraryModify,
//                 Scopes.userLibraryRead,
//                 Scopes.playlistModifyPrivate,
//                 Scopes.playlistReadCollaborative,
//                 Scopes.userReadEmail,
//                 Scopes.userTopRead,
//                 Scopes.playlistModifyPublic,
//                 Scopes.userReadRecentlyPlayed,
//               ]}
//               onAccessToken={(token) => setToken(token)}
//             />
//           </LandingPage>
//         </div>
//       )}
//     </div>
//   );
// }
