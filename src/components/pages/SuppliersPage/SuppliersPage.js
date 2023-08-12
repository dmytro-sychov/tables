import { useEffect, useState } from 'react';
import { useEntities } from '../../../hooks/useEntities';
import { ActionsPositions } from '../../../utils/constants';
import { DataTable } from '../../DataTable';
import { mapAndOrderHeadCells, mapRows } from './dataMapper';

export const SuppliersPage = () => {
	const { fetchEntities, entities, loading, error } = useEntities();
	const [sortDirection, setSortDirection] = useState('asc');
	const [sortField, setSortField] = useState('supplierName');
	const [filters, setFilters] = useState([]);

	useEffect(() => {
		fetchEntities({ tableName: 'suppliers_table', sortDirection, sortField, filters });
	}, [fetchEntities, sortDirection, sortField, filters]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const headCells = mapAndOrderHeadCells(entities.fields);
	const rows = mapRows(entities.lines);

	return (
		<DataTable
			tableName="Suppliers"
			headCells={headCells}
			rows={rows}
			actionsPosition={ActionsPositions.END}
			sortDirection={sortDirection}
			setSortDirection={setSortDirection}
			sortField={sortField}
			setSortField={setSortField}
			filters={filters}
			setFilters={setFilters}
		/>
	);
};
