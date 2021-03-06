import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import KeyIcon from '@material-ui/icons/VpnKey';
import {Link} from 'react-router-dom';
import {styles} from '../../styles/tables';

const Profile = ({
	classes,
	user: {createdAt, updatedAt, username, email, role}
}) => (
	<div className={`${classes.root} container`}>
		<h1 className="title">My profile</h1>
		<hr/>
		<Paper className={classes.paper}>
			<Grid container>
				<Grid item xs={12} md={5}>
					<Grid container>
						<Grid item xs={12} className={classes.text}>
							<b>Username:</b> {username}
						</Grid>
						<Grid item xs={12} className={classes.text}>
							<b>Email:</b> {email}
						</Grid>
						<Grid item xs={12} className={classes.text}>
							<b>Role:</b> {role === 1 ? 'Admin' : 'Client'}
						</Grid>
						<Grid item xs={12} className={classes.text}>
							<b>Created at:</b>{' '}
							{new Date(createdAt).toLocaleString()}
						</Grid>
						<Grid item xs={12} className={classes.text}>
							<b>Latest edit date:</b>{' '}
							{new Date(updatedAt).toLocaleString()}
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={7}>
					<Link to="/change-password">
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
						>
							<KeyIcon className={classes.icon}/>
							Change password
						</Button>
					</Link>
					<Link to="/edit-profile">
						<Button
							variant="contained"
							color="primary"
							className={`${classes.button} ${classes.editButton}`}
						>
							<EditIcon className={classes.icon}/>
							Change email
						</Button>
					</Link>
				</Grid>
			</Grid>
		</Paper>
	</div>
);

Profile.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
