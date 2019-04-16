import { connect } from "react-redux";
import { toggleMenu } from "../thunks/menu";
import { showLoginForm } from "../actions/forms";
import { resetToken } from "../actions/auth";
import { cartCountSelector } from "../selectors/cart";
import Header from "../components/header";

const mapStateToProps = ({ token, navbar, ...state }) => ({
  token,
  cartCount: cartCountSelector(state)
});

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(toggleMenu()),
  showLogin: () => dispatch(showLoginForm()),
  logout: () => dispatch(resetToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
