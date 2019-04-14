import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ZoomIcon from "@material-ui/icons/ZoomIn";
import Typography from "@material-ui/core/Typography";
import Pagination from "../pagination";
import Loading from "../loading";
import { styles } from "../../styles/tables";

class Orders extends Component {
  state = {
    paginatedOrders: []
  };

  componentDidMount() {
    const { onLoad, orders } = this.props;
    orders.length === 0 && onLoad();
  }

  handleOrdersChange = paginatedOrders => {
    this.setState({
      paginatedOrders
    });
  };

  renderOrder = ({ id, createdAt }) => {
    const { classes } = this.props;
    return (
      <TableRow className={classes.row} key={id}>
        <TableCell>{id}</TableCell>
        <TableCell className="xs-hide">
          Sukurtas: {new Date(createdAt).toLocaleString()}
        </TableCell>
        <TableCell>
          <Link to={`/order/${id}`}>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
            >
              <ZoomIcon />
              Peržiūrėti užsakymą
            </Button>
          </Link>
        </TableCell>
      </TableRow>
    );
  };

  render() {
    const { orders, classes, isLoading } = this.props;
    const { paginatedOrders } = this.state;
    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">Užsakymai</h1>
        <hr />
        {orders.length > 0 ? (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell className="xs-hide">Sukūrimo data</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>{paginatedOrders.map(this.renderOrder)}</TableBody>
            </Table>
            <Pagination
              tablePagination={true}
              itemLength={orders.length}
              itemsPerPage={10}
              data={orders}
              returnData={this.handleOrdersChange}
            />
          </Paper>
        ) : !isLoading ? (
          <Typography variant="h6">Užsakymų kol kas dar nėra</Typography>
        ) : (
          <Loading size={100} />
        )}
      </div>
    );
  }
}

Orders.propTypes = {
  onLoad: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(Orders);
