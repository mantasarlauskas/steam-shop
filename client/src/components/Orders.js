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

class Orders extends Component {
  constructor(props) {
    super(props);

    props.onLoad();
  }

  render() {
    const {orders, classes} = this.props;

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
                {orders.map(({id, createdAt}) => (
                  <TableRow className={classes.row} key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>Sukurtas: {new Date(createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Link to={`/order/${id}`}>
                        <Button className={classes.button} variant="contained" color="primary">
                          <ZoomIcon />
                          Peržiūrėti užsakymą
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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