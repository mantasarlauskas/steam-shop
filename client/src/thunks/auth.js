import {resetErrorMessage, resetSuccessMessage} from "../actions/auth";
import {hideLoginForm, hideRegistrationForm, showRegistrationForm} from "../actions/forms";
import {reset} from "redux-form";
import {loginUser, registerUser} from "./users";

export const submitRegistration = fields => dispatch => {
  dispatch(resetErrorMessage());
  dispatch(registerUser({username: fields.username, email: fields.email, password: fields.password1}));
};

export const closeRegistration = () => dispatch => {
  dispatch(resetErrorMessage());
  dispatch(hideRegistrationForm());
  dispatch(reset('registrationForm'));
};

export const submitLogin = fields => dispatch => {
  dispatch(resetErrorMessage());
  dispatch(loginUser(fields));
};

export const closeLogin = () => dispatch => {
  dispatch(resetSuccessMessage());
  dispatch(resetErrorMessage());
  dispatch(hideLoginForm());
  dispatch(reset('loginForm'));
};

export const redirectFromLoginToRegistration = () => dispatch => {
  dispatch(hideLoginForm());
  dispatch(showRegistrationForm());
};