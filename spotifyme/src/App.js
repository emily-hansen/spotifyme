import logo from "./logo.svg";
import "./App.css";
import LogInCard from "./components/LogInCard";
import { ColorButton } from "./components/Button.js";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<LogInCard />
				<ColorButton>Test</ColorButton>
			</header>
		</div>
	);
}

export default App;
