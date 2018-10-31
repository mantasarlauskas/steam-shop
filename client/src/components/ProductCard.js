import React from 'react';
import { Link } from 'react-router-dom';

export default ({ id, title, price, logo }) => {
  return ( 
    <div className="product-card card">
      <img className="card-img-top img-fluid" src={logo} alt="Game logo" />
      <div className="card-body">
        <h5 className="card-title">{ title }</h5>
        <p className="card-text">${ price }</p>
        <Link className="btn btn-primary" to={`/product/${id}`}>Peržiūrėti</Link>
      </div>
    </div>
  );
}