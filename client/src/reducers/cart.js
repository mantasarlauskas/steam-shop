import C from "../constants";

const initialState = {
  isLoading: false,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.FETCH_CART:
      return {
        ...state,
        isLoading: true
      };
    case C.ADD_CART:
      return {
        list: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
