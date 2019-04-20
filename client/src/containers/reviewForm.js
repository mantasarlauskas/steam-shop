import { connect } from "react-redux";
import { addReview } from "../thunks/reviews";
import ReviewForm from "../components/reviewForm";

const mapDispatchToProps = {
  addReview
};

export default connect(
  null,
  mapDispatchToProps
)(ReviewForm);
