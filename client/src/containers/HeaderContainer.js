import { connect } from 'react-redux';
import Header from '../components/Header';
import { toggleNavbar } from '../actions/navbar';
import { showLoginForm } from '../actions/forms';
import { resetToken } from '../actions/auth';
import { setSearchPhrase } from '../actions/search';
import { productSearchSelector } from '../selectors/products';

const mapStateToProps = ({ token, ...state }) => ({
  loggedIn: token,
  games: productSearchSelector(state)
});

const mapDispatchToProps = dispatch => ({
  toggleNavbar: () => dispatch(toggleNavbar()),
  showLogin: () => dispatch(showLoginForm()),
  logout: () => dispatch(resetToken()),
  setSearchPhrase: keyword => dispatch(setSearchPhrase(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);