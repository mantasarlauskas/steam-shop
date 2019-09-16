import {connect} from 'react-redux';
import ProductForm from '../components/productForm';
import {addProduct} from '../thunks/products';

const mapDispatchToProps = {
	submitProduct: addProduct
};

export default connect(
	null,
	mapDispatchToProps
)(ProductForm);
