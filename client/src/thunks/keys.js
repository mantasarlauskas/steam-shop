import {config, url} from "../server";
import axios from 'axios';
import {getProducts} from "./product";

export const addKey = key => (dispatch, getState) => {
  axios
    .post(`${url}/keys`, key, config(getState().token))
    .then(() => dispatch(getProducts()));
};