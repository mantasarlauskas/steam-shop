import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

const NoMatch = ({location, classes}) => (
	<div className={`${classes.noMatch} container`}>
		<Typography className={classes.text} variant="h4">
			Page does not exist <code>{location.pathname}</code>
		</Typography>
		<hr/>
	</div>
);

NoMatch.propTypes = {
	location: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoMatch);
