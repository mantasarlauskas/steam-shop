import { connect } from 'react-redux';
import Header from '../components/Header';
import { toggleNavbar } from '../actions/navbar';
import { showLoginForm } from '../actions/forms';
import { resetToken } from '../actions/auth';

const mapStateToProps = ({ token }) => ({
  loggedIn: token
});

const mapDispatchToProps = dispatch => ({
  toggleNavbar: () => dispatch(toggleNavbar()),
  showLogin: () => dispatch(showLoginForm()),
  logout: () => dispatch(resetToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);