import C from '../constants';

const initialState = {
  currentPage: 0,
  itemsPerPage: 10
};

export default (state = initialState, action) => {
  switch(action.type) {
    case C.SET_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    case C.RESET_PAGE:
      return initialState
    default:
      return state
  }
};