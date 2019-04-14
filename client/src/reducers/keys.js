import C from "../constants";

const initialState = {
  orderKeys: [],
  list: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.FETCH_KEYS:
      return {
        ...state,
        isLoading: true
      };
    case C.ADD_KEYS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case C.ADD_ORDER_KEYS:
      return {
        ...state,
        orderKeys: action.payload
      };
    default:
      return state;
  }
};
