import axios from "axios";
import { addProducts, fetchProducts } from "../actions/products";
import { url } from "../server";
import { getReviews } from "./reviews";

export const onProductLoad = id => dispatch => {
  dispatch(getProducts());
  dispatch(getReviews(id));
};

export const getProducts = () => async dispatch => {
  dispatch(fetchProducts());
  const { data } = await axios.get(`${url}/products`);
  dispatch(addProducts(data));
};
