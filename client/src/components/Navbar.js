import React from 'react';
import { FaHome, FaShoppingCart } from 'react-icons/fa';

export default ({ navbar }) => (
  <nav className={navbar ? "navigation-bar bg-dark active" : "navigation-bar bg-dark"}>
    <ul className="list-group">
      <li className="list-group-item bg-dark"><FaHome /> Pagrindinis</li>
      <li className="list-group-item bg-dark"><FaShoppingCart /> Užsakymai</li>
    </ul>
  </nav>
);