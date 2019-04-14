import { combineReducers } from "redux";
import auth from "./auth";
import forms from "./forms";
import products from "./products";
import token from "./token";
import search from "./search";
import cart from "./cart";
import orders from "./orders";
import filter from "./filter";
import reviews from "./reviews";
import keys from "./keys";
import menu from "./menu";

export default combineReducers({
  auth,
  forms,
  filter,
  products,
  token,
  search,
  cart,
  reviews,
  orders,
  keys,
  menu
});
