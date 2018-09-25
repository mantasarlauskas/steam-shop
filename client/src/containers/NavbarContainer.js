import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

const mapStateToProps = ({ navbar }) => ({
  navbar
});

export default connect(mapStateToProps)(Navbar);