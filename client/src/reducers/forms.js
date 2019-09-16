import C from '../constants';

const initialState = {
	loginForm: false,
	registrationForm: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case C.SHOW_LOGIN_FORM:
			return {
				...state,
				loginForm: true
			};
		case C.SHOW_REGISTRATION_FORM:
			return {
				...state,
				registrationForm: true
			};
		case C.HIDE_LOGIN_FORM:
			return {
				...state,
				loginForm: false
			};
		case C.HIDE_REGISTRATION_FORM:
			return {
				...state,
				registrationForm: false
			};
		default:
			return state;
	}
};
