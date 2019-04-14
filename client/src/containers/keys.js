import { connect } from "react-redux";
import Keys from "../components/keys";
import { removeKey, getKeys } from "../thunks/keys";

const mapStateToProps = ({ keys: { list, isLoading } }) => ({
  keys: list,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getKeys()),
  onRemove: id => dispatch(removeKey(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Keys);
