import { useState } from "react";
import "./App.css";
import AccordianItem from "./components/AccordianItem";

const items = [
	{
		id: 1,
		title: "JavaScript Basics",
		content:
			"JavaScript is a programming language that allows you to implement complex features on web pages. JavaScript is a programming language that allows you to implement complex features on web pages.",
	},
	{
		id: 2,
		title: "React Basics",
		content: "React is a library for building user interfaces.",
	},
	{
		id: 3,
		title: "Next.js Basics",
		content:
			"Next.js is a framework for building server-side rendered React applications. Next.js is a framework for building server-side rendered React applications.",
	},
];

function App() {
	const [openItemId, setOpenItemId] = useState(null);

	const handleItemClick = (id) => {
		setOpenItemId((prevId) => (id === prevId ? null : id));
	};

	return (
		<div className="app">
			<h1>Accordian</h1>
			{(!items || items.length === 0) && <h3>No items to display!</h3>}
			{items.map((item) => {
				return (
					<AccordianItem
						key={item.id}
						item={item}
						isOpen={openItemId === item.id}
						onClick={() => handleItemClick(item.id)}
					/>
				);
			})}
		</div>
	);
}

export default App;
