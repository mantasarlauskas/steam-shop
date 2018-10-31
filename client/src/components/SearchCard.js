import React from 'react';

export default ({ game: { logo, title } }) => (
    <div className="card search-card">
        <img className="card-img-top" src={logo} alt="Card image cap" />
        <div className="card-body">
            <p className="card-text">{title}</p>
        </div>
    </div>
);