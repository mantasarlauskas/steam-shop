
import { combineReducers } from 'redux';
import navbar from './navbar';
import auth from './auth';
import forms from './forms';
import { reducer as form } from 'redux-form';

export default combineReducers({
  auth,
  navbar,
  forms,
  form
});