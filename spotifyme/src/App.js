import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import LandingPage from "./components/pages/LandingPage";
import TimePage from "./components/pages/TimePage";
import FeaturePage from "./components/pages/FeaturePage";
import StatPage from "./components/pages/StatPage";
import PlaylistPage from "./components/pages/PlaylistPage";
import "react-spotify-auth/dist/index.css"; // if using the included styles

import ProtectedRoute from "./components/ProtectedRoute";

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
				<Route
					path="homepage"
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="timepage"
					element={
						<ProtectedRoute>
							<TimePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="featurepage"
					element={
						<ProtectedRoute>
							<FeaturePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="statpage"
					element={
						<ProtectedRoute>
							<StatPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="playlistpage"
					element={
						<ProtectedRoute>
							<PlaylistPage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
