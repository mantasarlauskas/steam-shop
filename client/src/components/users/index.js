import React, { Component } from "react";
import axios from "axios";
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
import { config, url } from "../../server";

class Users extends Component {
  state = {
    paginatedUsers: [],
    users: []
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const { token } = this.props;
    const { data } = await axios.get(`${url}/users`, config(token));
    this.setState({ users: data });
  };

  banUser = async id => {
    const { token } = this.props;
    await axios({
      method: "delete",
      url: `${url}/users`,
      data: id,
      ...config(token)
    });
    this.getUsers();
  };

  unbanUser = async id => {
    const { token } = this.props;
    await axios({
      method: "put",
      url: `${url}/users`,
      data: id,
      ...config(token)
    });
    this.getUsers();
  };

  handleUsersChange = paginatedUsers => {
    this.setState({
      paginatedUsers
    });
  };

  renderUser = ({ username, email, role, isBanned, id }) => {
    const { classes } = this.props;
    return (
      <TableRow key={id}>
        <TableCell>{username}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{role === 1 ? "Administratorius" : "Klientas"}</TableCell>
        <TableCell>
          {role === 0 && isBanned === false && (
            <Button
              className={classes.error}
              onClick={() => this.banUser({ id })}
            >
              <span className={classes.message}>
                <ErrorIcon className={classes.icon} />
                Užblokuoti
              </span>
            </Button>
          )}
          {role === 0 && isBanned === true && (
            <Button
              className={classes.error}
              onClick={() => this.unbanUser({ id })}
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
    const { classes } = this.props;
    const { paginatedUsers, users } = this.state;
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
  token: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Users);
