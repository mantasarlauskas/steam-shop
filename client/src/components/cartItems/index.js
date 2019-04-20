import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CartProduct from "../../containers/cartProduct";
import Loading from "../loading";
import styles from "./styles";

const CartItems = ({
  classes,
  products,
  isChangeable,
  isLoading,
  totalPrice
}) =>
  isLoading ? (
    <Loading size={100} />
  ) : products.length > 0 ? (
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
      {console.log(products)}
      {products.map(data => (
        <CartProduct key={data.id} isChangeable={isChangeable} {...data} />
      ))}
      <Typography className={classes.totalPrice} variant="h6" gutterBottom>
        {`Iš viso: ${totalPrice}$`}
      </Typography>
    </Fragment>
  ) : (
    <Typography align={"center"} variant="h6">
      Prekių nėra
    </Typography>
  );

CartItems.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isChangeable: PropTypes.bool,
  totalPrice: PropTypes.number.isRequired
};

CartItems.defaultValues = {
  isChangeable: false
};

export default withStyles(styles)(CartItems);
