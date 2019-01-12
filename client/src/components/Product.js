import React, {Component} from 'react';
import {FaPlusCircle} from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {config, url} from "../server";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import {styles} from '../styles/product';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
    const {token} = this.props;

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
    const {product: {id}} = this.props;

    e.preventDefault();

    review.length > 0 && this.addReview({text: review, game_id: id});
  };

  render() {
    const {product, addToCart, token, classes} = this.props;

    console.log(this.state.reviews);

    if (product) {
      const {title, logo, id, count, description, price} = product;
      const {reviews} = this.state;

      const reviewForm = (
        <form onSubmit={this.handleReviewSubmit}>
          <textarea onChange={this.handleTextChange}/>
          <Button type="submit" variant="contained" color="primary">
            Patvirtinti
          </Button>
        </form>
      );

      const showReview = ({User: {username}, id, text}) => (
        <div key={id}>
          Vartotojas: {username}
          Atsiliepimasl: {text}
        </div>
      );

      return (
        <div className={`${classes.root} container`}>
          <h1 className="product-title">
            {title}
          </h1>
          <hr/>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <img width={400} className={classes.image} src={logo} alt="Product cover"/>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {description}
                </Typography>
                <Typography className={classes.price} variant="h4" gutterBottom>
                  {price}$
                </Typography>
                {count > 0 ? (
                  <Typography className={classes.success} variant="body1" gutterBottom>
                    Prekės kiekis sandelyje: {count} vnt.
                  </Typography>
                ) : (
                  <Typography className={classes.error} variant="body1" gutterBottom>
                    Apgailestaujame, tačiau prekės sandelyje nebeturime
                  </Typography>
                )}
                {count > 0 && (
                  <div align="center">
                    <Button className={classes.submit} onClick={() => addToCart(id)}>
                      <ShoppingCartIcon spacing={8}/>
                      Į krepšelį
                    </Button>
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
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

export default withStyles(styles)(Product);