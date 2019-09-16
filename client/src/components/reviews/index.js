import React from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import Typography from '@material-ui/core/Typography';
import Review from '../../containers/review';
import Loading from '../loading';

const Reviews = ({isLoading, reviews, id, token}) =>
	isLoading ? (
		<Loading size={100}/>
	) : reviews.length > 0 ? (
		reviews
			.slice(0)
			.reverse()
			.map(review => (
				<Review
					key={review.id}
					game_id={id}
					user={jwt.decode(token)}
					{...review}
				/>
			))
	) : (
		<Typography variant="body1" gutterBottom>
			No reviews were found
		</Typography>
	);

Reviews.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	reviews: PropTypes.array.isRequired,
	id: PropTypes.number.isRequired,
	token: PropTypes.string.isRequired
};

export default Reviews;
