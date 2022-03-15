import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import LandingPage from "./components/pages/LandingPage";
import TimePage from "./components/pages/TimePage";
import FeaturePage from "./components/pages/FeaturePage";
import StatPage from "./components/pages/ViewStatsPage";
import PlaylistPage from "./components/pages/PlaylistPage";
import FeaturesPlaylist from "./components/pages/FeaturesPlaylist";
import "react-spotify-auth/dist/index.css"; // if using the included styles

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
	return (
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
				<Route
					path="featureplaylist"
					element={
						<ProtectedRoute>
							<FeaturesPlaylist />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}
