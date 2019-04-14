import { resetErrorMessage, resetSuccessMessage } from "../actions/auth";
import {
  hideLoginForm,
  hideRegistrationForm,
  showRegistrationForm
} from "../actions/forms";
import { loginUser, registerUser } from "./users";

export const submitRegistration = fields => dispatch => {
  dispatch(resetErrorMessage());
  dispatch(registerUser(fields));
};

export const closeRegistration = () => dispatch => {
  dispatch(resetErrorMessage());
  dispatch(hideRegistrationForm());
};

export const submitLogin = fields => dispatch => {
  dispatch(resetErrorMessage());
  dispatch(resetSuccessMessage());
  dispatch(loginUser(fields));
};

export const closeLogin = () => dispatch => {
  dispatch(resetSuccessMessage());
  dispatch(resetErrorMessage());
  dispatch(hideLoginForm());
};

export const redirectFromLoginToRegistration = () => dispatch => {
  dispatch(hideLoginForm());
  dispatch(resetSuccessMessage());
  dispatch(resetErrorMessage());
  dispatch(showRegistrationForm());
};
