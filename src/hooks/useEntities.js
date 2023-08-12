import { useCallback, useState } from 'react';
import { getEntities } from '../utils/getEntities';

export const useEntities = () => {
	const [entitiesState, setEntitiesState] = useState({ entities: [], loading: true, error: null });

	const fetchEntities = useCallback((props) => {
		getEntities(props)
			.then((entities) => {
				setEntitiesState({ entities, loading: false, error: null });
			})
			.catch((error) => {
				setEntitiesState({ entities: [], loading: false, error });
			});
	}, []);

	return { ...entitiesState, fetchEntities };
};
