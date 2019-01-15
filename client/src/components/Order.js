import React, {Component, Fragment} from 'react';
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
import {compose} from 'redux';
import withWidth from '@material-ui/core/withWidth';

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
      .then(({data}) => this.setState({keys: data}));
  };

  render() {
    const {products, classes, id, width} = this.props;
    const {keys} = this.state;

    const displayOrderForMediumScreens = (
      <Fragment>
        <Grid container className={classes.heading}>
          <Grid item md={3}>
            <Typography variant="body1" gutterBottom>
              Logotipas
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="body1" gutterBottom>
              Pavadinimas
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="body1" gutterBottom>
              Vieneto kaina
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="body1" gutterBottom>
              Kiekis
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="body1" gutterBottom>
              Bendra kaina
            </Typography>
          </Grid>
        </Grid>
        {products.map(({id, logo, title, price, cartCount}) => (
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
          </Paper>
        ))
        }
      </Fragment>
    );

    const displayOrderForSmallScreens = (
      <Fragment>
        {products.map(({id, logo, title, price, cartCount}) => (
          <Paper key={id} className={classes.product}>
            <Grid container align="center" spacing={8}>
              <Grid item xs={12}>
                <img className="img-fluid" src={logo} alt="Game logo"/>
              </Grid>
              <Grid item xs={12}>
                <h6>{title}</h6>
              </Grid>
              <Grid item xs={12}>
                Vieneto kaina: ${price}
              </Grid>
              <Grid item xs={12}>
                Kiekis: {cartCount}
              </Grid>
              <Grid item xs={12}>
                Bendra kaina: <p>${(cartCount * price).toFixed(2)}</p>
              </Grid>
            </Grid>
          </Paper>
        ))
        }
      </Fragment>
    );

    if (products.length > 0 && keys.length > 0) {
      return (
        <div className={`${classes.paper} container`}>
          <h1 className="title">Užsakymas nr.{id}</h1>
          <hr/>
          <Paper className={`${classes.paper} ${classes.product}`}>
            {width === 'xs' || width === 'sm' ? displayOrderForSmallScreens : displayOrderForMediumScreens}
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
                  <TableCell className='xs-hide'>ID</TableCell>
                  <TableCell>Žaidimas</TableCell>
                  <TableCell>Raktas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keys.map(({id, Key: {steam_key}, Product: {title}}) => (
                  <TableRow key={id}>
                    <TableCell className='xs-hide'>{id}</TableCell>
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

export default compose(withStyles(styles), withWidth())(Order);