import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import { toggleMenu } from "../thunks/menu";
import Menu from "../components/menu";

const mapStateToProps = ({ token, menu: { isClosing } }) => ({
  role: token && jwt.decode(token).role,
  isClosing
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(toggleMenu())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
