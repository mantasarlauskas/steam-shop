import C from '../constants';
import { ajax } from '../server';
import { hideRegistrationForm, showLoginForm, hideLoginForm } from './forms';
import { reset } from 'redux-form';

const setErrorMessage = message => ({
  type: C.SET_ERROR_MESSAGE,
  payload: message
});

const setSuccessMessage = message => ({
  type: C.SET_SUCCESS_MESSAGE,
  payload: message
})

const setToken = token => ({
  type: C.SET_TOKEN,
  payload: token
});

const addUsers = users => ({
  type: C.ADD_USERS,
  payload: users
});

const requestUsers = () => ({
  type: C.REQUEST_USERS
});

const updateBannedUser = id => ({
  type: C.BAN_USER,
  payload: id
});

const updateUnbannedUser = id => ({
  type: C.UNBAN_USER,
  payload: id
});

export const resetToken = () => ({
  type: C.RESET_TOKEN
});

export const resetErrorMessage = () => ({
  type: C.RESET_ERROR_MESSAGE
});

export const resetSuccessMessage = () => ({
  type: C.RESET_SUCCESS_MESSAGE
});

export const banUser = userID => (dispatch, getState) => 
  ajax('users', 'DELETE', dispatch, undefined, undefined, userID, getState().token)
  .then(error => !error && dispatch(updateBannedUser(userID.id)));

export const unbanUser = userID => (dispatch, getState) => 
  ajax('users', 'PUT', dispatch, undefined, undefined, userID, getState().token)
  .then(error => !error && dispatch(updateUnbannedUser(userID.id)));

export const loginUser = fields => dispatch => 
  ajax('login', 'POST', dispatch, setErrorMessage, setToken, fields)
  .then(error => !error && dispatch([reset('loginForm'), hideLoginForm()]));

export const updateUser = fields => (dispatch, getState) => 
  ajax('users', 'POST', dispatch, undefined, setSuccessMessage, fields, getState().token);

export const registerUser = fields => dispatch => 
  ajax('register', 'POST', dispatch, setErrorMessage, setSuccessMessage, fields)
  .then(error => !error && dispatch([reset('registrationForm'), hideRegistrationForm(), showLoginForm()]));

export const getUsers = () => (dispatch, getState) => {
  dispatch(requestUsers());
  ajax('users', 'GET', dispatch, undefined, addUsers, undefined, getState().token);
};