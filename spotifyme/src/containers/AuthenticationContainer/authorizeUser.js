import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpotifyApiContext } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import Cookies from "js-cookie";
import "react-spotify-auth/dist/index.css"; // if using the included styles

import { ColorButton } from "../../components/Button";
import "./styles.css";

const AuthorizeUser = () => {
	const navigate = useNavigate();
	const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

	return (
		<div className="wrapper">
			{token ? (
				<div className="wrapper">
					<SpotifyApiContext.Provider value={token}>
						<ColorButton onClick={() => navigate("/homepage")}>
							Go to Homepage
						</ColorButton>
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
