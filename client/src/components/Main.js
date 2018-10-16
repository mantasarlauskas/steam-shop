import React, { Component } from 'react';
import Carousel from './Carousel';
import ProductCard from './ProductCard';
import { connect } from 'react-redux';
import { getProducts } from '../actions/products';

class Main extends Component {

  componentDidMount() {
    const { games, dispatch } = this.props;
    games.length === 0 && dispatch(getProducts());
  }

  render() {
    const { isFetching, games } = this.props;
    return (
      <div className="app">
        <Carousel />
        { isFetching === false ?
          (
            <div className="container mt-2">
              <h3>Rekomenduojami</h3>
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