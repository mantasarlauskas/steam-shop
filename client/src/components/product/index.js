import React, { Component, Fragment } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import Loading from "../loading";
import styles from "./styles";
import Review from "../../containers/review";
import ReviewForm from "../../containers/reviewForm";
import { url, config } from "../../server";

class Product extends Component {
  state = {
    isFormOpen: false
  };

  componentDidMount() {
    const { onLoad, id } = this.props;
    onLoad(id);
  }

  toggleReviewForm = () => {
    this.setState(prevState => ({
      isFormOpen: !prevState.isFormOpen
    }));
  };

  handleRemove = async id => {
    const { history, token } = this.props;
    await axios({
      method: "delete",
      url: `${url}/products`,
      data: { id },
      ...config(token)
    });
    history.push("/games");
  };

  renderForm = () => {
    const {
      token,
      classes,
      product: { id }
    } = this.props;
    const { isFormOpen } = this.state;
    return (
      token && (
        <Fragment>
          <Button
            className={classes.reviewButton}
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.toggleReviewForm}
          >
            {isFormOpen ? "Uždaryti atsiliepimo formą" : "Rašyti atsiliepimą"}
          </Button>
          {isFormOpen && (
            <ReviewForm id={id} onSubmit={this.toggleReviewForm} />
          )}
        </Fragment>
      )
    );
  };

  renderActions = () => {
    const {
      token,
      product: { id, totalCount }
    } = this.props;
    return (
      token &&
      jwt.decode(token).role === 1 && (
        <Grid item xs={totalCount === 0 ? 4 : 2} sm={totalCount === 0 ? 2 : 1}>
          <Grid container>
            <Grid item xs={totalCount === 0 ? 6 : 12}>
              <Link to={`/product-upload/${id}`}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
            </Grid>
            <Grid item xs={6}>
              {totalCount === 0 && (
                <IconButton onClick={() => this.handleRemove(id)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      )
    );
  };

  renderInfo = () => {
    const {
      product: { title, id, totalCount, usedCount, description, price },
      classes,
      token,
      addToCart,
      reviews
    } = this.props;
    const count = totalCount - (usedCount || 0);
    return (
      <Fragment>
        <Grid container>
          <Grid
            item
            xs={totalCount === 0 ? 8 : 10}
            sm={totalCount === 0 ? 10 : 11}
          >
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
          </Grid>
          {this.renderActions()}
        </Grid>
        <StarRatings
          rating={
            reviews.reduce((sum, { rating }) => sum + rating, 0) /
              reviews.length || 0
          }
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
            <Typography
              className={classes.success}
              variant="body1"
              gutterBottom
            >
              Prekės kiekis sandelyje: {count} vnt.
            </Typography>
            {token ? (
              <div align="center">
                <Button
                  className={classes.submit}
                  onClick={() => addToCart(id)}
                >
                  <ShoppingCartIcon spacing={8} />Į krepšelį
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
  };

  render() {
    const {
      product,
      classes,
      isProductsLoading,
      token,
      id,
      isReviewsLoading,
      reviews
    } = this.props;
    return (
      <div className={`${classes.root} container`}>
        {product ? (
          <Fragment>
            <h1 className="product-title">{product.title}</h1>
            <hr />
            <Grid container spacing={24}>
              <Grid item xs={12} lg={6}>
                <Paper className={classes.paper}>
                  <div className={classes.imageWrapper}>
                    <img
                      className={classes.image}
                      src={product.logo}
                      alt="Product cover"
                    />
                  </div>
                  <span className={classes.smallInfo}>{this.renderInfo()}</span>
                </Paper>
              </Grid>
              <Grid item className={classes.info} lg={6}>
                <Paper className={classes.paper}>{this.renderInfo()}</Paper>
              </Grid>
            </Grid>
            {this.renderForm()}
            <Typography variant="h5" gutterBottom>
              Atsiliepimai
            </Typography>
            <hr />
            {reviews.length > 0 ? (
              reviews
                .slice(0)
                .reverse()
                .map(review => (
                  <Review
                    key={review.id}
                    game_id={id}
                    user={jwt.decode(token)}
                    {...review}
                  />
                ))
            ) : !isReviewsLoading ? (
              <Typography variant="body1" gutterBottom>
                Atsiliepimų kol kas dar nėra
              </Typography>
            ) : (
              <Loading size={100} />
            )}
          </Fragment>
        ) : !isProductsLoading ? (
          <Typography variant="h6">Tokios prekės nėra</Typography>
        ) : (
          <Loading size={100} />
        )}
      </div>
    );
  }
}

Product.propTypes = {
  onLoad: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  isProductsLoading: PropTypes.bool.isRequired,
  isReviewsLoading: PropTypes.bool.isRequired,
  reviews: PropTypes.bool.isRequired
};

export default withStyles(styles)(Product);
