import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FaHome,
  FaShoppingCart,
  FaUserAlt,
  FaUpload,
  FaGamepad,
  FaFirstOrder
} from "react-icons/fa";
import { Link } from "react-router-dom";

class Menu extends Component {
  state = {
    mainPages: [
      {
        link: "",
        Icon: FaHome,
        title: "Pagrindinis"
      },
      {
        link: "games",
        Icon: FaGamepad,
        title: "Žaidimai"
      }
    ],
    userPages: [
      {
        link: "cart",
        Icon: FaShoppingCart,
        title: "Krepšelis"
      },
      {
        link: "orders",
        Icon: FaFirstOrder,
        title: "Užsakymai"
      }
    ],
    adminPages: [
      {
        link: "users",
        Icon: FaUserAlt,
        title: "Vartotojai"
      },
      {
        link: "keys",
        Icon: FaUserAlt,
        title: "Raktai"
      },
      {
        link: "product-upload",
        Icon: FaUpload,
        title: "Žaidimų įkėlimas"
      },
      {
        link: "key-upload",
        Icon: FaUpload,
        title: "Raktų įkėlimas"
      }
    ]
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = event => {
    const { onClose } = this.props;
    if (this.navbarRef && !this.navbarRef.contains(event.target)) {
      onClose();
    }
  };

  renderLink = ({ link, Icon, title }) => {
    const { onClose } = this.props;
    return (
      <Link
        key={link}
        className="list-group-item bg-dark"
        to={`/${link}`}
        onClick={onClose}
      >
        <Icon /> {title}
      </Link>
    );
  };

  render() {
    const { mainPages, userPages, adminPages } = this.state;
    const { role, isClosing } = this.props;
    return (
      <nav
        ref={x => (this.navbarRef = x)}
        className={`menu bg-dark ${isClosing && "closing"}`}
      >
        <ul className="list-group">
          {mainPages.map(this.renderLink)}
          {(role === 0 || role === 1) && userPages.map(this.renderLink)}
          {role === 1 && adminPages.map(this.renderLink)}
        </ul>
      </nav>
    );
  }
}

Menu.propTypes = {
  onClose: PropTypes.func.isRequired,
  role: PropTypes.number.isRequired,
  isClosing: PropTypes.bool.isRequired
};

export default Menu;
