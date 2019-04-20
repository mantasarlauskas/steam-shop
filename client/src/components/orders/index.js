import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Pagination from "../pagination";
import Loading from "../loading";
import OrderRow from "../orderRow";
import withPagination from "../withPagination";
import { styles } from "../../styles/tables";

const Orders = ({
  items,
  classes,
  isLoading,
  handleItemChange,
  paginatedItems
}) => (
  <div className={`${classes.root} container`}>
    <h1 className="title">Užsakymai</h1>
    <hr />
    {isLoading ? (
      <Loading size={100} />
    ) : items.length > 0 ? (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell className="xs-hide">Sukūrimo data</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((order, index) => (
              <OrderRow key={index} {...order} />
            ))}
          </TableBody>
        </Table>
        <Pagination
          tablePagination={true}
          itemLength={items.length}
          itemsPerPage={10}
          data={items}
          returnData={handleItemChange}
        />
      </Paper>
    ) : (
      <Typography variant="h6">Užsakymų kol kas dar nėra</Typography>
    )}
  </div>
);

Orders.propTypes = {
  handleItemChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  paginatedItems: PropTypes.array.isRequired
};

export default withStyles(styles)(withPagination(Orders, true));
