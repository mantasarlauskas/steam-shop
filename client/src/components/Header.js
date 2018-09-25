import React from 'react';
import { FaBars, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default ({ toggleNavbar }) => (
  <header className="nav navbar-expand-lg bg-dark">
    <div className="menu-icon" onClick={toggleNavbar}>
      <FaBars />
    </div>
    <div className="search-input">
      <input type="text" className="form-control" placeholder="Ieškoti" />
    </div>
    <div className="user-actions dropdown">
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
  </header>
);