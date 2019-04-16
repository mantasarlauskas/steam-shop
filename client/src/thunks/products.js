import axios from "axios";
import { addProducts, fetchProducts } from "../actions/products";
import { url, config } from "../server";
import { setDefaultMaxPrice, setDefaultMinPrice } from "../actions/filter";

const CLOUDINARY_UPLOAD_PRESET = "steam-shop";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/mantasarlauskas/image/upload";

const uploadImage = logo => {
  let formData = new FormData();
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("file", new Blob([logo], { type: "image/png; image/jpeg" }));
  return axios.post(CLOUDINARY_UPLOAD_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const getProducts = () => async dispatch => {
  dispatch(fetchProducts());
  const { data } = await axios.get(`${url}/products`);
  dispatch(addProducts(data));
};

export const addProduct = fields => async (dispatch, getState) => {
  const {
    data: { secure_url }
  } = await uploadImage(fields.logo[0]);
  await axios.post(
    `${url}/products`,
    { ...fields, logo: secure_url },
    config(getState().token)
  );
};

export const removeProduct = id => async (dispatch, getState) => {
  await axios({
    method: "delete",
    url: `${url}/products`,
    data: { id },
    ...config(getState().token)
  });
};

export const editProduct = fields => async (dispatch, getState) => {
  if (fields.logo === null) {
    fields.logo = getState().products.list.find(
      product => product.id === fields.id
    ).logo;
  } else {
    const {
      data: { secure_url }
    } = await uploadImage(fields.logo[0]);
    fields.logo = secure_url;
  }
  await axios.put(`${url}/products`, fields, config(getState().token));
};
