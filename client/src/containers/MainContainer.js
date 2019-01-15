import {connect} from "react-redux";
import Main from '../components/Main';
import {popularProductSelector} from "../selectors/products";

const mapStateToProps = state => ({
  games: popularProductSelector(state)
});

export default connect(mapStateToProps)(Main);