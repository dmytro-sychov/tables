import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { CustomersPage } from './components/pages/CustomersPage';
import { SuppliersPage } from './components/pages/SuppliersPage';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="suppliers" element={<SuppliersPage />} />
					<Route path="customers" element={<CustomersPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

const Layout = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/suppliers');
		}
	}, [location, navigate]);

	return (
		<Container className="App" maxWidth="xl">
			<Header />
			<Main>
				<Outlet />
			</Main>
		</Container>
	);
};

export default App;
