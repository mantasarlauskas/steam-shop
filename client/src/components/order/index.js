import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styles from "../cart/styles";
import OrderItems from "../../containers/orderItems";
import OrderKeys from "../../containers/orderKeys";
import Loading from "../loading";

class Order extends Component {
  componentDidMount() {
    const { orders, getProducts, getOrders } = this.props;
    getProducts() && orders.length === 0 && getOrders();
  }

  render() {
    const { classes, id, productCount, isLoading } = this.props;
    return (
      <div className={`${classes.paper} container`}>
        <h1 className="title">Užsakymas nr.{id}</h1>
        <hr />
        {isLoading ? (
          <Loading size={100} />
        ) : productCount > 0 ? (
          <Fragment>
            <Paper className={`${classes.paper} ${classes.product}`}>
              <Grid container>
                <Grid item xs={12}>
                  <OrderItems id={id} />
                </Grid>
              </Grid>
            </Paper>
            <h1 className="title">Raktai</h1>
            <hr />
            <OrderKeys id={id} />
          </Fragment>
        ) : (
          <Typography variant="h6" gutterBottom>
            Tokio užsakymo nėra
          </Typography>
        )}
      </div>
    );
  }
}

Order.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  productCount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(Order);
