import {connect} from 'react-redux';
import ProductForm from '../components/productForm';
import {getProducts, editProduct} from '../thunks/products';
import {findProductSelector} from '../selectors/products';

const mapStateToProps = (state, {match: {params: {id}}}) => ({
	product: findProductSelector(state, id),
	id: parseInt(id),
	isLoading: state.products.isLoading
});

const mapDispatchToProps = {
	getProducts,
	submitProduct: editProduct
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductForm);
