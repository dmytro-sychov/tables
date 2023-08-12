import { useMemo } from 'react';
import { ActionsPositions } from '../../../utils/constants';
import entities from '../../../utils/customers.json';
import { DataTable } from '../../DataTable';
import { mapAndOrderHeadCells, mapRows } from './dataMapper';

export const CustomersPage = () => {
	const headCells = useMemo(() => mapAndOrderHeadCells(entities.fields), []);
	const rows = useMemo(() => mapRows(entities.lines), []);

	return (
		<div>
			<DataTable tableName="Customers" headCells={headCells} rows={rows} actionsPosition={ActionsPositions.START} />
		</div>
	);
};
