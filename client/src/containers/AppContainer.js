import {connect} from 'react-redux';
import App from '../components/App';
import {withRouter} from 'react-router-dom';
import {initPage} from "../thunks/page";

const mapStateToProps = ({token}) => ({
  token
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(initPage())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));