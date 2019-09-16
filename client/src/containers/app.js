import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getCart} from '../thunks/cart';
import App from '../components/app';

const mapStateToProps = ({token, menu: {isOpen}}) => ({
	token,
	isOpen
});

const mapDispatchToProps = {
	getCart
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
