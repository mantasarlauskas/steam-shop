import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import CartIcon from "@material-ui/icons/ShoppingCart";
import Login from "../../containers/LoginForm";
import Registration from "../../containers/RegistrationForm";
import Search from "../../containers/search";
import styles from "./styles";

class Header extends Component {
  state = {
    anchorEl: null
  };

  handleProfileMenuOpen = ({ currentTarget }) => {
    this.setState({
      anchorEl: currentTarget
    });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  renderMenu = () => {
    const { anchorEl } = this.state;
    const { resetToken, classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <Link to="/profile">
          <MenuItem onClick={this.handleMenuClose}>
            <SettingsIcon className={classes.linkIcon} />
            <span className={classes.linkDark}>Profilis</span>
          </MenuItem>
        </Link>
        <Link to="/" onClick={resetToken}>
          <MenuItem onClick={this.handleMenuClose}>
            <LogoutIcon className={classes.linkIcon} />
            <span className={classes.linkDark}>Atsijungti</span>
          </MenuItem>
        </Link>
      </Menu>
    );
  };

  render() {
    const { toggleMenu, token, showLoginForm, cartCount, classes } = this.props;
    return (
      <header position="static">
        <Login />
        <Registration />
        <div className={classes.root}>
          <AppBar className={classes.bar}>
            <Toolbar>
              <IconButton
                onClick={toggleMenu}
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Search />
              <div className={classes.grow} />
              {!token ? (
                <Button color="inherit" onClick={showLoginForm}>
                  <div className={classes.login}>Prisijungimas</div>
                </Button>
              ) : (
                <Fragment>
                  <Link className={classes.link} to="/cart">
                    <IconButton color="inherit">
                      <Badge badgeContent={cartCount} color="secondary">
                        <CartIcon fontSize="large" />
                      </Badge>
                    </IconButton>
                  </Link>
                  <IconButton
                    color="inherit"
                    onClick={this.handleProfileMenuOpen}
                  >
                    <AccountCircle fontSize="large" />
                  </IconButton>
                  {this.renderMenu()}
                </Fragment>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  resetToken: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  showLoginForm: PropTypes.func.isRequired,
  cartCount: PropTypes.number.isRequired
};

export default withStyles(styles)(Header);
