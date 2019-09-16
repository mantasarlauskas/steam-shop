import {connect} from 'react-redux';
import Reviews from '../components/reviews';

const mapStateToProps = ({token, reviews: {list, isLoading}}) => ({
	token,
	reviews: list,
	isLoading
});

export default connect(mapStateToProps)(Reviews);
