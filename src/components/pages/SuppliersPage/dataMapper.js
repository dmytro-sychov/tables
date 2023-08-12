import { processHeadCells } from '../../../utils/processHeadCells';

// Mapping and ordering head cells guarantees that the data will be in the correct format for the DataTable component
export const mapAndOrderHeadCells = (headCells) => {
	const processedHeadCells = processHeadCells(headCells);
	processedHeadCells.supplierName.withAvatar = true;
	processedHeadCells.supplierName.avatarSource = 'avatar';
	processedHeadCells.status.withColor = true;
	processedHeadCells.status.colorSource = 'statusColor';

	const reorderedHeadCells = [
		processedHeadCells.supplierId,
		processedHeadCells.supplierName,
		processedHeadCells.status,
		processedHeadCells.mainCargo,
		processedHeadCells.supplierAddress,
		processedHeadCells.contactPhone,
		processedHeadCells.contactEmail,
		processedHeadCells.editIcon,
		processedHeadCells.viewIcon,
		processedHeadCells.moreIcon,
	];

	return reorderedHeadCells;
};

// Mapping guarantees that the data will be in the correct format for the DataTable component
export const mapRows = (rows) => {
	return rows.map((row) => {
		return {
			rowId: row.rowId,
			editIcon: row.editIcon,
			viewIcon: row.viewIcon,
			moreIcon: row.moreIcon,
			supplierId: row.supplierId,
			supplierName: row.supplierName,
			status: row.status,
			mainCargo: row.mainCargo,
			supplierAddress: row.supplierAddress,
			contactEmail: row.contactEmail,
			contactPhone: row.contactPhone,
			avatar: row.avatar,
			statusColor: row.status___color,
		};
	});
};
