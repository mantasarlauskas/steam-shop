import C from '../constants';

export default (state = null, action) => {
  switch(action.type) {
    case C.SHOW_NAVBAR:
      return !state
    case C.RESET_NAVBAR:
      return null
    default:
      return state
  }
};