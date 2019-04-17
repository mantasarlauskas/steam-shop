import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Loading from "../loading";
import styles from "./styles";
import { url, config } from "../../server";

class OrderKeys extends Component {
  state = {
    orderKeys: [],
    isLoading: false
  };

  componentDidMount() {
    this.getOrderKeys();
  }

  getOrderKeys = async () => {
    const { token, id } = this.props;
    this.setState({ isLoading: true });
    const { data } = await axios.get(`${url}/order-keys/${id}`, config(token));
    this.setState({
      orderKeys: data,
      isLoading: false
    });
  };

  render() {
    const { classes } = this.props;
    const { orderKeys, isLoading } = this.state;
    return orderKeys.length > 0 ? (
      <Paper className={classes.key}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="xs-hide">ID</TableCell>
              <TableCell>Žaidimas</TableCell>
              <TableCell>Raktas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderKeys.map(({ id, Key: { steam_key }, Product: { title } }) => (
              <TableRow key={id}>
                <TableCell className="xs-hide">{id}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{steam_key}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    ) : !isLoading ? (
      <Typography variant="h6">Raktų nėra</Typography>
    ) : (
      <Loading size={100} />
    );
  }
}

OrderKeys.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default withStyles(styles)(OrderKeys);
