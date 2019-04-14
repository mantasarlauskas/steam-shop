import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadData } from "../thunks/page";
import App from "../components/app";

const mapStateToProps = ({ token, menu: { isOpen } }) => ({
  token,
  isOpen
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadData())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
