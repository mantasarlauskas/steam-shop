import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import Loading from "../loading";
import styles from "./styles";

class OrderKeys extends Component {
  componentDidMount() {
    const { id, onLoad } = this.props;
    onLoad(id);
  }

  render() {
    const { classes, orderKeys } = this.props;
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
    ) : (
      <Loading size={100} />
    );
  }
}

OrderKeys.propTypes = {
  classes: PropTypes.object.isRequired,
  orderKeys: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  onLoad: PropTypes.func.isRequired
};

export default withStyles(styles)(OrderKeys);
