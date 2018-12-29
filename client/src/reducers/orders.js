import C from '../constants';

export default (state = [], action) => {
  switch(action.type) {
    case C.ADD_ORDERS:
      return action.payload;
    default:
      return state
  }
};