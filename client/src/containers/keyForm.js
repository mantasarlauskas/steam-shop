import { connect } from "react-redux";
import KeyForm from "../components/keyForm";

const mapStateToProps = (
  { token, products: { list, isLoading } },
  {
    match: {
      params: { id }
    }
  }
) => ({
  token,
  products: list,
  isProductsLoading: isLoading,
  id: parseInt(id)
});

export default connect(mapStateToProps)(KeyForm);
