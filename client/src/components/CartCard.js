import React from 'react';
import {FaPlusCircle, FaMinusCircle} from 'react-icons/fa';

export default ({title, price, logo, cartCount, count, onAdd, onRemove}) => {
  return (
    <div className="cart-body">
      <img className="img-fluid" src={logo} alt="Game logo"/>
      <h5 className="">{title}</h5>
      <p className="">${price}</p>
      <p className="">
        {count > 0 && <FaPlusCircle onClick={onAdd}/>}
        {cartCount}
        <FaMinusCircle onClick={onRemove}/>
      </p>
      <p>${(cartCount * price).toFixed(2)}</p>
    </div>
  );
}