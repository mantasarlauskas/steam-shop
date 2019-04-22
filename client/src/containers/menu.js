import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import { toggleMenu } from "../thunks/menu";
import Menu from "../components/menu";

const mapStateToProps = ({ token, menu: { isClosing } }) => ({
  role: token ? jwt.decode(token).role : -1,
  isClosing
});

const mapDispatchToProps = {
  toggleMenu
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
