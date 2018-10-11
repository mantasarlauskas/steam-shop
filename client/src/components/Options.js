import React, { Component } from 'react';
import { registrationFields } from '../formFields';
import EditUserForm from '../containers/EditUserForm';

class Options extends Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    return (
      <div className="app">
        <EditUserForm 
          nameOfClass="editUserForm" 
          form="editUserForm" 
          fields={registrationFields.filter(field => field.id !== "username")}
        />
      </div>
    );
  }
}

export default Options;