import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { styles } from "../../styles/list";

const Game = ({ id, logo, title, price, classes }) => (
  <Grid key={id} item lg={4} sm={6} xs={12}>
    <Link to={`/product/${id}`}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image={logo} title={title} />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Kaina: {price}$
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  </Grid>
);

Game.propTypes = {
  id: PropTypes.number.isRequired,
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Game);
