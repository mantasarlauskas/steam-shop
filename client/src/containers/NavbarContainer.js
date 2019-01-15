import {connect} from 'react-redux';
import Navbar from '../components/Navbar';
import jwt from 'jsonwebtoken';
import {resetNavbar} from "../actions/navbar";

const mapStateToProps = ({navbar, token}) => ({
  navbar,
  role: token && jwt.decode(token).role
});

const mapDispatchToProps = dispatch => ({
  onReset: () => dispatch(resetNavbar())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);