import C from '../constants';

export const setErrorMessage = message => ({
  type: C.SET_ERROR_MESSAGE,
  payload: message
});

export const setSuccessMessage = message => ({
  type: C.SET_SUCCESS_MESSAGE,
  payload: message
});

export const setToken = token => ({
  type: C.SET_TOKEN,
  payload: token
});

export const addUsers = users => ({
  type: C.ADD_USERS,
  payload: users
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