import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import jwt from "jsonwebtoken";
import Main from "../../containers/main";
import Users from "../../containers/users";
import Profile from "../../containers/profile";
import Header from "../../containers/header";
import Menu from "../../containers/menu";
import EditProductForm from "../../containers/editProductForm";
import AddProductForm from "../../containers/addProductForm";
import EditKeyForm from "../../containers/editKeyForm";
import AddKeyForm from "../../containers/addKeyForm";
import Product from "../../containers/product";
import Cart from "../../containers/cart";
import Games from "../../containers/games";
import Orders from "../../containers/orders";
import Order from "../../containers/order";
import Keys from "../../containers/keys";
import EditUser from "../../containers/EditUserContainer";
import ChangePassword from "../../containers/changePassword";
import NoMatch from "../noMatch";
import Footer from "../footer";
import ScrollToTop from "../scrollToTop";

class App extends Component {
  componentDidMount() {
    const { getCart, token } = this.props;
    token && getCart();
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
        <Route exact path="/product-upload" component={AddProductForm} />
        <Route path="/product-upload/:id" component={EditProductForm} />
        <Route exact path="/key-upload" component={AddKeyForm} />
        <Route path="/key-upload/:id" component={EditKeyForm} />
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
  getCart: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

export default App;
