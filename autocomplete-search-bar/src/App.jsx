import { useEffect, useRef, useState, useCallback } from "react";
import "./App.css";

function App() {
	const [input, setInput] = useState("");
	const inputRef = useRef(null);
	const [recipes, setRecipes] = useState([]);
	const [showRecipes, setShowRecipes] = useState(false);
	const [cache, setCache] = useState({});

	const fetchData = useCallback(async () => {
		if (input === "") return;

		if (cache[input]) {
			console.log(`Cache hit: ${input}`);
			setRecipes(cache[input]);
			return;
		}
		console.log(`API Call: ${input} (Cache miss)`);

		const data = await fetch(
			`https://dummyjson.com/recipes/search?q=${input}`
		);
		const res = await data.json();
		// console.log(res);
		setRecipes(res?.recipes);
		if (!cache[input])
			setCache((prev) => ({ ...prev, [input]: res?.recipes }));
	}, [input, cache]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (input !== "") {
				console.log(`Fetch data called`);
				fetchData();
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [input, fetchData]);

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	const handleShowRecipes = () => {
		setShowRecipes(true);
	};

	const handleHideRecipes = () => {
		setShowRecipes(false);
	};

	return (
		<div className="app">
			<h1>Autocomplete Search Bar</h1>
			<input
				type="text"
				className="search-input"
				ref={inputRef}
				onChange={handleInputChange}
				value={input}
				onFocus={handleShowRecipes}
				onBlur={handleHideRecipes}
				// placeholder={
				// 	recipes.length > 0 ? recipes[0].name : "Enter a recipe name"
				// }
			/>
			{recipes && recipes.length > 0 && input !== "" && showRecipes && (
				<div className="recipe-container">
					{recipes.map((item) => (
						<span className="recipe" key={item.id}>
							{item.name}
						</span>
					))}
				</div>
			)}
		</div>
	);
}

export default App;
