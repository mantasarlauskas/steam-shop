import C from '../constants';

export const addProducts = products => ({
	type: C.ADD_PRODUCTS,
	payload: products
});

export const fetchProducts = () => ({
	type: C.FETCH_PRODUCTS
});
