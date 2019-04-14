import { config, url } from "../server";
import axios from "axios";
import { getProducts } from "./products";
import { addOrderKeys, fetchKeys, addKeys } from "../actions/keys";

export const addKey = key => (dispatch, getState) => {
  axios
    .post(`${url}/keys`, key, config(getState().token))
    .then(() => dispatch(getProducts()));
};

export const editKey = key => (dispatch, getState) => {
  axios
    .put(`${url}/keys`, key, config(getState().token))
    .then(() => dispatch(getProducts()));
};

export const removeKey = id => (dispatch, getState) => {
  axios({
    method: "delete",
    url: `${url}/keys`,
    data: { id },
    ...config(getState().token)
  }).then(() => {
    dispatch(getProducts());
    dispatch(getKeys());
  });
};

export const getOrderKeys = id => async (dispatch, getState) => {
  const { data } = await axios.get(
    `${url}/order-keys/${id}`,
    config(getState().token)
  );
  dispatch(addOrderKeys(data));
};

export const getKeys = id => async (dispatch, getState) => {
  dispatch(fetchKeys());
  const { data } = await axios.get(`${url}/keys`, config(getState().token));
  dispatch(addKeys(data));
};
