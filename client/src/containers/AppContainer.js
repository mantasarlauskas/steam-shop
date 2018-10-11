import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { resetSuccessMessage } from '../actions/auth';
import { resetNavbar } from '../actions/navbar';
import App from '../components/App';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ token }) => ({
  token
});

const mapDispatchToProps = dispatch => ({
  resetNavbar: () => dispatch(resetNavbar()),
  resetUserEditForm: () => {
    dispatch(resetSuccessMessage());
    dispatch(reset("editUserForm"));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));