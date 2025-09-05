import React from "react";

export default function AccordianItem({ item, isOpen, onClick }) {
	return (
		<div className="accordian-container">
			<div className="accordian-title-container" onClick={onClick}>
				<div className="accordian-title">{item.title}</div>
				<div className={`accordian-icon ${isOpen ? "rotated" : ""}`}>
					🔽
				</div>
			</div>
			<div className={`accordian-content ${isOpen ? "open" : ""}`}>
				{item.content}
			</div>
		</div>
	);
}
