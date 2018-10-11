import React from 'react';
import { FaBars, FaCog, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import Login from '../containers/LoginForm';
import Registration from '../containers/RegistrationForm';
import { Link } from 'react-router-dom';
import { loginFields, registrationFields } from '../formFields';

export default ({ toggleNavbar, loggedIn, showLogin, logout }) => (
  <header>
    <Login form="loginForm" fields={loginFields} additionalText="Registracija" /> 
    <Registration form="registrationForm" fields={registrationFields} />
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
                <Link className="dropdown-item" to="/options"><FaCog /> Nustatymai</Link>
                <Link className="dropdown-item" to="/" onClick={logout}><FaSignOutAlt /> Atsijungti</Link>
              </div>
            </div>
          </div>
        )
      }
    </div>
  </header>
);