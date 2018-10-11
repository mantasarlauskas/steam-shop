import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './stylesheets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/AppContainer';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
  
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App store={store} />
    </Router>
  </Provider>, 
  document.getElementById('root')
);
