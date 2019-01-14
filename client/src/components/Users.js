import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {styles} from '../styles/orders';
import TablePagination from '@material-ui/core/TablePagination';
import ErrorIcon from '@material-ui/icons/Error';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      paginatedUsers: []
    };

    props.onUsersLoad();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.users !== this.props.users && this.props.users) {
      this.paginateUsers();
    }
  }

  paginateUsers = () => {
    const {users} = this.props;

    this.setState(({page, rowsPerPage}) => ({
      paginatedUsers: users.filter((user, index) => index >= page * rowsPerPage &&
        index < page * rowsPerPage + rowsPerPage)
    }))
  };

  handleChangePage = (event, page) => {
    this.setState({
      page
    }, this.paginateUsers);
  };

  handleChangeRowsPerPage = ({target: {value}}) => {
    this.setState({
      rowsPerPage: value
    }, this.paginateUsers);
  };

  render() {
    const {onUserUnban, onUserBan, classes, users} = this.props;
    const {paginatedUsers, page, rowsPerPage} = this.state;

    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">
          Vartotojai
        </h1>
        <hr/>
        <Paper>
          <Table>
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
              {paginatedUsers.map(({username, email, role, isBanned, id}, index) => (
                <TableRow key={id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{username}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{role === 1 ? 'Administratorius' : 'Klientas'}</TableCell>
                  <TableCell>
                    {
                      role === 0 && isBanned === false && (
                        <Button className={classes.error} onClick={() => onUserBan({id})}>
                          <span className={classes.message}>
                            <ErrorIcon className={classes.icon}/>
                            Užblokuoti
                          </span>
                        </Button>
                      )
                    }
                    {
                      role === 0 && isBanned === true && (
                        <Button className={classes.error} onClick={() => onUserUnban({id})}>
                        <span className={classes.message}>
                          <ErrorIcon className={classes.icon}/>
                          Atblokuoti
                        </span>
                        </Button>
                      )
                    }
                  </TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Vartotojų kiekis puslapyje"
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
};

export default withStyles(styles)(Users);