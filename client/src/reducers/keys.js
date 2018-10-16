import C from '../constants';

export default (state = [], action) => {
  switch(action.type) {
    case C.ADD_KEY: 
      return [...state, action.payload]
    case C.ADD_KEYS:
        return action.payload
    default:
      return state
  }
};