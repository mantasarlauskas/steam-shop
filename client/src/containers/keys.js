import { connect } from "react-redux";
import { getKeys, removeKey } from "../thunks/keys";
import Keys from "../components/keys";

const mapStateToProps = ({ keys: { list, isLoading } }) => ({
  keys: list,
  isLoading
});

const mapDispatchToProps = {
  getKeys,
  removeKey
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Keys);
