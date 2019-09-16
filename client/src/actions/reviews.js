import C from '../constants';

export const fetchReviews = () => ({
	type: C.FETCH_REVIEWS
});

export const addReviews = reviews => ({
	type: C.ADD_REVIEWS,
	payload: reviews
});
