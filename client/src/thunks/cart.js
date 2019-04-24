import axios from "axios";
import { config, url } from "../server";
import { addCart, fetchCart } from "../actions/cart";
import { getProducts } from "./products";

export const addProductToCart = id => async (dispatch, getState) => {
  await axios.post(`${url}/cart`, { game_id: id }, config(getState().token));
  dispatch(getProducts());
  dispatch(getCart());
};

export const removeProductFromCart = id => async (dispatch, getState) => {
  await axios({
    method: "delete",
    url: `${url}/cart`,
    data: { game_id: id },
    ...config(getState().token)
  });
  dispatch(getCart());
};

export const getCart = () => async (dispatch, getState) => {
  dispatch(fetchCart());
  const { data } = await axios.get(`${url}/cart`, config(getState().token));
  dispatch(addCart(data));
};
