import React, { useState } from "react";

export default function TodoInput({ onAdd }) {
	const [input, setInput] = useState("");

	return (
		<div className="input-container">
			<input
				type="text"
				className="input"
				placeholder="Add a new todo"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button
				onClick={() => {
					onAdd(input);
					setInput("");
				}}
			>
				Add
			</button>
		</div>
	);
}
