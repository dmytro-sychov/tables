import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { pages } from './utils/pages';

export const Header = () => {
	return (
		<Box component="header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
			<Typography variant="h3" component="h1">
				Pecode Tables
			</Typography>
			<Box component="nav">
				<Stack direction="row" spacing={3} component="ul" sx={{ listStyle: 'none' }}>
					{pages.map(({ path, title }) => (
						<Box component="li" key={path}>
							<NavLink
								to={path}
								style={({ isActive }) => {
									return {
										textDecoration: 'none',
										fontWeight: isActive ? '700' : '400',
									};
								}}>
								{title}
							</NavLink>
						</Box>
					))}
				</Stack>
			</Box>
		</Box>
	);
};
