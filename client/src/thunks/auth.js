import { resetErrorMessage } from "../actions/messages";
import { resetMessages } from "./messages";
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
  dispatch(resetMessages());
  dispatch(loginUser(fields));
};

export const closeLogin = () => dispatch => {
  dispatch(resetMessages());
  dispatch(hideLoginForm());
};

export const redirectFromLoginToRegistration = () => dispatch => {
  dispatch(hideLoginForm());
  dispatch(resetMessages());
  dispatch(showRegistrationForm());
};
