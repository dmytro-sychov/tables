import { API_URL } from './constants';

export const getEntities = async (props) => {
	const { tableName, sortDirection, sortField, filters } = props;

	const searchParams = new URLSearchParams();

	searchParams.append('tableName', tableName);
	sortDirection && searchParams.append('sortDirection', sortDirection);
	sortField && searchParams.append('sortField', sortField);
	filters && filters.forEach((filter) => searchParams.append(filter.name, filter.value));

	const url = `${API_URL}?${searchParams.toString()}`;

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.json();
	} catch (error) {
		// throw new Error(error);
		if (tableName === 'suppliers_table') {
			return import('./suppliers.json');
		} else if (tableName === 'customers_table') {
			return import('./customers.json');
		}
	}
};
