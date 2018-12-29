import C from '../constants';

export const addProductsToCart = products => ({
  type: C.ADD_PRODUCTS_TO_CART,
  payload: products
});

