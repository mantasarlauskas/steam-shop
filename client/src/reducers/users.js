import C from "../constants";

const initialState = {
  list: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.FETCH_USERS:
      return {
        ...state,
        isLoading: true
      };
    case C.ADD_USERS:
      return {
        isLoading: false,
        list: action.payload
      };
    default:
      return state;
  }
};
