import C from '../constants';

export default (state = '', action) => {
	switch (action.type) {
		case C.SET_TOKEN:
			return action.payload;
		case C.RESET_TOKEN:
			return '';
		default:
			return state;
	}
};
