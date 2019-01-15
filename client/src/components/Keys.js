import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {styles} from '../styles/tables';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {config, url} from "../server";
import TablePagination from '@material-ui/core/TablePagination';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';

class Keys extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keys: [],
      rowsPerPage: 10,
      page: 0,
      paginatedKeys: []
    };

    this.getKeys();
  }

  getKeys = () => {
    const {token} = this.props;

    axios
      .get(`${url}/keys`, config(token))
      .then(({data}) => this.setState({keys: data}))
      .then(() => this.paginateKeys());
  };

  paginateKeys = () => {
    this.setState(({keys, page, rowsPerPage}) => ({
      paginatedKeys: keys.filter((key, index) => index >= page * rowsPerPage &&
        index < page * rowsPerPage + rowsPerPage)
    }))
  };

  handleChangePage = (event, page) => {
    this.setState({
      page
    }, this.paginateKeys);
  };

  handleChangeRowsPerPage = ({target: {value}}) => {
    this.setState({
      rowsPerPage: value
    }, this.paginateKeys);
  };

  handleRemove = id => {
    const {onRemove} = this.props;

    onRemove(id);
    this.getKeys();
  };

  render() {
    const {classes} = this.props;
    const {paginatedKeys, rowsPerPage, page, keys} = this.state;

    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">
          Raktai
        </h1>
        <hr/>
        {paginatedKeys.length > 0 ? (
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
                {paginatedKeys.map(({id, createdAt, steam_key, Product: {title}, isUsed}) => (
                  <TableRow className={classes.row} key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell>{steam_key}</TableCell>
                    <TableCell>Sukurtas: {new Date(createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      {isUsed ? (
                        <Button disabled className={classes.error}>
                          <span className={classes.message}>
                            <ErrorIcon className={classes.icon}/>
                            Panaudotas
                          </span>
                        </Button>
                      ) : (
                        <Button disabled className={classes.success}>
                          <span className={classes.message}>
                            <CheckCircleIcon className={classes.icon}/>
                            Nepanaudotas
                          </span>
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {!isUsed && (
                        <Grid container>
                          <Grid item xs={6}>
                            <Link to={`/key-upload/${id}`}>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </Link>
                          </Grid>
                            <Grid item xs={6}>
                              <IconButton>
                                <DeleteIcon onClick={() => this.handleRemove(id)}/>
                              </IconButton>
                            </Grid>
                        </Grid>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={keys.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Raktų kiekis puslapyje"
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        ) : (
          <Typography variant="h6">
            Raktų kol kas dar nėra
          </Typography>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Keys);