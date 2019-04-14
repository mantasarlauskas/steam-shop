import C from "../constants";

export const addCart = cart => ({
  type: C.ADD_CART,
  payload: cart
});

export const fetchCart = () => ({
  type: C.FETCH_CART
});
