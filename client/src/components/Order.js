import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core";
import {styles} from "../styles/cart";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {config, url} from "../server";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "./Keys";
import {Link} from "react-router-dom";

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keys: []
    };

    props.onLoad();
    this.getOrderKeys();
  }

  getOrderKeys = () => {
    const {token, id} = this.props;

    axios
      .get(`${url}/order-keys/${id}`, config(token))
      .then(({data}) => this.setState({keys:data}));
  };

  render() {
    const { products, classes, id } = this.props;
    const {keys} = this.state;

    if (products.length > 0 && keys.length > 0) {
      console.log(keys);
      return (
        <div className={`${classes.paper} container`}>
          <h1 className="title">Užsakymas nr.{id}</h1>
          <hr/>
          <Paper className={`${classes.paper} ${classes.product}`}>
            <Grid container className={classes.heading}>
              <Grid item xs={3}>
                <Typography variant="body1" gutterBottom>
                  Logotipas
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" gutterBottom>
                  Pavadinimas
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" gutterBottom>
                  Vieneto kaina
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" gutterBottom>
                  Kiekis
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" gutterBottom>
                  Bendra kaina
                </Typography>
              </Grid>
            </Grid>
            {products.map(({id, logo, title, price, cartCount}) =>
              <Paper key={id} className={classes.product}>
                <Grid container>
                  <Grid item xs={3}>
                    <img className="img-fluid" src={logo} alt="Game logo"/>
                  </Grid>
                  <Grid item xs={3}>
                    <h6>{title}</h6>
                  </Grid>
                  <Grid item xs={2}>
                    ${price}
                  </Grid>
                  <Grid item xs={2}>
                    {cartCount}
                  </Grid>
                  <Grid item xs={2}>
                    <p>${(cartCount * price).toFixed(2)}</p>
                  </Grid>
                </Grid>
              </Paper>)
            }
            <Grid container>
              <Grid item xs={12}>
                <Typography className={classes.totalPrice} variant="h6" gutterBottom>
                  Iš viso: {products.reduce((sum, {cartCount, price}) =>
                  parseFloat((sum + cartCount * price).toFixed(2)), 0)}$
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <h1 className="title">Raktai</h1>
          <hr/>
          <Paper className={classes.key}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Žaidimas</TableCell>
                  <TableCell>Raktas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keys.map(({id, Key:{steam_key}, Product: {title}}) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell>{steam_key}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      )
    } else {
      return (
        <div className={`${classes.paper} container`}>
          <Typography variant="h4">
            Toks užsakymas neegzistuoja
          </Typography>
          <hr/>
        </div>
      )
    }

  }
}

export default withStyles(styles)(Order);