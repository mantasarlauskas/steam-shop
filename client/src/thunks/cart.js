import axios from "axios";
import {config, url} from "../server";
import {addProductsToCart} from "../actions/cart";
import {getProducts} from "./product";

export const addProductToCart = id => (dispatch, getState) => {
  axios
    .post(`${url}/cart`, {game_id: id}, config(getState().token))
    .then(() => {
      dispatch(getCart());
      dispatch(getProducts());
    });
};

export const removeProductFromCart = id => (dispatch, getState) => {
  axios
  ({
    method: 'delete',
    url: `${url}/cart`,
    data: {game_id: id},
    ...config(getState().token)
  })
    .then(() => {
      dispatch(getCart());
      dispatch(getProducts());
    });
};

export const getCart = () => (dispatch, getState) => {
  axios
    .get(`${url}/cart`, config(getState().token))
    .then(({data}) => dispatch(addProductsToCart(data)));
};