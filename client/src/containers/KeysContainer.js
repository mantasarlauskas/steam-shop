import {connect} from 'react-redux';
import Keys from "../components/Keys";
import {removeKey} from "../thunks/keys";

const mapStateToProps = ({token}) => ({
  token
});

const mapDispatchToProps = dispatch => ({
  onRemove: id => dispatch(removeKey(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Keys);
