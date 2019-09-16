import {createSelector} from 'reselect';

const reviewSelector = ({reviews: {list}}) => list;

export const productRatingSelector = createSelector(
	[reviewSelector],
	reviews =>
		reviews.reduce((sum, {rating}) => sum + rating, 0) / reviews.length || 0
);
