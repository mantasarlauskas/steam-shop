import React, {Component} from 'react';
import {FaPlusCircle} from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {config, url} from "../server";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: '',
      reviews: []
    };

    this.getReviews();
  }

  getReviews = () => {
    const {id, token} = this.props;

    axios
      .get(`${url}/review/${id}`, config(token))
      .then(({data}) => this.setState({reviews: data}));
  };

  addReview = data => {
    const{token} = this.props;

    axios
      .post(`${url}/review`, data, config(token))
      .then(() => this.getReviews())
  };

  handleTextChange = e => {
    this.setState({
      review: e.target.value
    });
  };

  handleReviewSubmit = e => {
    const {review} = this.state;
    const {onSubmit, product: {id}} = this.props;
    e.preventDefault();

    review.length > 0 && this.addReview({text: review, game_id: id});
  };

  render() {
    const {product, addToCart, token} = this.props;

    if (product) {
      const {title, logo, id, count} = product;
      const {reviews} = this.state;

      const reviewForm = (
        <form onSubmit={this.handleReviewSubmit}>
          <textarea onChange={this.handleTextChange}/>
          <Button type="submit" variant="contained" color="primary">
            Patvirtinti
          </Button>
        </form>
      );

      const showReview = ({user_id, id, text}) => (
        <div key={id}>
          Vartotojas: {user_id}
          Atsiliepimasl: {text}
        </div>
      );

      return (
        <div className="app container product">
          <div className="clearfix">
            <h1 className="product-title float-left">{title}</h1>
            <h6 className="float-right">Raktų kiekis sandelyje: {count}</h6>
          </div>
          <hr/>
          <div className="product-body">
            <div className="product-media">
              <img src={logo} alt="Product cover"/>
            </div>
            <div className="product-info">
              {count > 0 && <FaPlusCircle onClick={() => addToCart(id)}/>}
            </div>
          </div>
          {token && reviewForm}
          {reviews.map(showReview)}
        </div>
      );
    } else {
      return (
        <div>
          Tokios prekes nera
        </div>
      );
    }
  }
}

export default Product;