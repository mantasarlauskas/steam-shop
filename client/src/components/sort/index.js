import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core';
import styles from './styles';

const Sort = ({classes, setSort}) => (
	<div className={classes.filter}>
		<Typography variant="body2" gutterBottom>
			Sort:
		</Typography>
		<select onChange={({target: {value}}) => setSort(value)}>
			<option value="NAME_ASC">By title ascending</option>
			<option value="NAME_DESC">By title descending</option>
			<option value="PRICE_ASC">By price ascending</option>
			<option value="PRICE_DESC">By price descending</option>
		</select>
	</div>
);

Sort.propTypes = {
	classes: PropTypes.object.isRequired,
	setSort: PropTypes.func.isRequired
};

export default withStyles(styles)(Sort);
