import { Component } from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
  componentDidUpdate({ location: prevLocation }) {
    const { location } = this.props;
    location !== prevLocation && window.scrollTo(0, 0);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(ScrollToTop);
