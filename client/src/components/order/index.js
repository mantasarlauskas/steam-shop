import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import styles from "../cart/styles";
import CartItem from "../cartItem";
import OrderKeys from "../../containers/orderKeys";
import Loading from "../loading";

class Order extends Component {
  componentDidMount() {
    const { products, onLoad } = this.props;
    products.length === 0 && onLoad();
  }

  render() {
    const {
      products,
      classes,
      id,
      isProductsLoading,
      isOrdersLoading
    } = this.props;
    return (
      <div className={`${classes.paper} container`}>
        {products && products.length > 0 ? (
          <Fragment>
            <h1 className="title">Užsakymas nr.{id}</h1>
            <hr />
            <Paper className={`${classes.paper} ${classes.product}`}>
              <CartItem products={products} isChangeable={false} />
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
              </Grid>
            </Paper>
            <h1 className="title">Raktai</h1>
            <hr />
            <OrderKeys id={id} />
          </Fragment>
        ) : !isOrdersLoading && !isProductsLoading ? (
          <Typography variant="h4">Toks užsakymas neegzistuoja</Typography>
        ) : (
          <Loading size={100} />
        )}
      </div>
    );
  }
}

Order.propTypes = {
  onLoad: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  isProductsLoading: PropTypes.bool.isRequired,
  isOrdersLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(Order);
