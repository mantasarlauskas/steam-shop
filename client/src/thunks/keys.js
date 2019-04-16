import { config, url } from "../server";
import axios from "axios";
import { addOrderKeys, fetchKeys, addKeys } from "../actions/keys";

export const removeKey = id => async (dispatch, getState) => {
  await axios({
    method: "delete",
    url: `${url}/keys`,
    data: { id },
    ...config(getState().token)
  });
  dispatch(getKeys());
};

export const getOrderKeys = id => async (dispatch, getState) => {
  const { data } = await axios.get(
    `${url}/order-keys/${id}`,
    config(getState().token)
  );
  dispatch(addOrderKeys(data));
};

export const getKeys = id => async (dispatch, getState) => {
  dispatch(fetchKeys());
  const { data } = await axios.get(`${url}/keys`, config(getState().token));
  dispatch(addKeys(data));
};
