import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {styles} from '../../styles/tables';

const Key = ({
	id,
	createdAt,
	steam_key,
	Product: {title},
	isUsed,
	classes,
	removeKey
}) => (
	<TableRow className={classes.row} key={id}>
		<TableCell>{id}</TableCell>
		<TableCell>{title}</TableCell>
		<TableCell>{steam_key}</TableCell>
		<TableCell>Created: {new Date(createdAt).toLocaleString()}</TableCell>
		<TableCell>
			{isUsed ? (
				<Button disabled className={classes.error}>
					<span className={classes.message}>
						<ErrorIcon className={classes.icon}/>
						Used
					</span>
				</Button>
			) : (
				<Button disabled className={classes.success}>
					<span className={classes.message}>
						<CheckCircleIcon className={classes.icon}/>
						Unused
					</span>
				</Button>
			)}
		</TableCell>
		<TableCell>
			{!isUsed && (
				<Grid container>
					<Grid item xs={6}>
						<Link to={`/key-upload/${id}`}>
							<IconButton>
								<EditIcon/>
							</IconButton>
						</Link>
					</Grid>
					<Grid item xs={6}>
						<IconButton onClick={() => removeKey(id)}>
							<DeleteIcon/>
						</IconButton>
					</Grid>
				</Grid>
			)}
		</TableCell>
	</TableRow>
);

Key.propTypes = {
	id: PropTypes.number.isRequired,
	createdAt: PropTypes.string.isRequired,
	steam_key: PropTypes.string.isRequired,
	Product: PropTypes.object.isRequired,
	isUsed: PropTypes.number.isRequired,
	classes: PropTypes.object.isRequired,
	removeKey: PropTypes.func.isRequired
};

export default withStyles(styles)(Key);
