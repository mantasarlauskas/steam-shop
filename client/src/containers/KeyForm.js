import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, reset } from 'redux-form';
import Form from '../components/Form';
import { addKey } from '../actions/keys';

const mapStateToProps = ({ products: { games }, auth: { successMessage } }) => ({
  successMessage,
  items: games
});

const mapDispatchToProps = dispatch => ({
  onSubmit: fields => dispatch(addKey(fields))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm()
)(Form);
