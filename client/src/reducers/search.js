import C from '../constants';

export default (state = '', action) => {
  switch(action.type) {
    case C.SET_SEARCH_PHRASE:
      return action.payload;
    default:
      return state
  }
};