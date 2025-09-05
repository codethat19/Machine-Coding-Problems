import "./App.css";
import folderStructure from "./data.json";
import FolderStructureTree from "./components/FolderStructureTree";
import { useState } from "react";
import { isFolder, isFolderWithContents } from "./utils/utility-functions";

function App() {
	const [folderStructureTree, setFolderStructureTree] =
		useState(folderStructure);

	const deleteItem = (id) => {
		const removeItemById = (items) => {
			return items.filter((item) => {
				if (item.id === id) {
					return false; // Remove this item
				}
				if (isFolder(item) && isFolderWithContents(item)) {
					item.contents = removeItemById(item.contents);
				}
				return true; // Keep this item
			});
		};

		setFolderStructureTree((prev) => removeItemById(prev));
	};
	// console.log(folderStructure);

	const onToggleExpand = (id) => {
		const toggleExpandById = (items) => {
			return items.map((item) => {
				if (item.id === id) {
					return { ...item, expanded: !item.expanded };
				}
				if (isFolder(item) && isFolderWithContents(item)) {
					return {
						...item,
						contents: toggleExpandById(item.contents),
					};
				}
				return item;
			});
		};

		setFolderStructureTree((prev) => {
			return toggleExpandById(prev);
		});
	};

	return (
		<div className="app">
			<h1>File Explorer UI</h1>
			<FolderStructureTree
				folderStructure={folderStructureTree}
				onDelete={deleteItem}
				onToggleExpand={onToggleExpand}
			/>
		</div>
	);
}

export default App;
