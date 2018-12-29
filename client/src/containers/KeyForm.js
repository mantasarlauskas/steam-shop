import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm, reset} from 'redux-form';
import Form from '../components/Form';
import {addKey} from '../thunks/keys';

const mapStateToProps = ({products, auth: {successMessage}}) => ({
  successMessage,
  items: products
});

const mapDispatchToProps = dispatch => ({
  onSubmit: fields => dispatch(addKey(fields))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm()
)(Form);
