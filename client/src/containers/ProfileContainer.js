import { connect } from 'react-redux';
import Profile from '../components/Profile';
import jwt from 'jsonwebtoken';

const mapStateToProps = ({ token, auth: {users} }) => ({
  user: jwt.decode(token)
});

const mapDispatchToProps = dispatch => ({

});

const mergeProps = ({ token, ...stateProps }, { onLoad }, ownProps) => ({
  ...stateProps,
  ...ownProps,
  onLoad: () => onLoad()
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
