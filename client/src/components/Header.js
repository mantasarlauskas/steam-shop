import React from 'react';
import { FaBars, FaCog, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import Login from '../containers/LoginContainer';
import Registration from '../containers/RegistrationContainer';

export default ({ toggleNavbar, loggedIn, showLogin }) => (
  <header>
    <Login /> 
    <Registration />
    <div className="nav navbar-expand-lg bg-dark">
      <div className="menu-icon" onClick={toggleNavbar}>
        <FaBars />
      </div>
      <div className="search-input">
        <input type="text" className="form-control" placeholder="Ieškoti" />
      </div>
      { !loggedIn ? (
          <div className="user-login">
            <div className="toggle-login-button" onClick={showLogin}>
              Prisijungimas
            </div>
          </div>
        ) : (
          <div className="user-actions">
            <div className="user-shopping-cart">
              <FaShoppingCart size={24} />
              <span className="badge badge-danger">0</span>
            </div>
            <div className="dropdown">
              <img 
                className="img-thumbnail avatar" 
                src="/img/default.png" 
                alt="User avatar" 
                data-toggle="dropdown" 
              />
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#"><FaCog /> Nustatymai</a>
                <a className="dropdown-item" href="#"><FaSignOutAlt /> Atsijungti</a>
              </div>
            </div>
          </div>
        )
      }
    </div>
  </header>
);