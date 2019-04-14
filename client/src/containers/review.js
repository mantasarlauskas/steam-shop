import { connect } from "react-redux";
import { deleteReview } from "../thunks/reviews";
import Review from "../components/review";

const mapDispatchToProps = dispatch => ({
  onDelete: data => dispatch(deleteReview(data))
});

export default connect(
  null,
  mapDispatchToProps
)(Review);
