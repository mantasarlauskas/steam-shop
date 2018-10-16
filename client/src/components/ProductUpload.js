import React from 'react';
import ProductForm from '../containers/ProductForm';
import { productFields } from '../formFields';

export default () => (
  <div className="app">
    <ProductForm form="productForm" fields={productFields} />
  </div>
);