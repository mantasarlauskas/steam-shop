import C from "../constants";

export const addKeys = keys => ({
  type: C.ADD_KEYS,
  payload: keys
});

export const fetchKeys = () => ({
  type: C.FETCH_KEYS
});

export const addOrderKeys = keys => ({
  type: C.ADD_ORDER_KEYS,
  payload: keys
});
