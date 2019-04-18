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

const mapDispatchToProps = {
  toggleMenu,
  showLoginForm,
  resetToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
