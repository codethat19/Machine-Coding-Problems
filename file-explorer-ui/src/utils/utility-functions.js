export function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		(text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
	);
}

const isFolder = (item) => {
	return item.type === "folder" || item.contents;
};

const isFile = (item) => {
	return item.type === "file" || item.content;
};

const isFolderWithContents = (item) => {
	return isFolder(item) && item.contents.length > 0;
};

export { isFolder, isFile, isFolderWithContents };
