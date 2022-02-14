import Cookies from 'js-cookie';
import React from 'react';
import { SpotifyApiContext } from 'react-spotify-api';
import { SpotifyAuthListener } from 'react-spotify-auth';

const GetTracks = (props) => {
  return <h1>{props.track.name}</h1>;
};

export default GetTracks;

// function GetArtist(props) {

//     const [token, setToken] = React.useState(Cookies.get('spotifyAuthToken'));

//     return (
//       <SpotifyApiContext.Provider value={props.token}>
//         <Artist id={props.id}>
//           {({ data, loading, error }) =>
//             data ? (
//               <div>
//                 <h1>{data.name}</h1>
//                 <ul>
//                   {data.genres.map((genre) => (
//                     <li key={genre}>{genre}</li>
//                   ))}
//                 </ul>
//               </div>
//             ) : null
//           }
//         </Artist>
//       </SpotifyApiContext.Provider>
//     );
//   }
