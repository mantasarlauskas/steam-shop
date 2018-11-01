import React from 'react';

export default ({ products }) => (
    <div className="app">
        { products.map((product, index) => <div key={index}>{product.title}</div>) }
    </div>
);