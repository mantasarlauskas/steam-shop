import C from "../constants";

const initialState = {
  orderKeys: [],
  key: null,
  isKeyLoading: false,
  list: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.RESET_KEY:
      return {
        ...state,
        key: null
      };
    case C.FETCH_KEY:
      return {
        ...state,
        isKeyLoading: true
      };
    case C.ADD_KEY:
      return {
        ...state,
        key: action.payload,
        isKeyLoading: false
      };
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
