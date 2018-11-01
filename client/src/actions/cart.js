import C from '../constants';

export const addProductToCart = id => ({
    type: C.ADD_PRODUCT_TO_CART,
    payload: id
});