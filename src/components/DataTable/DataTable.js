import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import { useMemo, useState } from 'react';
import { ActionsPositions } from '../../utils/constants';
import { ACTIONS_COLUMN_SPAN_NUMBER, OrderType } from './utils/constants';
import { getComparator } from './utils/getComparator';
import { parseAvatarData } from './utils/parseAvatarData';

const getActionIcon = (icon) => {
	switch (icon) {
		case 'editIcon':
			return <EditOutlinedIcon color="secondary" />;
		case 'viewIcon':
			return <VisibilityOutlinedIcon color="secondary" />;
		case 'moreIcon':
			return <MoreHorizOutlinedIcon color="secondary" />;
		default:
			return null;
	}
};

const ActionCells = () => {
	return (
		<TableCell key="action" colSpan={ACTIONS_COLUMN_SPAN_NUMBER}>
			Actions
		</TableCell>
	);
};

const DataTableHead = (props) => {
	const { sortDirection, sortField, onRequestSort, headCells, actionsPosition } = props;

	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{actionsPosition === ActionsPositions.START && <ActionCells />}
				{headCells.map(
					(headCell) =>
						headCell.columnType !== 'icon' && (
							<TableCell
								key={headCell.title}
								align={headCell.columnType === 'text' ? 'left' : 'right'}
								sortDirection={sortField === headCell.title ? sortDirection : false}>
								<TableSortLabel
									active={sortField === headCell.title}
									direction={sortField === headCell.title ? sortDirection : OrderType.ASC}
									onClick={createSortHandler(headCell.title)}>
									{headCell.value}
									{sortField === headCell.title ? (
										<Box component="span" sx={visuallyHidden}>
											{sortDirection === OrderType.DESC ? 'sorted descending' : 'sorted ascending'}
										</Box>
									) : null}
								</TableSortLabel>
							</TableCell>
						)
				)}
				{actionsPosition === ActionsPositions.END && <ActionCells />}
			</TableRow>
		</TableHead>
	);
};

const DataTableToolbar = (props) => {
	const { tableName } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
			}}>
			<Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
				{tableName}
			</Typography>

			<Tooltip title="Filter list">
				<IconButton>
					<FilterListIcon />
				</IconButton>
			</Tooltip>
		</Toolbar>
	);
};

const DataTableCell = ({ headCell, row }) => {
	let avatarUrl = null;
	let avatarContent = null;
	let avatarBgColor = null;

	if (headCell.withAvatar && headCell.avatarSource) {
		avatarUrl = parseAvatarData(row[headCell.avatarSource]).avatarUrl;
		avatarContent = parseAvatarData(row[headCell.avatarSource]).avatarContent;
		avatarBgColor = parseAvatarData(row[headCell.avatarSource]).avatarBgColor;
	}

	return (
		<TableCell align={headCell.columnType === 'text' ? 'left' : 'right'}>
			{avatarUrl && (
				<Box sx={{ display: 'inline', mr: '0.5rem' }}>
					<img src={avatarUrl} alt={avatarContent} width="32" height="32" />
				</Box>
			)}
			{!avatarUrl && avatarContent && (
				<Typography
					sx={{
						display: 'inline-block',
						color: '#fff',
						fontWeight: '700',
						fontSize: '0.75rem',
						lineHeight: '1.75rem',
						mr: '0.5rem',
						textAlign: 'center',
						borderRadius: '50%',
						backgroundColor: `#${avatarBgColor}`,
						width: '1.75rem',
						height: '1.75rem',
					}}>
					{avatarContent}
				</Typography>
			)}
			{headCell.withPriority && headCell.prioritySource && (
				<Box sx={{ display: 'inline', ml: 'auto', verticalAlign: 'text-top', height: '1rem', mr: '0.5rem' }}>
					<FiberManualRecordIcon sx={{ color: row[headCell.prioritySource], width: '1rem', height: '1rem' }} />
				</Box>
			)}
			<Typography sx={{ display: 'inline', color: `${headCell.withColor ? row[headCell.colorSource] : 'unset'}` }}>{row[headCell.title]}</Typography>
		</TableCell>
	);
};

export function DataTable(props) {
	const { rows, headCells, tableName, actionsPosition, sortDirection, setSortDirection, sortField, setSortField, filters, setFilters } = props;

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = sortField === property && sortDirection === OrderType.ASC;
		setSortDirection(isAsc ? OrderType.DESC : OrderType.ASC);
		setSortField(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = useMemo(
		() => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort(getComparator(sortDirection, sortField)),
		[sortDirection, sortField, page, rows, rowsPerPage]
	);

	return (
		<Box sx={{ width: '100%', mt: '2rem' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<DataTableToolbar tableName={tableName} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
						<DataTableHead
							sortDirection={sortDirection}
							sortField={sortField}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
							headCells={headCells}
							actionsPosition={actionsPosition}
						/>
						<TableBody>
							{visibleRows.map((row) => {
								return (
									<TableRow hover tabIndex={-1} key={row.rowId} sx={{ cursor: 'pointer', userSelect: 'none', height: '65px' }}>
										{headCells.map((headCell) => {
											if (headCell.columnType === 'icon') {
												return (
													<TableCell key={headCell.title} onClick={() => console.log(`${headCell.title} clicked`)}>
														{getActionIcon(headCell.title)}
													</TableCell>
												);
											}

											return <DataTableCell key={headCell.title} headCell={headCell} row={row} />;
										})}
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 65 * emptyRows,
									}}>
									<TableCell colSpan={5} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
