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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarRatings from 'react-star-ratings';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import withWidth from '@material-ui/core/withWidth';
import {compose} from 'redux';

class Product extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      review: '',
      reviews: null,
      rating: 0,
      emptyError: false,
      starError: false,
      form: false
    };

    this.state = this.initialState;

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

  deleteReview = data => {
    const {token} = this.props;

    axios
    ({
      method: 'delete',
      url: `${url}/review`,
      data,
      ...config(token)
    })
      .then(() => this.getReviews());
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
      this.setState(this.initialState);
    } else if (review.length === 0 && rating === 0) {
      this.setState({
        emptyError: true,
        starError: true
      });
    } else if (review.length === 0) {
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

  handleReviewRemove = id => {
    const {history, onRemove} = this.props;

    onRemove(id);
    history.push('/games');
  };

  render() {
    const {product, addToCart, token, classes, width} = this.props;
    const {reviews, rating, emptyError, starError, form} = this.state;
    const user = jwt.decode(token);

    if (product && reviews) {
      const {title, logo, id, totalCount, usedCount, description, price} = product;
      const count = totalCount - parseInt(usedCount || 0);

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

      const showReview = ({User: {username}, id, user_id, text, rating, createdAt}) => (
        <Paper className={classes.review} key={id}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                {username}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" className={classes.date}>
                {new Date(createdAt).toLocaleString()}
                {user && (user.role === 1 || user.id === user_id) && (
                  <IconButton>
                    <DeleteIcon onClick={() => this.deleteReview({user_id, id})}/>
                  </IconButton>
                )}
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

      const displayCover = className => (
        <img className={className} src={logo} alt="Product cover"/>
      );

      const displayInfo = (
        <Fragment>
          <Grid container>
            <Grid item xs={totalCount === 0 ? 8 : 10} sm={totalCount === 0 ? 10 : 11}>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
            </Grid>
            {user && user.role === 1 && (
              <Grid item xs={totalCount === 0 ? 4 : 2} sm={totalCount === 0 ? 2 : 1}>
                <Grid container>
                  <Grid item xs={totalCount === 0 ? 6 : 12}>
                    <Link to={`/product-upload/${id}`}>
                      <IconButton>
                        <EditIcon/>
                      </IconButton>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    {totalCount === 0 && (
                      <IconButton>
                        <DeleteIcon onClick={() => this.handleReviewRemove(id)}/>
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
          <StarRatings
            rating={reviews.reduce((sum, {rating}) => sum + rating, 0) / reviews.length || 0}
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
            <Fragment>
              <Typography className={classes.success} variant="body1" gutterBottom>
                Prekės kiekis sandelyje: {count} vnt.
              </Typography>
              {token ? (
                <div align="center">
                  <Button className={classes.submit} onClick={() => addToCart(id)}>
                    <ShoppingCartIcon spacing={8}/>
                    Į krepšelį
                  </Button>
                </div>
              ) : (
                <div className={classes.error}>
                  Norėdami pirkti turite prisijungti
                </div>
              )}
            </Fragment>
          ) : (
            <Typography className={classes.error} variant="body1" gutterBottom>
              Apgailestaujame, tačiau prekės šiuo metu sandelyje neturime
            </Typography>
          )}
        </Fragment>
      );

      return (
        <div className={`${classes.root} container`}>
          <h1 className="product-title">
            {title}
          </h1>
          <hr/>
          <Grid container spacing={24}>
            {width === 'lg' || width === 'xl' ? (
              <Fragment>
                <Grid item lg={6}>
                  <Paper className={classes.paper}>
                    {displayCover(classes.image)}
                  </Paper>
                </Grid>
                <Grid item lg={6}>
                  <Paper className={classes.paper}>
                    {displayInfo}
                  </Paper>
                </Grid>
              </Fragment>
            ) : (
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div className={classes.imageSmallWrapper}>
                    {displayCover(classes.imageSmall)}
                  </div>
                  {displayInfo}
                </Paper>
              </Grid>
            )
            }
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
        <Typography className={classes.empty} variant="h6">
          Tokios prekės nėra
        </Typography>
      );
    }
  }
}

export default compose(withStyles(styles), withWidth())(Product);
