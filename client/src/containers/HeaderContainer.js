import { connect } from 'react-redux';
import Header from '../components/Header';
import { toggleNavbar } from '../actions/navbar';

const mapDispatchToProps = dispatch => ({
  toggleNavbar: () => dispatch(toggleNavbar())
});

export default connect(null, mapDispatchToProps)(Header);