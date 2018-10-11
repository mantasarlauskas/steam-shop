import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import jwt from 'jsonwebtoken';

const mapStateToProps = ({ navbar, token }) => ({
  navbar,
  role: token && jwt.decode(token).role
});

export default connect(mapStateToProps)(Navbar);