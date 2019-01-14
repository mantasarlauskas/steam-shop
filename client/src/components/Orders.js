import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {styles} from '../styles/orders';
import ZoomIcon from '@material-ui/icons/ZoomIn';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      paginatedOrders: []
    };

    props.onLoad();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.orders !== this.props.orders && this.props.orders) {
      this.paginateOrders();
    }
  }

  paginateOrders = () => {
    const {orders} = this.props;

    this.setState(({page, rowsPerPage}) => ({
      paginatedOrders: orders.filter((order, index) => index >= page * rowsPerPage &&
        index < page * rowsPerPage + rowsPerPage)
    }))
  };

  handleChangePage = (event, page) => {
    this.setState({
      page
    }, this.paginateOrders);
  };

  handleChangeRowsPerPage = ({target: {value}}) => {
    this.setState({
      rowsPerPage: value
    }, this.paginateOrders);
  };

  render() {
    const {orders, classes} = this.props;
    const {rowsPerPage, page, paginatedOrders} = this.state;

    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">
          Užsakymai
        </h1>
        <hr/>
        {orders.length > 0 ? (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Sukūrimo data</TableCell>
                  <TableCell/>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrders.map(({id, createdAt}) => (
                  <TableRow className={classes.row} key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>Sukurtas: {new Date(createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Link to={`/order/${id}`}>
                        <Button className={classes.button} variant="outlined" color="primary">
                          <ZoomIcon />
                          Peržiūrėti užsakymą
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Užsakymų kiekis puslapyje"
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        ) : (
          <Typography variant="h6">
            Užsakymų kol kas dar nėra
          </Typography>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Orders);