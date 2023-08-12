import { processHeadCells } from '../../../utils/processHeadCells';

// Mapping and ordering head cells guarantees that the data will be in the correct format for the DataTable component
export const mapAndOrderHeadCells = (headCells) => {
	const processedHeadCells = processHeadCells(headCells);
	processedHeadCells.customerName.withPriority = true;
	processedHeadCells.customerName.prioritySource = 'priorityColor';
	processedHeadCells.status.withColor = true;
	processedHeadCells.status.colorSource = 'statusColor';

	const reorderedHeadCells = [
		processedHeadCells.editIcon,
		processedHeadCells.viewIcon,
		processedHeadCells.moreIcon,
		processedHeadCells.customerId,
		processedHeadCells.customerName,
		processedHeadCells.status,
		processedHeadCells.loadingSite,
		processedHeadCells.customerAddress,
		processedHeadCells.contactPhone,
		processedHeadCells.contactEmail,
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
			customerId: row.customerId,
			customerName: row.customerName,
			status: row.status,
			loadingSite: row.loadingSite,
			customerAddress: row.customerAddress,
			contactPhone: row.contactPhone,
			contactEmail: row.contactEmail,
			priorityColor: row.priority___color,
			statusColor: row.status___color,
		};
	});
};
