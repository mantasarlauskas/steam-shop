import C from '../constants';

export const fetchUsers = () => ({
	type: C.FETCH_USERS
});

export const addUsers = users => ({
	type: C.ADD_USERS,
	payload: users
});
