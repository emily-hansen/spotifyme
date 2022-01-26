import HomePage from "./components/HomePage";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";

function App() {
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
				<Route path="/" element={<Test />} />
				<Route path="homepage" element={<HomePage />} />
				<Route path="test" element={<div>test</div>} />
			</Routes>
		</Router>
	);
}

export default App;
