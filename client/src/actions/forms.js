import C from '../constants';

export const showLoginForm = () => ({
	type: C.SHOW_LOGIN_FORM
});

export const hideLoginForm = () => ({
	type: C.HIDE_LOGIN_FORM
});

export const showRegistrationForm = () => ({
	type: C.SHOW_REGISTRATION_FORM
});

export const hideRegistrationForm = () => ({
	type: C.HIDE_REGISTRATION_FORM
});
