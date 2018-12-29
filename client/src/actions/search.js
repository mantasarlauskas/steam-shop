import C from '../constants';

export const setSearchPhrase = keyword => ({
  type: C.SET_SEARCH_PHRASE,
  payload: keyword
});