import HomePage from "./components/pages/HomePage";
import HeroPage from "./components/pages/HeroPage";
import TimePage from "./components/pages/TimePage";
import FeaturePage from "./components/pages/FeaturePage";
import StatPage from "./components/pages/StatPage";
import PlaylistPage from "./components/pages/PlaylistPage";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";

function App() {
	// Test for useNavigate
	const Test = () => {
		const navigator = useNavigate();
		return <button onClick={() => navigator("/homepage")}>To HomePage</button>;
	};

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
				<Route path="/" element={<HeroPage />} />
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
