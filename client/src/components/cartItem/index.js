import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CartProduct from "../../containers/cartProduct";
import styles from "./styles";

const CartItem = ({ classes, products, isChangeable }) => (
  <Fragment>
    <Grid container className={classes.heading}>
      <Grid item md={3}>
        <Typography variant="body1" gutterBottom>
          Logotipas
        </Typography>
      </Grid>
      <Grid item md={3}>
        <Typography variant="body1" gutterBottom>
          Pavadinimas
        </Typography>
      </Grid>
      <Grid item md={2}>
        <Typography variant="body1" gutterBottom>
          Vieneto kaina
        </Typography>
      </Grid>
      <Grid item md={2}>
        <Typography variant="body1" gutterBottom>
          Kiekis
        </Typography>
      </Grid>
      <Grid item md={2}>
        <Typography variant="body1" gutterBottom>
          Bendra kaina
        </Typography>
      </Grid>
    </Grid>
    {products.map(data => (
      <CartProduct key={data.id} isChangeable={isChangeable} {...data} />
    ))}
  </Fragment>
);

CartItem.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  isChangeable: PropTypes.bool.isRequired
};

export default withStyles(styles)(CartItem);
