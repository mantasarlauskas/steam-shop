import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import StarRatings from "react-star-ratings";
import Button from "@material-ui/core/Button";
import styles from "./styles";

class ReviewForm extends Component {
  constructor() {
    super();
    this.initialState = {
      rating: 0,
      review: "",
      emptyError: false,
      starError: false
    };
    this.state = this.initialState;
  }

  handleTextChange = ({ target: { value } }) => {
    this.setState({
      review: value
    });
  };

  handleRatingChange = rating => {
    this.setState({
      rating
    });
  };

  handleReviewSubmit = e => {
    const { review, rating } = this.state;
    const { id, onAdd, onSubmit } = this.props;
    e.preventDefault();
    if (review.length > 0 && rating > 0) {
      onAdd({
        text: review,
        game_id: id,
        rating
      });
      this.setState(this.initialState);
      onSubmit();
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

  render() {
    const { rating, emptyError, starError } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.reviewForm}>
        <form onSubmit={this.handleReviewSubmit}>
          <Typography variant="h6" gutterBottom>
            Atsiliepimo forma
          </Typography>
          <hr />
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
          <Button
            className={classes.reviewButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Patvirtinti
          </Button>
        </form>
      </Paper>
    );
  }
}

ReviewForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(ReviewForm);
