import { connect } from "react-redux";
import OrderKeys from "../components/orderKeys";

const mapStateToProps = ({ token }) => ({
  token
});

export default connect(mapStateToProps)(OrderKeys);
