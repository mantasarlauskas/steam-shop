import React, {Component, Fragment} from 'react';
import Main from './Main';
import Users from '../containers/UsersContainer';
import Options from '../containers/OptionsContainer';
import {Route, Switch} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Header from '../containers/HeaderContainer';
import Navbar from '../containers/NavbarContainer';
import NoMatch from './NoMatch';
import ProductUpload from './ProductUpload';
import KeyUpload from './KeyUpload';
import Product from '../containers/ProductContainer';
import Cart from '../containers/CartContainer';
import Games from '../containers/GamesContainer';
import Orders from '../containers/OrdersContainer';
import Order from "../containers/OrderContainer";

class App extends Component {
  constructor(props) {
    super(props);
    props.onLoad();
  }

  render() {
    const {token} = this.props;
    let routes;
    if (token && jwt.decode(token).role === 1) {
      routes = (
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/games" component={Games}/>
          <Route path="/options" component={Options}/>
          <Route path="/product-upload" component={ProductUpload}/>
          <Route path="/key-upload" component={KeyUpload}/>
          <Route path="/users" component={Users}/>
          <Route exact path="/product/:id" component={Product}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/orders" component={Orders}/>
          <Route exact path="/order/:id" component={Order}/>
          <Route component={NoMatch}/>
        </Switch>
      );
    } else if (token) {
      routes = (
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/games" component={Games}/>
          <Route path="/options" component={Options}/>
          <Route exact path="/product/:id" component={Product}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/orders" component={Orders}/>
          <Route exact path="/order/:id" component={Order}/>
          <Route component={NoMatch}/>
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/games" component={Games}/>
          <Route exact path="/product/:id" component={Product}/>
          <Route component={NoMatch}/>
        </Switch>
      );
    }
    return (
      <Fragment>
        <Header/>
        <Navbar/>
        {routes}
      </Fragment>
    );
  }
}

export default App;