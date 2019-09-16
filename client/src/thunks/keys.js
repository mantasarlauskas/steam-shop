import axios from 'axios';
import {getProducts} from './products';
import {config, url} from '../server';
import {
	addKey as setKey,
	fetchKey,
	fetchKeys,
	addKeys,
	fetchOrderKeys,
	addOrderKeys
} from '../actions/keys';

export const onKeyLoad = id => dispatch => {
	dispatch(getProducts());
	id && dispatch(getKey(id));
};

export const addKey = key => async (dispatch, getState) => {
	await axios.post(`${url}/keys`, key, config(getState().token));
};

export const editKey = key => async (dispatch, getState) => {
	await axios.put(`${url}/keys`, key, config(getState().token));
};

export const removeKey = id => async (dispatch, getState) => {
	await axios({
		method: 'delete',
		url: `${url}/keys`,
		data: {id},
		...config(getState().token)
	});
	dispatch(getKeys());
};

export const getKey = id => async (dispatch, getState) => {
	dispatch(fetchKey());
	const {data: {key}} = await axios.get(
		`${url}/keys/${id}`,
		config(getState().token)
	);
	dispatch(setKey(key));
};

export const getKeys = () => async (dispatch, getState) => {
	dispatch(fetchKeys());
	const {data: {keys}} = await axios.get(`${url}/keys`, config(getState().token));
	dispatch(addKeys(keys));
};

export const getOrderKeys = id => async (dispatch, getState) => {
	dispatch(fetchOrderKeys());
	const {data: {orderKeys}} = await axios.get(
		`${url}/order-keys/${id}`,
		config(getState().token)
	);
	dispatch(addOrderKeys(orderKeys));
};
