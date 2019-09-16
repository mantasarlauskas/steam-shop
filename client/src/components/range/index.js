import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core';
import {Range as Slider} from 'rc-slider';
import styles from './styles';
import 'rc-slider/assets/index.css';

class Range extends Component {
	handlePriceChange = ([newMinPrice, newMaxPrice]) => {
		const {setMinPrice, minPrice, setMaxPrice, maxPrice} = this.props;
		newMinPrice !== minPrice && setMinPrice(newMinPrice);
		newMaxPrice !== maxPrice && setMaxPrice(newMaxPrice);
	};

	render() {
		const {
			classes,
			defaultMinPrice,
			defaultMaxPrice,
			minPrice,
			maxPrice
		} = this.props;
		return (
			<Fragment>
				<Typography variant="body1" gutterBottom>
					Price:
				</Typography>
				<Grid container spacing={16}>
					<Grid item xs={3} sm={2} align={'center'}>
						{minPrice}$
					</Grid>
					<Grid item xs={6} sm={8}>
						<Slider
							className={classes.range}
							defaultValue={[defaultMinPrice, defaultMaxPrice]}
							allowCross={false}
							value={[minPrice, maxPrice]}
							min={defaultMinPrice}
							max={defaultMaxPrice}
							onChange={this.handlePriceChange}
						/>
					</Grid>
					<Grid item xs={3} sm={2} align={'center'}>
						{maxPrice}$
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

Range.propTypes = {
	setMinPrice: PropTypes.func.isRequired,
	setMaxPrice: PropTypes.func.isRequired,
	defaultMinPrice: PropTypes.number.isRequired,
	defaultMaxPrice: PropTypes.number.isRequired,
	minPrice: PropTypes.number.isRequired,
	maxPrice: PropTypes.number.isRequired
};

export default withStyles(styles)(Range);
