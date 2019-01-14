import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core";
import {styles} from "../styles/cart";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';

class Cart extends Component {
  render() {
    const {products, addToCart, removeFromCart, addOrder, classes} = this.props;

    return (
      <div className={`${classes.paper} container`}>
        <h1 className="title">Mano krepšelis</h1>
        <hr/>
        {products.length > 0 ?
          (
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
              {products.map(({id, logo, title, price, cartCount, totalCount, usedCount}) =>
                {
                  const count = totalCount - parseInt(usedCount);

                  return (
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
                          {count > 0 && (
                            <IconButton className={classes.icon}>
                              <AddIcon onClick={() => addToCart(id)}/>
                            </IconButton>
                          )}
                          {cartCount}
                          <IconButton className={classes.icon}>
                            <RemoveIcon onClick={() => removeFromCart(id)}/>
                          </IconButton>
                        </Grid>
                        <Grid item xs={2}>
                          <p>${(cartCount * price).toFixed(2)}</p>
                        </Grid>
                      </Grid>
                    </Paper>
                  )
                })
              }
              <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.totalPrice} variant="h6" gutterBottom>
                    Iš viso: {products.reduce((sum, {cartCount, price}) =>
                    parseFloat((sum + cartCount * price).toFixed(2)), 0)}$
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={addOrder} className="float-right" variant="contained" color="primary">
                    Formuoti užsakymą
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ) :
          (
            <Typography variant="h6">
              Prekių krepšelyje kol kas nėra
            </Typography>
          )
        }
      </div>
    )
  }
}

export default withStyles(styles)(Cart);