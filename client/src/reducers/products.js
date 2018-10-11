import C from '../constants';

const initialState = {
  isFetching: null,
  games: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case C.REQUEST_PRODUCTS: 
      return {
        ...state,
        isFetching: true
      }
    case C.ADD_PRODUCT:
      return {
        ...state,
        games: [...state.games, action.payload]
      }
    case C.ADD_PRODUCTS:
      return {
        isFetching: false,
        games: action.payload
      }
    default:
      return state
  }
};