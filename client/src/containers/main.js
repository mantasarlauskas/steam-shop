import {connect} from 'react-redux';
import {popularProductSelector} from '../selectors/products';
import {getProducts} from '../thunks/products';
import Main from '../components/main';

const mapStateToProps = state => ({
	games: popularProductSelector(state),
	isLoading: state.products.isLoading
});

const mapDispatchToProps = {
	getProducts
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);
