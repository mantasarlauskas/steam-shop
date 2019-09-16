import {connect} from 'react-redux';
import {resetKey} from '../actions/keys';
import {onKeyLoad, editKey} from '../thunks/keys';
import KeyForm from '../components/keyForm';

const mapStateToProps = ({products: {list, isLoading}, keys: {key, isKeyLoading}}, {match: {params: {id}}}) => ({
	productKey: key,
	isLoading: isKeyLoading,
	products: list,
	isProductsLoading: isLoading,
	id: parseInt(id)
});

const mapDispatchToProps = {
	onKeyLoad,
	submitKey: editKey,
	resetKey
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(KeyForm);
