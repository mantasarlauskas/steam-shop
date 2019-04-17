import { connect } from "react-redux";
import Users from "../components/users";

const mapStateToProps = ({ token }) => ({
  token
});
export default connect(mapStateToProps)(Users);
