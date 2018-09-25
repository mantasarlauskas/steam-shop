import C from '../constants';

export default (state = false, action) => {
  switch(action.type) {
    case C.SHOW_NAVBAR:
      return !state
    default:
      return state
  }
};