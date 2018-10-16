
import { combineReducers } from 'redux';
import navbar from './navbar';
import auth from './auth';
import forms from './forms';
import pagination from './pagination';
import products from './products';
import token from './token';
import keys from './keys';
import { reducer as form } from 'redux-form';

export default combineReducers({
  auth,
  navbar,
  forms,
  form,
  keys,
  products,
  token,
  pagination
});