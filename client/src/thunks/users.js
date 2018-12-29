import {config, url} from '../server';
import axios from 'axios';
import {reset} from 'redux-form';
import {hideLoginForm, hideRegistrationForm, showLoginForm} from '../actions/forms';
import {setErrorMessage, setSuccessMessage, setToken, addUsers} from '../actions/auth';

export const banUser = userID => (dispatch, getState) => {
  axios
    ({
      method: 'delete',
      url: `${url}/users`,
      data: userID,
      ...config(getState().token)
    })
    .then(() => dispatch(getUsers()));
};

export const unbanUser = userID => (dispatch, getState) => {
  axios
    ({
      method: 'put',
      url: `${url}/users`,
      data: userID,
      ...config(getState().token)
    })
    .then(() => dispatch(getUsers()));
};

export const loginUser = fields => dispatch => {
  axios
    .post(`${url}/login`, fields)
    .then(({data}) => {
      dispatch(setToken(data));
      dispatch(reset('loginForm'));
      dispatch(hideLoginForm());
    })
    .catch(({response: {data}}) => {
      dispatch(setErrorMessage(data));
    });
};

export const updateUser = fields => (dispatch, getState) => {
  axios
    .post(`${url}/users`, fields, config(getState().token))
    .then(({data}) => {
      dispatch(setSuccessMessage(data));
    });
};

export const registerUser = fields => dispatch => {
  axios
    .post(`${url}/register`, fields)
    .then(({data}) => {
      dispatch(setSuccessMessage(data));
      dispatch(reset('registrationForm'));
      dispatch(hideRegistrationForm());
      dispatch(showLoginForm());
    })
    .catch(({response: {data}}) => {
      dispatch(setErrorMessage(data));
    });
};

export const getUsers = () => (dispatch, getState) => {
  axios
    .get(`${url}/users`, config(getState().token))
    .then(({data}) => dispatch(addUsers(data)));
};