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
import Key from "../../containers/key";
import Loading from "../loading";
import withPagination from "../withPagination";
import { styles } from "../../styles/tables";

const Keys = ({
  classes,
  keys,
  isLoading,
  handleItemChange,
  paginatedItems
}) => (
  <div className={`${classes.root} container`}>
    <h1 className="title">Raktai</h1>
    <hr />
    {isLoading ? (
      <Loading size={100} />
    ) : keys.length > 0 ? (
      <Paper className={classes.tableWrapper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Žaidimas</TableCell>
              <TableCell>Raktas</TableCell>
              <TableCell>Sukūrimo data</TableCell>
              <TableCell>Būklė</TableCell>
              <TableCell>Veiksmai</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map(key => (
              <Key key={key.id} {...key} />
            ))}
          </TableBody>
        </Table>
        <Pagination
          tablePagination={true}
          itemLength={keys.length}
          itemsPerPage={10}
          data={keys}
          returnData={handleItemChange}
        />
      </Paper>
    ) : (
      <Typography variant="h6">Raktų kol kas dar nėra</Typography>
    )}
  </div>
);

Keys.propTypes = {
  classes: PropTypes.object.isRequired,
  handleItemChange: PropTypes.func.isRequired,
  paginatedItems: PropTypes.array.isRequired,
  keys: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(withPagination(Keys));
