import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ErrorIcon from "@material-ui/icons/Error";
import Pagination from "../pagination";
import Loading from "../loading";
import { styles } from "../../styles/tables";

class Users extends Component {
  state = {
    paginatedUsers: []
  };

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  handleUsersChange = paginatedUsers => {
    this.setState({
      paginatedUsers
    });
  };

  renderUser = ({ username, email, role, isBanned, id }, index) => {
    const { classes, onUserUnban, onUserBan } = this.props;
    return (
      <TableRow key={id}>
        <TableCell>{username}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{role === 1 ? "Administratorius" : "Klientas"}</TableCell>
        <TableCell>
          {role === 0 && isBanned === false && (
            <Button className={classes.error} onClick={() => onUserBan({ id })}>
              <span className={classes.message}>
                <ErrorIcon className={classes.icon} />
                Užblokuoti
              </span>
            </Button>
          )}
          {role === 0 && isBanned === true && (
            <Button
              className={classes.error}
              onClick={() => onUserUnban({ id })}
            >
              <span className={classes.message}>
                <ErrorIcon className={classes.icon} />
                Atblokuoti
              </span>
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  };

  render() {
    const { classes, users } = this.props;
    const { paginatedUsers } = this.state;
    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">Vartotojai</h1>
        <hr />
        {users.length > 0 ? (
          <Paper className={classes.tableWrapper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Slapyvardis</TableCell>
                  <TableCell>El. paštas</TableCell>
                  <TableCell>Rolė</TableCell>
                  <TableCell>Veiksmai</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{paginatedUsers.map(this.renderUser)}</TableBody>
            </Table>
            <Pagination
              tablePagination={true}
              itemLength={users.length}
              itemsPerPage={10}
              data={users}
              returnData={this.handleUsersChange}
            />
          </Paper>
        ) : (
          <Loading size={100} />
        )}
      </div>
    );
  }
}

Users.propTypes = {
  onLoad: PropTypes.func.isRequired,
  onUserUnban: PropTypes.func.isRequired,
  onUserBan: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

export default withStyles(styles)(Users);
