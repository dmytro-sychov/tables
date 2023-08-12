import { useMemo } from 'react';
import { ActionsPositions } from '../../../utils/constants';
import entities from '../../../utils/suppliers.json';
import { DataTable } from '../../DataTable';
import { mapAndOrderHeadCells, mapRows } from './dataMapper';

export const SuppliersPage = () => {
	const headCells = useMemo(() => mapAndOrderHeadCells(entities.fields), []);
	const rows = useMemo(() => mapRows(entities.lines), []);

	return (
		<div>
			<DataTable tableName="Suppliers" headCells={headCells} rows={rows} actionsPosition={ActionsPositions.END} />
		</div>
	);
};
