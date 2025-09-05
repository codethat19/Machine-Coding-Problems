import React from "react";

export default function ToDoItems({ items, onDeleteItem, onCheckItem }) {
	return (
		<div className="items-container">
			{items.map((item) => (
				<div key={item.id} className="item-container">
					<div className="checkbox-item">
						<input
							type="checkbox"
							onClick={() => onCheckItem(item.id)}
						/>

						<span className={`${item.isChecked ? "checked" : ""}`}>
							{item.value}
						</span>
					</div>
					<button onClick={() => onDeleteItem(item.id)}>
						Delete
					</button>
				</div>
			))}
		</div>
	);
}
