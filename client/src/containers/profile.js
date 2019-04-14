import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import Profile from "../components/profile";

const mapStateToProps = ({ token }) => ({
  user: jwt.decode(token)
});

export default connect(mapStateToProps)(Profile);
