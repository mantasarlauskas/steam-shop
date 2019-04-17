import { connect } from "react-redux";
import Keys from "../components/keys";

const mapStateToProps = ({ token }) => ({
  token
});

export default connect(mapStateToProps)(Keys);
