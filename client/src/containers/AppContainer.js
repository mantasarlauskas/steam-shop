import {connect} from 'react-redux';
import App from '../components/App';
import {withRouter} from 'react-router-dom';
import {initPage, resetMessages} from "../thunks/page";

const mapStateToProps = ({token}) => ({
  token
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(initPage()),
  onRouteChange: () => dispatch(resetMessages())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));