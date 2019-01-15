import {combineReducers} from 'redux';
import navbar from './navbar';
import auth from './auth';
import forms from './forms';
import products from './products';
import token from './token';
import search from './search';
import cart from './cart';
import orders from './orders';
import filter from './filter';

export default combineReducers({
  auth,
  navbar,
  forms,
  filter,
  products,
  token,
  search,
  cart,
  orders
});