import React, { Component } from 'react';
import Carousel from './Carousel';
import ProductCard from './ProductCard';
import { connect } from 'react-redux';

class Main extends Component {
  render() {
    const { games } = this.props;
    return (
      <div className="app">
        <Carousel />
          <div className="container-fluid mt-2">
            <h3 className="product-container-title">Rekomenduojami</h3>
            <div className="product-container">
              { games.map(game => <ProductCard key={game.id} {...game} />) }
            </div>
          </div>
      </div>
    );
  }
}

export default connect(({products}) => ({
  games: products
}))(Main);