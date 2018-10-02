import C from '../constants';
import { ajax } from '../server';
import jwt from 'jsonwebtoken';
import { hideRegistrationForm, showLoginForm } from './forms';

const setErrorMessage = message => ({
  type: C.SET_ERROR_MESSAGE,
  payload: message
});

const setSuccessMessage = message => ({
  type: C.SET_SUCCESS_MESSAGE,
  payload: message
})

export const loginUser = fields => dispatch => {
  let errorExists = false;
  ajax('login', 'POST', fields)
  .then(response => {
    if(response.status === 400) errorExists = true;
    return response.json();
  })
  .then(result => errorExists ? dispatch(setErrorMessage(result)) : console.log("prisijungta"))
};

export const registerUser = fields => dispatch => {
  let errorExists = false;
  ajax('register', 'POST', fields)
  .then(response => {
    if(response.status === 400) errorExists = true;
    return response.json();
  })
  .then(result => {
    if(errorExists) {
      dispatch(setErrorMessage(result))
    } else {
      dispatch(hideRegistrationForm());
      dispatch(showLoginForm());
      dispatch(setSuccessMessage(result));
    }
  });
};

export const resetErrorMessage = () => ({
  type: C.RESET_ERROR_MESSAGE
});

export const resetSuccessMessage = () => ({
  type: C.RESET_SUCCESS_MESSAGE
});