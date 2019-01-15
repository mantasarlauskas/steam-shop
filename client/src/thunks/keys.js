import {config, url} from "../server";
import axios from 'axios';
import {getProducts} from "./product";

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
  axios
  ({
    method: 'delete',
    url: `${url}/keys`,
    data: {id},
    ...config(getState().token)
  })
    .then(() => dispatch(getProducts()));
};