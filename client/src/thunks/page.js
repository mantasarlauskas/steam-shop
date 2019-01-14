import {resetNavbar} from "../actions/navbar";
import {getProducts} from "./product";
import {getCart} from "./cart";
import {resetErrorMessage, resetSuccessMessage} from "../actions/auth";

export const initPage = () => (dispatch, getState) => {
  dispatch(resetNavbar());
  dispatch(getProducts());
  getState().token && dispatch(getCart());
};

export const resetMessages = () => dispatch => {
  dispatch(resetSuccessMessage());
  dispatch(resetErrorMessage());
};
