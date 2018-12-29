import {addProducts} from '../actions/products';
import {url, config} from '../server';
import axios from 'axios';

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

export const getProducts = () => dispatch => {
  axios
    .get(`${url}/products`)
    .then(({data}) => dispatch(addProducts(data)));
};

export const addProduct = fields => async (dispatch, getState) => {
  const {data: {secure_url}} = await uploadImage(fields.logo[0]);
  axios
    .post(`${url}/products`, {...fields, logo: secure_url}, config(getState().token))
    .then(() => dispatch(getProducts()));
};