import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import ToDoItems from "./components/ToDoItems";

function App() {
	const [items, setItems] = useState([]);
	const [existingItem, setExistingItem] = useState(false);

	const addItem = (event, value) => {
		event.preventDefault();

		// Check if the trimmed and lowercased item already exists
		const existingItem = items.find(
			(item) =>
				item.value.trim().toLowerCase() === value.trim().toLowerCase()
		);
		if (existingItem) {
			setExistingItem(true);
			return;
		}
		setExistingItem(false);
		const item = {
			id: Math.random().toString(36).substring(2, 15),
			value: value,
			isChecked: false,
		};
		setItems((prev) => [...prev, item]);
	};

	const deleteItem = (deletedId) => {
		const newItems = items.filter((item) => item.id !== deletedId);
		setItems(newItems);
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
			<Input onAddItem={addItem} />
			{existingItem && <p>Item already exists!! </p>}
			<ToDoItems
				items={items}
				onDeleteItem={deleteItem}
				onCheckItem={handleCheckItem}
			/>
		</div>
	);
}

export default App;
