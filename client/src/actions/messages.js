import C from "../constants";

export const setErrorMessage = message => ({
  type: C.SET_ERROR_MESSAGE,
  payload: message
});

export const setSuccessMessage = message => ({
  type: C.SET_SUCCESS_MESSAGE,
  payload: message
});

export const resetErrorMessage = () => ({
  type: C.RESET_ERROR_MESSAGE
});

export const resetSuccessMessage = () => ({
  type: C.RESET_SUCCESS_MESSAGE
});
