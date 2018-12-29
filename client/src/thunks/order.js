import axios from "axios";
import {config, url} from "../server";
import {getCart} from "./cart";
import {addOrders} from "../actions/orders";
import {getProducts} from "./product";

export const addOrder = () => (dispatch, getState) => {
  axios
    ({
      method: 'post',
      url: `${url}/order`,
      ...config(getState().token)
    })
    .then(() => {
      dispatch(getCart());
      dispatch(getProducts());
    });
};

export const getOrders = () => (dispatch, getState) => {
  axios
    .get(`${url}/orders`, config(getState().token))
    .then(({data}) => dispatch(addOrders(data)));
};