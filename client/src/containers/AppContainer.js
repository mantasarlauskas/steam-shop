import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { resetSuccessMessage } from '../actions/auth';
import { resetNavbar } from '../actions/navbar';
import { getProducts } from '../actions/products';
import { getCart } from '../actions/cart';
import App from '../components/App';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ products: { games }, token, cart }) => ({
  token,
  games,
  cart
});

const mapDispatchToProps = dispatch => ({
  resetNavbar: () => dispatch(resetNavbar()),
  resetUserEditForm: () => {
    dispatch(resetSuccessMessage());
    dispatch(reset("editUserForm"));
  },
  requestProducts: () => dispatch(getProducts()),
  requestCart: () => dispatch(getCart())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));