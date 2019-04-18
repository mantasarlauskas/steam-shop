import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import CartItems from "../../containers/cartItems";
import styles from "./styles";

class Cart extends Component {
  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
  }

  render() {
    const { addOrder, classes, productCount } = this.props;
    return (
      <div className={`${classes.paper} container`}>
        <h1 className="title">Mano krepšelis</h1>
        <hr />
        <Paper className={`${classes.paper} ${classes.product}`}>
          <CartItems isChangeable={true} />
          {productCount > 0 && (
            <Grid container>
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
          )}
        </Paper>
      </div>
    );
  }
}

Cart.propTypes = {
  addOrder: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
  productCount: PropTypes.number.isRequired
};

export default withStyles(styles)(Cart);
