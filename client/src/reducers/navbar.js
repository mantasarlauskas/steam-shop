import C from '../constants';

export default (state = false, action) => {
  switch(action.type) {
    case C.TOGGLE_NAVBAR:
      return !state;
    case C.RESET_NAVBAR:
      return false;
    default:
      return state
  }
};