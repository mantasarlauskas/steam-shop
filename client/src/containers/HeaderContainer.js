import { connect } from 'react-redux';
import Header from '../components/Header';
import { toggleNavbar } from '../actions/navbar';
import { showLoginForm } from '../actions/forms';

const mapDispatchToProps = dispatch => ({
  toggleNavbar: () => dispatch(toggleNavbar()),
  showLogin: () => dispatch(showLoginForm())
});

export default connect(null, mapDispatchToProps)(Header);