import "./App.css";
import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

let id = 0;

function App() {
	const [items, setItems] = useState([]);

	const handleAdd = (input) => {
		if (input.trim() === "") {
			alert("Please enter a valid item");
			return;
		}

		const existingItems = [...items];
		if (
			existingItems.some(
				(item) =>
					item.value.toLowerCase() === input.trim().toLowerCase()
			)
		) {
			alert("Item already exists");
			return;
		}

		const newItem = {
			id: id++,
			value: input.trim(),
			isChecked: false,
		};

		setItems((prevItems) => [...prevItems, newItem]);
	};

	const handleDelete = (id) => {
		setItems((prevItems) => prevItems.filter((item) => item.id !== id));
	};

	const handleCheckItem = (checkedId) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === checkedId
					? { ...item, isChecked: !item.isChecked }
					: item
			)
		);
	};

	return (
		<div className="app">
			<h1>To-do List</h1>
			<TodoInput onAdd={handleAdd} />
			<TodoList
				items={items}
				onDelete={handleDelete}
				onCheckItem={handleCheckItem}
			/>
		</div>
	);
}

export default App;
