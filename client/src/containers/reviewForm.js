import { connect } from "react-redux";
import { addReview } from "../thunks/reviews";
import ReviewForm from "../components/reviewForm";

const mapDispatchToProps = dispatch => ({
  onAdd: data => dispatch(addReview(data))
});

export default connect(
  null,
  mapDispatchToProps
)(ReviewForm);
