import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

export default ({ product, addToCart }) => { 
    if(product) {
        const { title, logo, id, count } = product;
        return (
            <div className="app container product">
                <div className="clearfix">
                  <h1 className="product-title float-left">{ title }</h1>
                  <h6 className="float-right">Raktų kiekis sandelyje: {count}</h6>
                </div>
                <hr />
                <div className="product-body">
                    <div className="product-media">
                      <img src={logo} alt="Product cover" />
                    </div>
                    <div className="product-info">
                      {count > 0 && <FaPlusCircle onClick={() => addToCart(id)} />}
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}