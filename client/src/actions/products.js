import C from '../constants';
import { ajax } from '../server';
import axios from 'axios';
const CLOUDINARY_UPLOAD_PRESET = 'steam-shop';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mantasarlauskas/image/upload';

const addProducts = products => ({
  type: C.ADD_PRODUCTS,
  payload: products
});

const insertProduct = product => ({
  type: C.ADD_PRODUCT,
  payload: product
});

const requestProducts = () => ({
  type: C.REQUEST_PRODUCTS
});

export const getProducts = () => dispatch => {
  dispatch(requestProducts());
  ajax('products', 'GET', dispatch, undefined, addProducts);
};

export const addProduct = fields => async (dispatch, getState) => {
  let formData = new FormData();
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("file", new Blob([fields.logo[0]], { type: "image/png; image/jpeg"}));
  const { data: { secure_url } } = await axios.post(CLOUDINARY_UPLOAD_URL, formData, { headers: { 'Content-Type': "multipart/form-data" } });
  await ajax('products', 'POST', dispatch, undefined, undefined, { ...fields, logo: secure_url }, getState().token);
  dispatch(insertProduct({ ...fields, logo: secure_url }));
};