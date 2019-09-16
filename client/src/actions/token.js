import C from '../constants';

export const setToken = token => ({
	type: C.SET_TOKEN,
	payload: token
});

export const resetToken = () => ({
	type: C.RESET_TOKEN
});
