import C from '../constants';

export const setDefaultMinPrice = price => ({
  type: C.SET_DEFAULT_MIN_PRICE,
  payload: price
});

export const setDefaultMaxPrice = price => ({
  type: C.SET_DEFAULT_MAX_PRICE,
  payload: price
});

export const setMinPrice = price => ({
  type: C.SET_MIN_PRICE,
  payload: price
});

export const setMaxPrice = price => ({
  type: C.SET_MAX_PRICE,
  payload: price
});

export const resetFilter = () => ({
  type: C.RESET_FILTER
});

export const setSort = sort => ({
  type: C.SET_SORT,
  payload: sort
});