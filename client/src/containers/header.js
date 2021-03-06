import {connect} from 'react-redux';
import {toggleMenu} from '../thunks/menu';
import {showLoginForm} from '../actions/forms';
import {resetToken} from '../actions/token';
import {cartCountSelector} from '../selectors/cart';
import Header from '../components/header';

const mapStateToProps = ({
	token,
	navbar,
	forms: {loginForm, registrationForm},
	...state
}) => ({
	token,
	cartCount: cartCountSelector(state),
	registrationForm,
	loginForm
});

const mapDispatchToProps = {
	toggleMenu,
	showLoginForm,
	resetToken
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
