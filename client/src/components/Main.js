import React, { Component } from 'react';
import Carousel from './Carousel';
import ProductCard from './ProductCard';
import { connect } from 'react-redux';
import { getProducts } from '../actions/products';

class Main extends Component {
  render() {
    const { isFetching, games } = this.props;
    return (
      <div className="app">
        <Carousel />
        { isFetching === false ?
          (
            <div className="container-fluid mt-2">
              <h3 className="product-container-title">Rekomenduojami</h3>
              <div className="product-container">
              { games.map(game => <ProductCard key={game.id} {...game} />) }
              </div>
            </div>
          ) :
          <p>Kraunama...</p>
        }       
      </div>
    );
  }
}

export default connect(state => ({
  isFetching: state.products.isFetching,
  games: state.products.games
}))(Main);