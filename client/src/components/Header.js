import React from 'react';
import { FaBars } from 'react-icons/fa';

export default () => (
  <header className="nav navbar-expand-lg bg-dark">
    <div className="menu-icon">
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
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
    </div>
  </header>
);