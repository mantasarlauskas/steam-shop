import {connect} from 'react-redux';
import {deleteReview} from '../thunks/reviews';
import Review from '../components/review';

const mapDispatchToProps = {
	deleteReview
};

export default connect(
	null,
	mapDispatchToProps
)(Review);
