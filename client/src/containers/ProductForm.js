import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, reset } from 'redux-form';
import Form from '../components/Form';
import { addProduct } from '../thunks/product';

const mapStateToProps = ({ auth: { successMessage } }) => ({
  successMessage
});

const mapDispatchToProps = dispatch => ({
  onSubmit: fields => dispatch(addProduct(fields))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm()
)(Form);
