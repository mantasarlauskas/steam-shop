import React from 'react';

export default ({ product }) => { 
    if(product) {
        const { title, logo } = product; 
        return (
            <div className="app container product">
                <h1 className="product-title">{ title }</h1>
                <hr />
                <div className="product-body">
                    <div className="product-media">
                        <img src={logo} alt="Product cover" />
                    </div>
                    <div className="product-info">
        
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}