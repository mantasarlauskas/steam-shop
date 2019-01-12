import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {config, url} from "../server";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import {styles} from '../styles/product';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StarRatings from 'react-star-ratings';
import TextField from '@material-ui/core/TextField';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: '',
      reviews: null,
      rating: 0,
      emptyError: false,
      starError: false,
      form: false
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

  handleTextChange = ({target: {value}}) => {
    this.setState({
      review: value
    });
  };

  handleRatingChange = rating => {
    this.setState({
      rating
    });
  };

  toggleReviewForm = () => {
    this.setState(prevState => ({
      form: !prevState.form
    }));
  };

  handleReviewSubmit = e => {
    const {review, rating} = this.state;
    const {product: {id}} = this.props;

    e.preventDefault();

    if (review.length > 0 && rating > 0) {
      this.addReview({
        text: review,
        game_id: id,
        rating
      });
      this.setState({
        emptyError: false,
        starError: false,
        form: false,
        review: '',
        rating: 0
      });
    } else if (review.length === 0 && rating === 0) {
      this.setState({
        emptyError: true,
        starError: true
      });
    } else if(review.length === 0) {
      this.setState({
        emptyError: true,
        starError: false
      });
    } else {
      this.setState({
        emptyError: false,
        starError: true
      });
    }
  };

  render() {
    const {product, addToCart, token, classes} = this.props;
    const {reviews, rating, emptyError, starError, form} = this.state;

    if (product && reviews) {
      const {title, logo, id, count, description, price} = product;

      const reviewForm = (
        <Paper className={classes.reviewForm}>
          <form onSubmit={this.handleReviewSubmit}>
            <Typography variant="h6" gutterBottom>
              Atsiliepimo forma
            </Typography>
            <hr/>
            <StarRatings
              rating={rating}
              starRatedColor="yellow"
              starHoverColor="yellow"
              changeRating={this.handleRatingChange}
              starDimension="25px"
              starSpacing="2px"
            />
            {starError && (
              <Typography className={classes.formError}>
                Pasirinkite įvertinimą
              </Typography>
            )}
            <TextField
              error={emptyError}
              id="review"
              label="Atsiliepimas"
              multiline
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={this.handleTextChange}
            />
            {emptyError && (
              <Typography className={classes.formError}>
                Atsiliepimas negali būti tuščias
              </Typography>
            )}
            <Button className={classes.reviewButton} type="submit" variant="contained" color="primary">
              Patvirtinti
            </Button>
          </form>
        </Paper>
      );

      const showReview = ({User: {username}, id, text, rating, createdAt}) => (
        <Paper className={classes.review} key={id}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                {username}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" className={classes.date}>
                {new Date(createdAt).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
          <StarRatings
            rating={rating}
            starDimension="25px"
            starSpacing="2px"
            starRatedColor="yellow"
          />
          <Typography variant="body1" className={classes.rating}>
            {rating}/5
          </Typography>
          <Typography variant="body1" gutterBottom>
            {text}
          </Typography>
        </Paper>
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
                <StarRatings
                  rating={reviews.reduce((sum, {rating}) => sum + rating, 0)/reviews.length || 0}
                  starDimension="25px"
                  starSpacing="2px"
                  starRatedColor="yellow"
                />
                <Typography variant="body2" gutterBottom>
                  {reviews.length} atsiliepimai(-ų)
                </Typography>
                <Typography variant="body1" gutterBottom>
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
                    Apgailestaujame, tačiau prekės šiuo metu sandelyje neturime
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
          {token && (
            <Fragment>
              <Button
                className={classes.reviewButton}
                type="submit"
                variant="contained"
                color="primary"
                onClick={this.toggleReviewForm}
              >
                {form ? 'Uždaryti atsiliepimo formą' : 'Rašyti atsiliepimą'}
              </Button>
              {form && reviewForm}
            </Fragment>
          )}
          <Typography variant="h5" gutterBottom>
            Atsiliepimai
          </Typography>
          <hr/>
          {reviews.length > 0 ? reviews.slice(0).reverse().map(showReview) : (
            <Typography variant="body1" gutterBottom>
              Atsiliepimų kol kas dar nėra
            </Typography>
          )}
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