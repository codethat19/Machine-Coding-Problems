import React from "react";

function TodoList({ items, onDelete, onCheckItem }) {
	return (
		<>
			<h3>{items.length === 0 ? "No items to display" : "Items"}</h3>
			<div className="items-container">
				{items.map((item) => (
					<div key={item.id} className="item-container">
						<div className="checkbox-item">
							<input
								type="checkbox"
								checked={item.isChecked}
								onChange={() => onCheckItem(item.id)}
								required
							/>
							<span className={item.isChecked ? "checked" : ""}>
								{item.value}
							</span>
						</div>
						<button onClick={() => onDelete(item.id)}>
							Delete
						</button>
					</div>
				))}
			</div>
		</>
	);
}

export default TodoList;
