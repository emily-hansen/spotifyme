import React from "react";
import { SpotifyApiContext } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import Cookies from "js-cookie";
import "react-spotify-auth/dist/index.css"; // if using the included styles
import { ColorButton } from "../../components/Button";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const AuthorizeUser = () => {
	const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"));

	const navigate = useNavigate();

	const [checked, setChecked] = React.useState(true);

	const handleChange = (event) => {
		setChecked(event.target.checked);
		console.log(token);
	};

	return (
		<div className="wrapper">
			{token ? (
				<div className="wrapper">
					<SpotifyApiContext.Provider value={token}>
						<ColorButton onClick={() => navigate("/homepage")}>
							Go to Homepage
						</ColorButton>

						{/* Code for debugging -- a Toggle Switch to see if access token exists 
            
            <h2>See Token using switch</h2>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <p hidden={checked}>You are authorized with token: {token}</p> 
            
            */}
					</SpotifyApiContext.Provider>
				</div>
			) : (
				// Display the login page
				<SpotifyAuth
					redirectUri="http://localhost:3000/homepage"
					clientID="b3f5de56c9334d679e5f34871927c2cc"
					scopes={[
						Scopes.userReadPrivate,
						Scopes.userLibraryModify,
						Scopes.userLibraryRead,
						Scopes.playlistModifyPrivate,
						Scopes.playlistReadCollaborative,
						Scopes.userReadEmail,
						Scopes.userTopRead,
						Scopes.playlistModifyPublic,
						Scopes.userReadRecentlyPlayed,
					]}
					onAccessToken={(token) => setToken(token)}
					noLogo={true}
				/>
			)}
		</div>
	);
};

export default AuthorizeUser;
