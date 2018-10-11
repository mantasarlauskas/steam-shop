import { connect } from 'react-redux';
import { change } from 'redux-form';
import Options from '../components/Options';
import jwt from 'jsonwebtoken';

const mapStateToProps = ({ token }) => ({
  token
});

const mapDispatchToProps = dispatch => ({
  onLoad: user => dispatch(change("editUserForm", "email", user["email"]))
});

const mergeProps = ({ token, ...stateProps }, { onLoad }, ownProps) => ({
  ...stateProps,
  ...ownProps,
  onLoad: () => onLoad(jwt.decode(token))
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Options);
