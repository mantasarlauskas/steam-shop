import axios from 'axios';
import {addProducts, fetchProducts} from '../actions/products';
import {url, config, uploadImage} from '../server';
import {getReviews} from './reviews';
import {setPrices} from './filter';
import {resetFilter} from '../actions/filter';

export const onProductsLoad = () => dispatch => {
	dispatch(resetFilter());
	dispatch(getProducts());
};

export const onProductLoad = id => dispatch => {
	dispatch(getProducts());
	dispatch(getReviews(id));
};

export const addProduct = fields => async (dispatch, getState) => {
	const {data: {secure_url}} = await uploadImage(fields.logo[0]);
	await axios.post(
		`${url}/products`,
		{...fields, logo: secure_url},
		config(getState().token)
	);
};

export const editProduct = fields => async (dispatch, getState) => {
	if (fields.logo === null) {
		fields.logo = getState().products.list.find(({id}) => fields.id === id).logo;
	} else {
		const {data: {secure_url}} = await uploadImage(fields.logo[0]);
		fields.logo = secure_url;
	}
	await axios.put(`${url}/products`, fields, config(getState().token));
};

export const removeProduct = id => async (dispatch, getState) => {
	await axios({
		method: 'delete',
		url: `${url}/products`,
		data: {id},
		...config(getState().token)
	});
};

export const getProducts = () => async dispatch => {
	dispatch(fetchProducts());
	const {data: {products}} = await axios.get(`${url}/products`);
	dispatch(addProducts(products));
	dispatch(setPrices(products));
};
