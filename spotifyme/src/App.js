import logo from "./logo.svg";
import "./App.css";
import LogInCard from "./components/LogInCard";
import { ColorButton } from "./components/Button";
import { ItemCard } from "./components/ItemCard";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<LogInCard />
				<ColorButton>Test</ColorButton>
				<ItemCard>Tsest</ItemCard>
			</header>
		</div>
	);
}

export default App;
