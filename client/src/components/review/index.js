import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import StarRatings from "react-star-ratings";
import styles from "./styles";

const Review = ({
  user,
  classes,
  User: { username },
  id,
  user_id,
  text,
  rating,
  createdAt,
  deleteReview,
  game_id
}) => (
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
            <IconButton onClick={() => deleteReview({ user_id, id, game_id })}>
              <DeleteIcon />
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

Review.propTypes = {
  user: PropTypes.object,
  classes: PropTypes.object.isRequired,
  User: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  deleteReview: PropTypes.func.isRequired,
  game_id: PropTypes.number.isRequired
};

Review.defaultValues = {
  user: null
};

export default withStyles(styles)(Review);
