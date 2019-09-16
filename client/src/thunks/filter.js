import {setDefaultMaxPrice, setDefaultMinPrice} from '../actions/filter';

export const setPrices = products => dispatch => {
	const minPrice = Math.floor(
		products.reduce(
			(min, {price}) => (min > price ? price : min),
			products[0].price
		)
	);
	dispatch(setDefaultMinPrice(minPrice));
	const maxPrice = Math.ceil(
		products.reduce((max, {price}) => (max < price ? price : max), 0)
	);
	dispatch(setDefaultMaxPrice(maxPrice));
};
