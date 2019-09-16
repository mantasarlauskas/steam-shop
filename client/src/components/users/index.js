import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import User from '../../containers/user';
import Pagination from '../pagination';
import Loading from '../loading';
import withPagination from '../withPagination';
import {styles} from '../../styles/tables';

const Users = ({
	classes,
	users,
	isLoading,
	handleItemChange,
	paginatedItems
}) => (
	<div className={`${classes.root} container`}>
		<h1 className="title">Users</h1>
		<hr/>
		{isLoading ? (
			<Loading size={100}/>
		) : (
			<Paper className={classes.tableWrapper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Username</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Role</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedItems.map(user => (
							<User key={user.id} {...user} />
						))}
					</TableBody>
				</Table>
				<Pagination
					tablePagination={true}
					itemLength={users.length}
					itemsPerPage={10}
					data={users}
					returnData={handleItemChange}
				/>
			</Paper>
		)}
	</div>
);

Users.propTypes = {
	classes: PropTypes.object.isRequired,
	users: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	handleItemChange: PropTypes.func.isRequired,
	paginatedItems: PropTypes.array.isRequired
};

export default withStyles(styles)(withPagination(Users));
