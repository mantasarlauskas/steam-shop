import axios from "axios";
import { addProducts, fetchProducts } from "../actions/products";
import { url } from "../server";
import { getReviews } from "./reviews";
import { setPrices } from "./filter";
import { resetFilter } from "../actions/filter";

export const onProductsLoad = () => dispatch => {
  dispatch(resetFilter());
  dispatch(getProducts());
};

export const onProductLoad = id => dispatch => {
  dispatch(getProducts());
  dispatch(getReviews(id));
};

export const getProducts = () => async dispatch => {
  dispatch(fetchProducts());
  const { data } = await axios.get(`${url}/products`);
  dispatch(addProducts(data));
  dispatch(setPrices(data));
};
