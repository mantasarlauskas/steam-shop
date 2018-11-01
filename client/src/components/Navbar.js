import React, { Fragment } from 'react';
import { FaHome, FaShoppingCart, FaUserAlt, FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const adminPages = () => (
  <Fragment>
    <Link className="list-group-item bg-dark" to="/users"><FaUserAlt /> Vartotojai</Link>
    <Link className="list-group-item bg-dark" to="/product-upload"><FaUpload /> Žaidimų įkėlimas</Link>
    <Link className="list-group-item bg-dark" to="/key-upload"><FaUpload /> Raktų įkėlimas</Link>
  </Fragment>
);

export default ({ navbar, role }) => {
  if(navbar !== null) {
    return (
      <nav className={navbar ? "navigation-bar bg-dark active" : "navigation-bar bg-dark"}>
        <ul className="list-group">
          <Link className="list-group-item bg-dark" to="/"><FaHome /> Pagrindinis</Link>
          <Link className="list-group-item bg-dark" to="/cart"><FaShoppingCart /> Krepšelis</Link>
          { role === 1 && adminPages() }
        </ul>
      </nav>
    );
  }
  return null;
};