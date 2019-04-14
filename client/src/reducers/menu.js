import C from "../constants";

const initialState = {
  isOpen: false,
  isClosing: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.OPEN_MENU:
      return {
        ...state,
        isOpen: true
      };
    case C.START_CLOSING_MENU:
      return {
        ...state,
        isClosing: true
      };
    case C.CLOSE_MENU:
      return {
        isOpen: false,
        isClosing: false
      };
    default:
      return state;
  }
};
