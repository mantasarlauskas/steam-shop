import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

export default ({ product, addToCart }) => { 
    if(product) {
        const { title, logo, id } = product; 
        return (
            <div className="app container product">
                <h1 className="product-title">{ title }</h1>
                <hr />
                <div className="product-body">
                    <div className="product-media">
                        <img src={logo} alt="Product cover" />
                    </div>
                    <div className="product-info">
                        <FaPlusCircle onClick={() => addToCart(id)} />
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}