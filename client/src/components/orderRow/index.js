import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ZoomIcon from "@material-ui/icons/ZoomIn";
import { styles } from "../../styles/tables";

const OrderRow = ({ id, createdAt, classes }) => (
  <TableRow className={classes.row} key={id}>
    <TableCell>{id}</TableCell>
    <TableCell className="xs-hide">
      Sukurtas: {new Date(createdAt).toLocaleString()}
    </TableCell>
    <TableCell>
      <Link to={`/order/${id}`}>
        <Button className={classes.button} variant="outlined" color="primary">
          <ZoomIcon />
          Peržiūrėti užsakymą
        </Button>
      </Link>
    </TableCell>
  </TableRow>
);

OrderRow.propTypes = {
  id: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default withStyles(styles)(OrderRow);
