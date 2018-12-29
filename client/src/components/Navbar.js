import React, { Fragment, Component } from 'react';
import { FaHome, FaShoppingCart, FaUserAlt, FaUpload, FaGamepad, FaFirstOrder } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import enhanceWithClickOutside from "react-click-outside";

class Navbar extends Component {
  handleClickOutside() {
    const { onPageChange } = this.props;
    onPageChange();
  }

  render() {
    const { navbar, role, onPageChange } = this.props;

    const userPages = (
      <Fragment>
        <Link className="list-group-item bg-dark" to="/cart" onClick={onPageChange}>
          <FaShoppingCart /> Krepšelis
        </Link>
        <Link className="list-group-item bg-dark" to="/orders" onClick={onPageChange}>
          <FaFirstOrder /> Užsakymai
        </Link>
      </Fragment>
    );

    const adminPages = (
      <Fragment>
        <Link className="list-group-item bg-dark" to="/users" onClick={onPageChange}>
          <FaUserAlt /> Vartotojai
        </Link>
        <Link className="list-group-item bg-dark" to="/product-upload" onClick={onPageChange}>
          <FaUpload /> Žaidimų įkėlimas
        </Link>
        <Link className="list-group-item bg-dark" to="/key-upload" onClick={onPageChange}>
          <FaUpload /> Raktų įkėlimas
        </Link>
      </Fragment>
    );

    return (
      <nav className={navbar ? "navigation-bar bg-dark active" : "navigation-bar bg-dark"}>
        <ul className="list-group">
          <Link className="list-group-item bg-dark" to="/" onClick={onPageChange}>
            <FaHome /> Pagrindinis
          </Link>
          <Link className="list-group-item bg-dark" to="/games" onClick={onPageChange}>
            <FaGamepad /> Žaidimai
          </Link>
          { (role === 0 || role === 1) && userPages }
          { role === 1 && adminPages }
        </ul>
      </nav>
    );
  }
}

export default enhanceWithClickOutside(Navbar);