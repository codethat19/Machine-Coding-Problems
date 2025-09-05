import React from "react";
import { File, Folder, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { toTitleCase, isFolder } from "../utils/utility-functions";

export default function FileItemHeader({
	item,
	onDelete,
	onToggleExpand,
	expanded = false,
}) {
	return (
		<div
			className="file-item-header"
			onClick={() => onToggleExpand(item.id)}
		>
			<div className="file-item-header-content">
				{isFolder(item) ? (
					expanded ? (
						<ChevronDown className="icon-button" />
					) : (
						<ChevronRight className="icon-button" />
					)
				) : (
					<div className="icon-spacer"></div>
				)}
				{isFolder(item) ? (
					<Folder className="icon" />
				) : (
					<File className="icon" />
				)}
				<span>
					{isFolder(item) ? toTitleCase(item.name) : item.name}
				</span>
			</div>

			<div className="file-item-header-actions">
				<Trash2
					className="icon-button delete-icon"
					onClick={() => onDelete(item.id)}
				/>
			</div>
		</div>
	);
}
