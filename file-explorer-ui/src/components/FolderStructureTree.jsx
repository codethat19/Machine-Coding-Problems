import React from "react";
import FileItemHeader from "./FileItemHeader";
import { isFolderWithContents } from "../utils/utility-functions";

const FileItem = ({ item, onDelete, onToggleExpand }) => {
	return (
		<div className="file-item">
			<FileItemHeader
				item={item}
				onDelete={onDelete}
				onToggleExpand={onToggleExpand}
				expanded={item.expanded}
			/>
			{isFolderWithContents(item) && item.expanded && (
				<div className="nested">
					{item.contents.map((nestedItem) => (
						<FileItem
							key={nestedItem.id}
							item={nestedItem}
							onDelete={onDelete}
							onToggleExpand={onToggleExpand}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default function FolderStructureTree({
	folderStructure,
	onDelete,
	onToggleExpand,
}) {
	return (
		<div className="folder-tree">
			{folderStructure[0].contents.map((item) => (
				<FileItem
					key={item.id}
					item={item}
					onDelete={onDelete}
					onToggleExpand={onToggleExpand}
				/>
			))}
		</div>
	);
}
