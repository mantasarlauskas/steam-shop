import React, {Component, Fragment} from 'react';
import Main from '../containers/MainContainer';
import Users from '../containers/UsersContainer';
import Profile from '../containers/ProfileContainer';
import {Route, Switch} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Header from '../containers/HeaderContainer';
import Navbar from '../containers/NavbarContainer';
import NoMatch from './NoMatch';
import ProductFormContainer from '../containers/ProductFormContainer';
import KeyFormContainer from '../containers/KeyFormContainer';
import Product from '../containers/ProductContainer';
import Cart from '../containers/CartContainer';
import Games from '../containers/GamesContainer';
import Orders from '../containers/OrdersContainer';
import Order from "../containers/OrderContainer";
import Keys from '../containers/KeysContainer';
import EditUser from '../containers/EditUserContainer';
import ChangePassword from '../containers/ChangePasswordContainer';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props);

    props.onLoad();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location !== prevProps.location) {
      this.props.onRouteChange();
    }
  }

  render() {
    const {token} = this.props;
    let routes;

    if (token && jwt.decode(token).role === 1) {
      routes = (
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/games" component={Games}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/keys" component={Keys}/>
          <Route path="/users" component={Users}/>
          <Route path="/product/:id" component={Product}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/order/:id" component={Order}/>
          <Route path="/product-upload/:id?" component={ProductFormContainer}/>
          <Route path="/key-upload/:id?" component={KeyFormContainer}/>
          <Route path="/edit-profile" component={EditUser}/>
          <Route path="/change-password" component={ChangePassword}/>
          <Route component={NoMatch}/>
        </Switch>
      );
    } else if (token) {
      routes = (
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/games" component={Games}/>
          <Route path="/profile" component={Profile}/>
          <Route exact path="/product/:id" component={Product}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/orders" component={Orders}/>
          <Route exact path="/order/:id" component={Order}/>
          <Route path="/edit-profile" component={EditUser}/>
          <Route path="/change-password" component={ChangePassword}/>
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
        <div className="content">
          <Header/>
          <Navbar/>
          {routes}
        </div>
        <Footer/>
      </Fragment>
    );
  }
}

export default App;