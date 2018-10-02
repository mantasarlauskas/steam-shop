import React from 'react';
import Header from '../containers/HeaderContainer';
import Navbar from '../containers/NavbarContainer';
import Carousel from './Carousel';
import Games from './Games';

export default () => (
  <div className="app">
    <Header />
    <Navbar />
    <Carousel />
    <Games />
  </div>
);