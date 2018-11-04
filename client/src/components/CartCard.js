import React from 'react';
import { Link } from 'react-router-dom';

export default ({ title, price, logo, count }) => {
  return (
    <div className="cart-body">
      <img className="img-fluid" src={logo} alt="Game logo" />
      <h5 className="">{ title }</h5>
      <p className="">${ price }</p>
      <p className="">{ count }</p>
      <p className="">${ count * price }</p>
    </div>
  );
}