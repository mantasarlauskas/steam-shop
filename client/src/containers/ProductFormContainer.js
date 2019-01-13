import {connect} from 'react-redux';
import ProductForm from '../components/ProductForm';
import {addProduct, editProduct} from '../thunks/product';

const mapStateToProps = ({auth: {successMessage}, products}, {match: {params: {id}}}) => ({
  successMessage,
  product: products.find(product => product.id === parseInt(id)),
  id
});

const mapDispatchToProps = dispatch => ({
  onAdd: fields => dispatch(addProduct(fields)),
  onEdit: fields => dispatch(editProduct(fields))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
