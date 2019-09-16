import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ErrorIcon from '@material-ui/icons/Error';
import {styles} from '../../styles/tables';

const User = ({
	username,
	email,
	role,
	isBanned,
	id,
	banUser,
	unbanUser,
	classes
}) => (
	<TableRow key={id}>
		<TableCell>{username}</TableCell>
		<TableCell>{email}</TableCell>
		<TableCell>{role === 1 ? 'Admin' : 'Client'}</TableCell>
		<TableCell>
			{role === 0 && (
				<Button
					className={classes.error}
					onClick={() => (isBanned ? unbanUser({id}) : banUser({id}))}
				>
          <span className={classes.message}>
            <ErrorIcon className={classes.icon}/>
			  {isBanned ? 'Unban' : 'Ban'}
          </span>
				</Button>
			)}
		</TableCell>
	</TableRow>
);

User.propTypes = {
	classes: PropTypes.object.isRequired,
	banUser: PropTypes.func.isRequired,
	unbanUser: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	role: PropTypes.number.isRequired,
	isBanned: PropTypes.bool.isRequired,
	id: PropTypes.number.isRequired
};

export default withStyles(styles)(User);
