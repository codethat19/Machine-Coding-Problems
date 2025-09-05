import React, { useRef } from "react";

export default function Input({ onAddItem }) {
	const inputRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault(); // Always prevent default form submission
		if (inputRef.current.value.trim() === "") {
			return;
		}
		onAddItem(e, inputRef.current.value);
		inputRef.current.value = ""; // Clear the input after submission
	};

	return (
		<form onSubmit={handleSubmit} className="input-form">
			<input
				type="text"
				ref={inputRef}
				placeholder="Enter a new to-do item"
				className="input-item"
				aria-label="New todo item"
				aria-describedby="duplicate-error"
				required
			/>
			<button>Add</button>
		</form>
	);
}
