import C from '../constants';
import { ajax } from '../server';

const insertProductToCart = id => ({
  type: C.ADD_PRODUCT_TO_CART,
  payload: id
});

const addProducts = products => dispatch => {
  products.forEach(({ game_id }) => dispatch(insertProductToCart(game_id)));
};

export const addProductToCart = id => async (dispatch, getState) => {
  await ajax('cart', 'POST', dispatch, undefined, undefined, { game_id: id }, getState().token);
  dispatch(insertProductToCart(id));
};

export const getCart = () => (dispatch, getState) => {
  ajax('cart', 'GET', dispatch, undefined, addProducts, undefined, getState().token);
};

