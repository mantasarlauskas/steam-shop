import React, { Component } from "react";
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

class OrderKeys extends Component {
  componentDidMount() {
    const { getOrderKeys, id } = this.props;
    getOrderKeys(id);
  }

  render() {
    const { classes, keys, isLoading } = this.props;
    return isLoading ? (
      <Loading size={100} />
    ) : keys.length > 0 ? (
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
            {keys.map(({ id, Key: { steam_key }, Product: { title } }) => (
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
      <Typography variant="h6">Raktų nėra</Typography>
    );
  }
}

OrderKeys.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  getOrderKeys: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(OrderKeys);
