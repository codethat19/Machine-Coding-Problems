import "./App.css";
import ProgressBar from "./components/ProgressBar";

function App() {
	const bars = [2, 5, 10, 30, 50, 70, 90, 100];
	const granularBars = 10;
	const granularBarsProgress = [0, 20, 70, 100];

	return (
		<div className="app">
			<h1>Progress Bar</h1>

			<h2>Continuous</h2>
			{bars.map((bar, index) => (
				<ProgressBar key={index} progress={bar} continuous />
			))}

			<h2>Granular</h2>
			{granularBarsProgress.map((bar, index) => (
				<ProgressBar
					key={index}
					progress={bar}
					continuous={false}
					granularBars={granularBars}
				/>
			))}
		</div>
	);
}

export default App;
