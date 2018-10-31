import React from 'react';

export default ({ title, price, logo }) => ( 
  <div className="product-card card">
    <img className="card-img-top img-fluid" src={logo} alt="Game logo" />
    <div className="card-body">
      <h5 className="card-title">{ title }</h5>
      <p className="card-text">${ price }</p>
      <a className="btn btn-primary">Peržiūrėti</a>
    </div>
  </div>
);