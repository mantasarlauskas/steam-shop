import React, { Component } from 'react';
import Pagination from './Pagination';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {styles} from '../styles/orders';

class Users extends Component {
  constructor(props) {
    super(props);
    props.onUsersLoad();
  }

  showPagination() {
    const { users, pagination: { itemsPerPage }, onPageChange } = this.props;
    return (
      <Pagination 
        pageCount={Math.ceil(users.length/itemsPerPage)} 
        changePage={({ selected }) => onPageChange(selected)}
      />
    );
  }

  render() {
    const { filteredUsers, pagination: { currentPage }, onUserUnban, onUserBan, classes} = this.props;

    return (
      <Paper>
        <Table className="users__table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Slapyvardis</TableCell>
              <TableCell>El. paštas</TableCell>
              <TableCell>Rolė</TableCell>
              <TableCell>Veiksmai</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { filteredUsers.map(({ username, email, role, isBanned, id }, index) => (
            <TableRow key={username}>
              <TableCell scope="row">{ currentPage * 10 + index + 1 }</TableCell>
              <TableCell>{ username }</TableCell>
              <TableCell>{ email }</TableCell>
              <TableCell>{ role }</TableCell>
              <TableCell>
                {
                  role === 0 && isBanned === false &&
                    <button className="btn btn-warning" onClick={() => onUserBan({id})}>
                      Blokuoti
                    </button>
                }
                {
                  role === 0 && isBanned === true &&
                    <button className="btn btn-warning" onClick={() => onUserUnban({ id })}>
                      Atblokuoti
                    </button>
                }
              </TableCell>
            </TableRow>
          ))
          }
          </TableBody>
        </Table>
        { this.showPagination() }
      </Paper>
    );
  }
};

export default withStyles(styles)(Users);