import { connect } from "react-redux";
import ProductForm from "../components/productForm";
import { addProduct, editProduct } from "../thunks/products";

const mapStateToProps = (
  { products: { list, isLoading } },
  {
    match: {
      params: { id }
    }
  }
) => ({
  product: list.find(product => product.id === parseInt(id)),
  id: id && parseInt(id),
  isLoading
});

const mapDispatchToProps = dispatch => ({
  onAdd: fields => dispatch(addProduct(fields)),
  onEdit: fields => dispatch(editProduct(fields))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm);
