import {combineReducers} from 'redux';
import navbar from './navbar';
import auth from './auth';
import forms from './forms';
import pagination from './pagination';
import products from './products';
import token from './token';
import keys from './keys';
import search from './search';
import cart from './cart';
import orders from './orders';
import filter from './filter';
import {reducer as form} from 'redux-form';

export default combineReducers({
  auth,
  navbar,
  forms,
  form,
  filter,
  keys,
  products,
  token,
  pagination,
  search,
  cart,
  orders
});