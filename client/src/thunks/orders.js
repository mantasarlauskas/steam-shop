import axios from "axios";
import { config, url } from "../server";
import { getCart } from "./cart";
import { addOrders, fetchOrders } from "../actions/orders";
import { getProducts } from "./products";

export const addOrder = () => async (dispatch, getState) => {
  await axios({
    method: "post",
    url: `${url}/order`,
    ...config(getState().token)
  });
  dispatch(getCart());
  dispatch(getProducts());
};

export const getOrders = () => async (dispatch, getState) => {
  dispatch(fetchOrders());
  const { data } = await axios.get(`${url}/orders`, config(getState().token));
  dispatch(addOrders(data));
};
