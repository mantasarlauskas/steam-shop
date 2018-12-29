import React, {Component, Fragment} from 'react';
import Login from '../containers/LoginForm';
import Registration from '../containers/RegistrationForm';
import {Link} from 'react-router-dom';
import {loginFields, registrationFields} from '../formFields';
import Search from './Search';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/Settings';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import CartIcon from '@material-ui/icons/ShoppingCart';

const styles = {
  root: {
    flexGrow: 1
  },
  bar: {
    backgroundColor: '#343a40'
  },
  linkDark: {
    color: '#000',
    '&:hover': {
      color: '#000',
    },
  },
  link: {
    color: '#FFF',
    '&:hover': {
      color: '#FFF',
    },
  },
  linkIcon: {
    marginRight: 10
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
  }

  handleProfileMenuOpen = ({currentTarget}) => {
    this.setState({
      anchorEl: currentTarget
    });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  searchForProducts = ({target: {value}}) => {
    const {setSearchPhrase} = this.props;
    setSearchPhrase(value);
  };

  renderMenu = () => {
    const {anchorEl} = this.state;
    const {logout, classes} = this.props;
    const isMenuOpen = Boolean(anchorEl);
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>
          <SettingsIcon className={classes.linkIcon}/>
          <Link className={classes.linkDark} to="/options">
            Nustatymai
          </Link>
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose}>
          <LogoutIcon className={classes.linkIcon}/>
          <Link className={classes.linkDark} to="/" onClick={logout}>
            Atsijungti
          </Link>
        </MenuItem>
      </Menu>
    );
  };

  render() {
    const {toggleNavbar, loggedIn, showLogin, games, cartCount, classes} = this.props;
    return (
      <header>
        <Login form="loginForm" fields={loginFields} additionalText="Registracija"/>
        <Registration form="registrationForm" fields={registrationFields}/>
        <div className={classes.root}>
          <AppBar className={classes.bar} position="static">
            <Toolbar>
              <IconButton
                onClick={toggleNavbar}
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon/>
              </IconButton>
              <Search games={games} searchForProducts={this.searchForProducts}/>
              <div className={classes.grow}/>
              {!loggedIn ? (
                <Button color="inherit" onClick={showLogin}>
                  Prisijungimas
                </Button>
              ) : (
                <Fragment>
                  <Link className={classes.link} to="/cart">
                    <IconButton color="inherit">
                      <Badge badgeContent={cartCount} color="secondary">
                        <CartIcon fontSize="large"/>
                      </Badge>
                    </IconButton>
                  </Link>
                  <IconButton color="inherit" onClick={this.handleProfileMenuOpen}>
                    <AccountCircle fontSize="large"/>
                  </IconButton>
                </Fragment>
              )}
            </Toolbar>
          </AppBar>
          {this.renderMenu()}
        </div>
      </header>
    );
  }
}

export default withStyles(styles)(Header);