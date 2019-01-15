import {connect} from 'react-redux';
import KeyForm from '../components/KeyForm';
import {addKey, editKey} from '../thunks/keys';

const mapStateToProps = ({token, products}, {match: {params: {id}}}) => ({
  token,
  products,
  id
});

const mapDispatchToProps = dispatch => ({
  onAdd: fields => dispatch(addKey(fields)),
  onEdit: fields => dispatch(editKey(fields))
});

export default connect(mapStateToProps, mapDispatchToProps)(KeyForm);
