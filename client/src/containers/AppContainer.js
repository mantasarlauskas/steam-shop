import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { resetSuccessMessage } from '../actions/auth';
import { resetNavbar } from '../actions/navbar';
import { getProducts } from '../actions/products';
import App from '../components/App';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ products: { games }, token }) => ({
  token,
  games
});

const mapDispatchToProps = dispatch => ({
  resetNavbar: () => dispatch(resetNavbar()),
  resetUserEditForm: () => {
    dispatch(resetSuccessMessage());
    dispatch(reset("editUserForm"));
  },
  requestProducts: () => dispatch(getProducts())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));