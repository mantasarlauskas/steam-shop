import C from '../constants';

const initialState = {
	isLoading: false,
	list: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case C.FETCH_PRODUCTS:
			return {
				...state,
				isLoading: true
			};
		case C.ADD_PRODUCTS:
			return {
				list: action.payload,
				isLoading: false
			};
		default:
			return state;
	}
};
