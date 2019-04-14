import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/AddCircle";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";
import styles from "./styles";

const CartProduct = ({
  id,
  logo,
  title,
  price,
  cartCount,
  totalCount,
  usedCount,
  addToCart,
  removeFromCart,
  classes,
  isChangeable
}) => (
  <Paper key={id} className={classes.product}>
    <Grid container align="center" spacing={8}>
      <Grid item xs={12} md={3}>
        <img className="img-fluid" src={logo} alt="Game logo" />
      </Grid>
      <Grid item xs={12} md={3}>
        <h6>{title}</h6>
      </Grid>
      <Grid item xs={12} md={2}>
        ${price}
      </Grid>
      <Grid item xs={12} md={2}>
        {isChangeable && totalCount - usedCount > 0 && (
          <IconButton className={classes.icon} onClick={() => addToCart(id)}>
            <AddIcon />
          </IconButton>
        )}
        {cartCount}
        {isChangeable && (
          <IconButton
            className={classes.icon}
            onClick={() => removeFromCart(id)}
          >
            <RemoveIcon />
          </IconButton>
        )}
      </Grid>
      <Grid item xs={12} md={2}>
        <p>${(cartCount * price).toFixed(2)}</p>
      </Grid>
    </Grid>
  </Paper>
);

CartProduct.propTypes = {
  id: PropTypes.number.isRequired,
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  cartCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  usedCount: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isChangeable: PropTypes.bool.isRequired
};

export default withStyles(styles)(CartProduct);
