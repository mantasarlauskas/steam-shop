import axios from 'axios';
import {config, url} from '../server';
import {addReviews, fetchReviews} from '../actions/reviews';

export const getReviews = id => async (dispatch, getState) => {
	dispatch(fetchReviews());
	const {data: {reviews}} = await axios.get(
		`${url}/reviews/${id}`,
		config(getState().token)
	);
	dispatch(addReviews(reviews));
};

export const addReview = data => async (dispatch, getState) => {
	await axios.post(`${url}/reviews`, data, config(getState().token));
	dispatch(getReviews(data.game_id));
};

export const deleteReview = data => async (dispatch, getState) => {
	await axios({
		method: 'delete',
		url: `${url}/reviews`,
		data,
		...config(getState().token)
	});
	dispatch(getReviews(data.game_id));
};
