import {connect} from 'react-redux';
import {onKeyLoad, addKey} from '../thunks/keys';
import KeyForm from '../components/keyForm';

const mapStateToProps = ({products: {list, isLoading}}) => ({
	products: list,
	isProductsLoading: isLoading
});

const mapDispatchToProps = {
	submitKey: addKey,
	onKeyLoad
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(KeyForm);
