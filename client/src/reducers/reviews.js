import C from '../constants';

const initialState = {
	isLoading: false,
	list: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case C.FETCH_REVIEWS:
			return {
				...state,
				isLoading: true
			};
		case C.ADD_REVIEWS:
			return {
				isLoading: false,
				list: action.payload
			};
		default:
			return state;
	}
};
