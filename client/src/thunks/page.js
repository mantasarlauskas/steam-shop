import { getProducts } from "./products";
import { getCart } from "./cart";
import { resetErrorMessage, resetSuccessMessage } from "../actions/auth";

export const loadData = () => (dispatch, getState) => {
  dispatch(getProducts());
  getState().token && dispatch(getCart());
};

export const resetMessages = () => dispatch => {
  dispatch(resetSuccessMessage());
  dispatch(resetErrorMessage());
};
