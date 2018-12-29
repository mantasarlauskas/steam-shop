import {resetNavbar} from "../actions/navbar";
import {getProducts} from "./product";
import {getCart} from "./cart";

export const initPage = () => (dispatch, getState) => {
  dispatch(resetNavbar());
  dispatch(getProducts());
  getState().token && dispatch(getCart());
};
