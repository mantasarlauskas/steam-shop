import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import jwt from "jsonwebtoken";
import Main from "../../containers/main";
import Users from "../../containers/users";
import Profile from "../../containers/profile";
import Header from "../../containers/header";
import Menu from "../../containers/menu";
import NoMatch from "../noMatch";
import ProductFormContainer from "../../containers/productForm";
import KeyFormContainer from "../../containers/KeyFormContainer";
import Product from "../../containers/product";
import Cart from "../../containers/cart";
import Games from "../../containers/games";
import Orders from "../../containers/orders";
import Order from "../../containers/order";
import Keys from "../../containers/keys";
import EditUser from "../../containers/EditUserContainer";
import ChangePassword from "../../containers/ChangePasswordContainer";
import Footer from "../footer";
import ScrollToTop from "../scrollToTop";

class App extends Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  renderRoutes = () => {
    const { token } = this.props;
    return token && jwt.decode(token).role === 1 ? (
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/keys" component={Keys} />
        <Route path="/users" component={Users} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={Orders} />
        <Route path="/order/:id" component={Order} />
        <Route path="/product-upload/:id?" component={ProductFormContainer} />
        <Route path="/key-upload/:id?" component={KeyFormContainer} />
        <Route path="/edit-profile" component={EditUser} />
        <Route path="/change-password" component={ChangePassword} />
        <Route exact path="/" component={Main} />
        <Route path="/games" component={Games} />
        <Route path="/product/:id" component={Product} />
        <Route component={NoMatch} />
      </Switch>
    ) : token ? (
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={Orders} />
        <Route path="/order/:id" component={Order} />
        <Route path="/edit-profile" component={EditUser} />
        <Route path="/change-password" component={ChangePassword} />
        <Route exact path="/" component={Main} />
        <Route path="/games" component={Games} />
        <Route path="/product/:id" component={Product} />
        <Route component={NoMatch} />
      </Switch>
    ) : (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/games" component={Games} />
        <Route path="/product/:id" component={Product} />
        <Route component={NoMatch} />
      </Switch>
    );
  };

  render() {
    const { isOpen, history } = this.props;
    return (
      <ScrollToTop>
        <Header history={history} />
        <div className="content">
          {isOpen && <Menu />}
          {this.renderRoutes()}
        </div>
        <Footer />
      </ScrollToTop>
    );
  }
}

App.propTypes = {
  onLoad: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

export default App;
