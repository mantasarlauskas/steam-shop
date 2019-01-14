import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import {styles} from '../styles/orders';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import KeyIcon from '@material-ui/icons/VpnKey';
import {Link} from 'react-router-dom';

class Profile extends Component {
  render() {
    const {classes, user} = this.props;
    const {createdAt, updatedAt, username, email, role} = user;

    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">
          Mano profilis
        </h1>
        <hr />
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12} className={classes.text}>
                    <b>Vardas:</b> {username}
                  </Grid>
                  <Grid item xs={12} className={classes.text}>
                    <b>El. paštas:</b> {email}
                  </Grid>
                  <Grid item xs={12} className={classes.text}>
                    <b>Rolė:</b> {role === 1 ? 'Administratorius' : 'Klientas'}
                  </Grid>
                  <Grid item xs={12} className={classes.text}>
                    <b>Profilio sukūrimo data:</b> {new Date(createdAt).toLocaleString()}
                  </Grid>
                  <Grid item xs={12} className={classes.text}>
                    <b>Paskutinė profilio redagavimo data:</b> {new Date(updatedAt).toLocaleString()}
                  </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
              <Link to="/change-password">
                <Button variant="contained" color="primary" className={classes.button}>
                  <KeyIcon className={classes.icon} />
                  Keisti slaptažodį
                </Button>
              </Link>
              <Link to="/edit-profile">
                <Button variant="contained" color="primary" className={`${classes.button} ${classes.editButton}`}>
                  <EditIcon className={classes.icon} />
                  Redaguoti
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);