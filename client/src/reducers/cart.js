import C from '../constants';

export default (state = [], action) => {
  switch(action.type) {
    case C.ADD_PRODUCTS_TO_CART:
      return action.payload;
    default:
      return state
  }
};