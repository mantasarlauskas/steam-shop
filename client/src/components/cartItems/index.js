import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CartProduct from '../../containers/cartProduct';
import Loading from '../loading';
import styles from './styles';

const CartItems = ({
   classes,
   products,
   isChangeable,
   isLoading,
   totalPrice
}) =>
	isLoading ? (
		<Loading size={100}/>
	) : products.length > 0 ? (
		<Fragment>
			<Grid container className={classes.heading}>
				<Grid item md={3}>
					<Typography variant="body1" gutterBottom>
						Logo
					</Typography>
				</Grid>
				<Grid item md={3}>
					<Typography variant="body1" gutterBottom>
						Title
					</Typography>
				</Grid>
				<Grid item md={2}>
					<Typography variant="body1" gutterBottom>
						Price
					</Typography>
				</Grid>
				<Grid item md={2}>
					<Typography variant="body1" gutterBottom>
						Count
					</Typography>
				</Grid>
				<Grid item md={2}>
					<Typography variant="body1" gutterBottom>
						Total price
					</Typography>
				</Grid>
			</Grid>
			{products.map(data => (
				<CartProduct key={data.id} isChangeable={isChangeable} {...data} />
			))}
			<Typography className={classes.totalPrice} variant="h6" gutterBottom>
				{`Total price: ${totalPrice}$`}
			</Typography>
		</Fragment>
	) : (
		<Typography align={'center'} variant="h6">
			Cart is empty
		</Typography>
	);

CartItems.propTypes = {
	classes: PropTypes.object.isRequired,
	products: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isChangeable: PropTypes.bool,
	totalPrice: PropTypes.number.isRequired
};

CartItems.defaultValues = {
	isChangeable: false
};

export default withStyles(styles)(CartItems);
