import C from '../constants';

export default (state = [], action) => {
    switch(action.type) {
        case C.ADD_PRODUCT_TO_CART:
            return state.find(item => item.id === action.payload) 
                ? state.map(item => item.id === action.payload ? { ...item, count: item.count + 1 } : item) 
                : [ ...state, { id: action.payload, count: 1 } ]
        default:
            return state
    }
};