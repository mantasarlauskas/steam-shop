import { combineReducers } from "redux";
import messages from "./messages";
import forms from "./forms";
import products from "./products";
import token from "./token";
import cart from "./cart";
import orders from "./orders";
import filter from "./filter";
import reviews from "./reviews";
import keys from "./keys";
import menu from "./menu";
import users from "./users";

export default combineReducers({
  messages,
  forms,
  filter,
  products,
  token,
  cart,
  reviews,
  orders,
  keys,
  menu,
  users
});
