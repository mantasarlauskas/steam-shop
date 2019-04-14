import { config, url } from "../server";
import axios from "axios";
import {
  hideLoginForm,
  hideRegistrationForm,
  showLoginForm
} from "../actions/forms";
import {
  setErrorMessage,
  setSuccessMessage,
  setToken,
  addUsers,
  resetErrorMessage,
  resetSuccessMessage
} from "../actions/auth";
import jwt from "jsonwebtoken";

export const banUser = userID => async (dispatch, getState) => {
  await axios({
    method: "delete",
    url: `${url}/users`,
    data: userID,
    ...config(getState().token)
  });
  dispatch(getUsers());
};

export const unbanUser = userID => async (dispatch, getState) => {
  await axios({
    method: "put",
    url: `${url}/users`,
    data: userID,
    ...config(getState().token)
  });
  dispatch(getUsers());
};

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
  jwt.decode(getState().token).role === 1 && dispatch(getUsers());
  dispatch(getUser(fields.id));
};

export const changePassword = fields => async (dispatch, getState) => {
  dispatch(resetSuccessMessage());
  dispatch(resetErrorMessage());
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

export const getUsers = () => async (dispatch, getState) => {
  const { data } = await axios.get(`${url}/users`, config(getState().token));
  dispatch(addUsers(data));
};

export const getUser = id => async (dispatch, getState) => {
  const { data } = await axios.get(
    `${url}/users/${id}`,
    config(getState().token)
  );
  dispatch(setToken(data));
};
