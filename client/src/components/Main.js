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

  displayGames() {
    const { games } = this.props;
    for(let i = 0; i < games.length; i = i + 3) {
      return (
        <div key={i} className="row">
          { games[i] && <ProductCard key={games[i].id} {...games[i]} /> }
          { games[i + 1] && <ProductCard key={games[i + 1].id} {...games[i + 1]} /> }
          { games[i + 2] && <ProductCard key={games[i + 2].id} {...games[i + 2]} /> }
        </div>
      );
    }
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div className="app">
        <Carousel />
        { isFetching === false ?
          (
            <div className="container mt-2">
              <h3>Rekomenduojami</h3>
              { this.displayGames() }
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