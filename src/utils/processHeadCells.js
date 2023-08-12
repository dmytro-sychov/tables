export const processHeadCells = (headCells) => {
	return Object.fromEntries(
		headCells.map((headCell) => [
			headCell.title,
			{ ...headCell, withPriority: false, prioritySource: null, withAvatar: false, avatarSource: null, withColor: false, colorSource: null },
		])
	);
};
