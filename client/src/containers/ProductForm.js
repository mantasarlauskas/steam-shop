import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, reset } from 'redux-form';
import Form from '../components/Form';
import { addProduct } from '../actions/products';

const mapStateToProps = ({ auth: { successMessage } }) => ({
  successMessage
});

const mapDispatchToProps = dispatch => ({
  onSubmit: fields => {
    console.log(fields);
    dispatch(addProduct(fields))
  }
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm()
)(Form);
