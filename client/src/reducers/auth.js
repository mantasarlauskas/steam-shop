import C from '../constants';

const initialState = {
  errorMessage: null,
  successMessage: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case C.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      }
    case C.SET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload
      }
    case C.RESET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: null
      }
    case C.RESET_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: null
      }
    default:
      return state
  }
};