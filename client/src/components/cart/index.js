import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Loading from "../loading";
import CartItem from "../cartItem";
import styles from "./styles";

class Cart extends Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    const { products, addOrder, classes, isLoading } = this.props;
    return (
      <div className={`${classes.paper} container`}>
        <h1 className="title">Mano krepšelis</h1>
        <hr />
        {products.length > 0 ? (
          <Paper className={`${classes.paper} ${classes.product}`}>
            <CartItem products={products} isChangeable={true} />
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  className={classes.totalPrice}
                  variant="h6"
                  gutterBottom
                >
                  Iš viso:{" "}
                  {products.reduce(
                    (sum, { cartCount, price }) =>
                      parseFloat((sum + cartCount * price).toFixed(2)),
                    0
                  )}
                  $
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={addOrder}
                  className="float-right"
                  variant="contained"
                  color="primary"
                >
                  Formuoti užsakymą
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ) : !isLoading ? (
          <Typography variant="h6">Prekių krepšelyje kol kas nėra</Typography>
        ) : (
          <Loading size={100} />
        )}
      </div>
    );
  }
}

Cart.propTypes = {
  products: PropTypes.array.isRequired,
  addOrder: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired
};

export default withStyles(styles)(Cart);
