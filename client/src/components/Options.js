import React, { Component } from 'react';
import EditUserForm from '../containers/EditUserForm';

class Options extends Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    return (
      <div className="app">

      </div>
    );
  }
}

export default Options;