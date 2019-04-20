import { config, url } from "../server";
import axios from "axios";
import { setToken } from "../actions/token";
import { fetchUsers, addUsers } from "../actions/users";
import {
  hideLoginForm,
  hideRegistrationForm,
  showLoginForm
} from "../actions/forms";
import {
  setErrorMessage,
  setSuccessMessage,
  resetSuccessMessage
} from "../actions/messages";
import { resetMessages } from "./messages";

export const getUsers = () => async (dispatch, getState) => {
  dispatch(fetchUsers());
  const { data } = await axios.get(`${url}/users`, config(getState().token));
  dispatch(addUsers(data));
};

export const banUser = id => async (dispatch, getState) => {
  await axios({
    method: "delete",
    url: `${url}/users`,
    data: id,
    ...config(getState().token)
  });
  dispatch(getUsers());
};

export const unbanUser = id => async (dispatch, getState) => {
  await axios({
    method: "put",
    url: `${url}/users`,
    data: id,
    ...config(getState().token)
  });
  dispatch(getUsers());
};

export const changePassword = fields => async (dispatch, getState) => {
  dispatch(resetMessages());
  try {
    const { data } = await axios.post(
      `${url}/password`,
      fields,
      config(getState().token)
    );
    dispatch(setSuccessMessage(data));
  } catch ({ response: { data } }) {
    dispatch(setErrorMessage(data));
  }
};

/* visi zemiau bbz kam skirti :DD */
export const loginUser = fields => async dispatch => {
  try {
    const { data } = await axios.post(`${url}/login`, fields);
    dispatch(setToken(data));
    dispatch(hideLoginForm());
  } catch ({ response: { data } }) {
    dispatch(setErrorMessage(data));
  }
};

export const updateUser = fields => async (dispatch, getState) => {
  dispatch(resetSuccessMessage());
  const { data } = await axios.post(
    `${url}/users`,
    fields,
    config(getState().token)
  );
  dispatch(setSuccessMessage(data));
  dispatch(getUser(fields.id));
};

export const registerUser = fields => async dispatch => {
  try {
    const { data } = await axios.post(`${url}/register`, fields);
    dispatch(setSuccessMessage(data));
    dispatch(hideRegistrationForm());
    dispatch(showLoginForm());
  } catch ({ response: { data } }) {
    dispatch(setErrorMessage(data));
  }
};

export const getUser = id => async (dispatch, getState) => {
  const { data } = await axios.get(
    `${url}/users/${id}`,
    config(getState().token)
  );
  dispatch(setToken(data));
};
