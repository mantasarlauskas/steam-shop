import axios from 'axios';
import {config, url} from '../server';
import {getCart} from './cart';
import {addOrders, fetchOrders} from '../actions/orders';

export const addOrder = () => async (dispatch, getState) => {
	await axios({
		method: 'post',
		url: `${url}/orders`,
		...config(getState().token)
	});
	dispatch(getCart());
	dispatch(getOrders());
};

export const getOrders = () => async (dispatch, getState) => {
	dispatch(fetchOrders());
	const {data: {orders}} = await axios.get(`${url}/orders`, config(getState().token));
	dispatch(addOrders(orders));
};
