import C from '../constants';

const initialState = {
  users: [],
  isFetching: null,
  errorMessage: null,
  successMessage: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case C.BAN_USER:
      return {
        ...state,
        users: state.users.map(user => user.username === action.payload ? { ...user, isBanned: 1 } : user)
      }
    case C.UNBAN_USER:
      return {
        ...state,
        users: state.users.map(user => user.username === action.payload ? { ...user, isBanned: 0 } : user)
      }
    case C.REQUEST_USERS:
      return {
        ...state,
        isFetching: true
      }
    case C.ADD_USERS: 
      return {
        ...state,
        users: action.payload,
        isFetching: false
      }
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