import C from '../constants';

export const setPage = page => ({
  type: C.SET_PAGE,
  payload: page
});

export const resetPage = () => ({
  type: C.RESET_PAGE
});