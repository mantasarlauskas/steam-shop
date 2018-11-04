import React from 'react';
import CartCard from './CartCard';

export default ({ products }) => {
  console.log(products);
  return (
    <div className="app container cart">
      <h1 className="cart-title">Mano krepšelis</h1>
      <hr />
      <div className="cart-body">
        <p>Logo</p>
        <p>Name</p>
        <p>Vieneto kaina</p>
        <p>Kiekis</p>
        <p>Bendra kaina</p>
      </div>
      { products.map(({ id, ...product }) => <CartCard key={id} {...product} />) }
    </div>
  );
}