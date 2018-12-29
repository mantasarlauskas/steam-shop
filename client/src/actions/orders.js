import C from '../constants';

export const addOrders = orders => ({
  type: C.ADD_ORDERS,
  payload: orders
});