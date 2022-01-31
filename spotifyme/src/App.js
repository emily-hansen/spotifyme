import HomePage from "./components/pages/HomePage";
import HeroPage from "./components/pages/HeroPage";
import TimePage from "./components/pages/TimePage";
import FeaturePage from "./components/pages/FeaturePage";
import StatPage from "./components/pages/StatPage";
import PlaylistPage from "./components/pages/PlaylistPage";
import { getCredentials } from './containers/AuthenticationContainer/CredentialsProvider';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLinkClickHandler,
} from 'react-router-dom';

import DataGridDemo from './components/PlaylistDisplay';

function App() {
  const credentials = getCredentials();

  const handleClick = () => {
    window.open(spotifyApi.createAuthorizeURL(credentials.scopes, '', true));
  };

  // Test for useNavigate
  const Test = () => {
    const navigator = useNavigate();
    return <button onClick={() => handleClick()}>Log in to Spotify</button>;
  };

  const SpotifyWebApi = require('spotify-web-api-node');

  const spotifyApi = new SpotifyWebApi({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
    redirectUri: credentials.redirectURL,
  });

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
        <Route path="/" element={<Test />} />
        <Route path="homepage" element={<HomePage />} />
        
        <Route path="timepage" element={<TimePage />} />
				<Route path="featurepage" element={<FeaturePage />} />
				<Route path="statpage" element={<StatPage />} />
				<Route path="playlistpage" element={<PlaylistPage />} />
        <Route
          path="/spotify-auth"
          element={<a href={spotifyApi.createAuthorizeURL(credentials.scopes)}>Log in</a>}
        />
      </Routes>
    </Router>
  );
}

export default App;
