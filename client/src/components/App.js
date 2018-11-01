import React, { Component, Fragment } from 'react';
import Main from './Main';
import Users from './Users';
import Options from '../containers/OptionsContainer';
import { Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Header from '../containers/HeaderContainer';
import Navbar from '../containers/NavbarContainer';
import NoMatch from './NoMatch';
import ProductUpload from './ProductUpload';
import KeyUpload from './KeyUpload';
import Product from '../containers/ProductContainer';
import Cart from '../containers/CartContainer';

class App extends Component {
  componentWillMount() {
    const { games, requestProducts } = this.props;
    console.log("a");
    games.length === 0 && requestProducts();
  }

  componentDidUpdate(prevProps) {
    const { location, resetUserEditForm, resetNavbar } = this.props;
    location !== prevProps.location && prevProps.location.pathname === "/options" && resetUserEditForm();
    location !== prevProps.location && resetNavbar();
  }

  render() {
    const { token } = this.props;
    let routes;
    if(token && jwt.decode(token).role === 1) {
      routes = (
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/options" component={Options} />
          <Route path="/product-upload" component={ProductUpload} />
          <Route path="/key-upload" component={KeyUpload} />
          <Route path="/users" component={Users} /> 
          <Route exact path="/product/:id" component={Product} />
          <Route path="/cart" component={Cart} /> 
          <Route component={NoMatch} />
        </Switch>
      );
    } else if(token) {
      routes = (
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/options" component={Options} />
          <Route exact path="/product/:id" component={Product} />
          <Route path="/cart" component={Cart} /> 
          <Route component={NoMatch} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/product/:id" component={Product} />
          <Route component={NoMatch} />
        </Switch>
      );
    }
    return (
      <Fragment>
        <Header />
        <Navbar />
          { routes }      
      </Fragment>     
    );
  }
}

export default App;