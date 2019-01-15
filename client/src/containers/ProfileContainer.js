import {connect} from 'react-redux';
import Profile from '../components/Profile';
import jwt from 'jsonwebtoken';

const mapStateToProps = ({token}) => ({
  user: jwt.decode(token)
});

export default connect(mapStateToProps)(Profile);
