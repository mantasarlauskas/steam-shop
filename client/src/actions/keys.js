import C from '../constants';

export const addKey = key => ({
	type: C.ADD_KEY,
	payload: key
});

export const fetchKey = () => ({
	type: C.FETCH_KEY
});

export const resetKey = () => ({
	type: C.RESET_KEY
});

export const addKeys = keys => ({
	type: C.ADD_KEYS,
	payload: keys
});

export const fetchKeys = () => ({
	type: C.FETCH_KEYS
});

export const fetchOrderKeys = () => ({
	type: C.FETCH_ORDER_KEYS
});

export const addOrderKeys = keys => ({
	type: C.ADD_ORDER_KEYS,
	payload: keys
});
