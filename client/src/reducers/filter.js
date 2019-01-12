import C from '../constants';

const initialState = {
  defaultMinPrice: null,
  defaultMaxPrice: null,
  minPrice: null,
  maxPrice: null,
  sort: 'NAME_ASC'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.SET_DEFAULT_MIN_PRICE:
      return {
        ...state,
        minPrice: action.payload,
        defaultMinPrice: action.payload
      };
    case C.SET_DEFAULT_MAX_PRICE:
      return {
        ...state,
        maxPrice: action.payload,
        defaultMaxPrice: action.payload
      };
    case C.SET_MIN_PRICE:
      return {
        ...state,
        minPrice: action.payload
      };
    case C.SET_MAX_PRICE:
      return {
        ...state,
        maxPrice: action.payload
      };
    case C.SET_SORT:
      return {
        ...state,
        sort: action.payload
      };
    case C.RESET_FILTER:
      return {
        ...state,
        sort: initialState.sort,
        maxPrice: state.defaultMaxPrice,
        minPrice: state.defaultMinPrice
      };
    default:
      return state
  }
};