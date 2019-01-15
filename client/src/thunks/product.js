import {addProducts} from '../actions/products';
import {url, config} from '../server';
import axios from 'axios';
import {setDefaultMaxPrice, setDefaultMinPrice} from "../actions/filter";

const CLOUDINARY_UPLOAD_PRESET = 'steam-shop';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mantasarlauskas/image/upload';

const uploadImage = logo => {
  let formData = new FormData();
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("file", new Blob([logo], {type: "image/png; image/jpeg"}));
  return axios
    .post(CLOUDINARY_UPLOAD_URL, formData, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    });
};

const setPrices = data => dispatch => {
  const minPrice = data.reduce((min, {price}) => min > price ? price : min, data[0].price);
  dispatch(setDefaultMinPrice(Math.floor(minPrice)));
  const maxPrice = data.reduce((max, {price}) => max < price ? price : max, 0);
  dispatch(setDefaultMaxPrice(Math.ceil(maxPrice)));
};

export const getProducts = () => dispatch => {
  axios
    .get(`${url}/products`)
    .then(({data}) => {
      dispatch(addProducts(data));
      dispatch(setPrices(data));
    });
};

export const addProduct = fields => async (dispatch, getState) => {
  const {data: {secure_url}} = await uploadImage(fields.logo[0]);
  axios
    .post(`${url}/products`, {...fields, logo: secure_url}, config(getState().token))
    .then(() => dispatch(getProducts()));
};

export const removeProduct = id => (dispatch, getState) => {
  axios
  ({
    method: 'delete',
    url: `${url}/products`,
    data: {id},
    ...config(getState().token)
  })
    .then(() => {
      dispatch(getProducts());
    });
};

export const editProduct = fields => async (dispatch, getState) => {
  if (fields.logo === null) {
    fields.logo = getState().products.find(product => product.id === fields.id).logo;
  } else {
    const {data: {secure_url}} = await uploadImage(fields.logo[0]);
    fields.logo = secure_url;
  }

  axios
    .put(`${url}/products`, fields, config(getState().token))
    .then(() => dispatch(getProducts()));
};