import {config, url} from '../server';
import axios from 'axios';
import {setToken} from '../actions/token';
import {fetchUsers, addUsers} from '../actions/users';
import {resetMessages} from './messages';
import {getCart} from './cart';
import {hideLoginForm, hideRegistrationForm, showLoginForm} from '../actions/forms';
import {setErrorMessage, setSuccessMessage, resetSuccessMessage} from '../actions/messages';

export const getUsers = () => async (dispatch, getState) => {
	dispatch(fetchUsers());
	const {data: {users}} = await axios.get(`${url}/users`, config(getState().token));
	dispatch(addUsers(users));
};

export const banUser = id => async (dispatch, getState) => {
	await axios({
		method: 'delete',
		url: `${url}/users`,
		data: id,
		...config(getState().token)
	});
	dispatch(getUsers());
};

export const unbanUser = id => async (dispatch, getState) => {
	await axios({
		method: 'put',
		url: `${url}/users`,
		data: id,
		...config(getState().token)
	});
	dispatch(getUsers());
};

export const changePassword = fields => async (dispatch, getState) => {
	dispatch(resetMessages());
	try {
		const {data: {success}} = await axios.post(
			`${url}/password`,
			fields,
			config(getState().token)
		);
		dispatch(setSuccessMessage(success));
	} catch ({response: {data: {error}}}) {
		dispatch(setErrorMessage(error));
	}
};

export const getUser = id => async (dispatch, getState) => {
	const {data: {token}} = await axios.get(
		`${url}/users/${id}`,
		config(getState().token)
	);
	dispatch(setToken(token));
};

export const updateUser = fields => async (dispatch, getState) => {
	dispatch(resetSuccessMessage());
	const {data: {success}} = await axios.post(
		`${url}/users`,
		fields,
		config(getState().token)
	);
	dispatch(setSuccessMessage(success));
	dispatch(getUser(fields.id));
};

export const loginUser = fields => async dispatch => {
	try {
		const {data: {token}} = await axios.post(`${url}/login`, fields);
		dispatch(setToken(token));
		dispatch(getCart());
		dispatch(hideLoginForm());
	} catch ({response: {data: {error}}}) {
		dispatch(setErrorMessage(error));
	}
};

export const registerUser = fields => async dispatch => {
	try {
		const {data: {success}} = await axios.post(`${url}/register`, fields);
		dispatch(setSuccessMessage(success));
		dispatch(hideRegistrationForm());
		dispatch(showLoginForm());
	} catch ({response: {data: {error}}}) {
		dispatch(setErrorMessage(error));
	}
};
