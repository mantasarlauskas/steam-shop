import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {styles} from "../styles/cart";
import Typography from '@material-ui/core/Typography';

class NoMatch extends Component {
  render() {
    const {location, classes} = this.props;

    return (
      <div className={`${classes.paper} container`}>
        <Typography variant="h4">
          No match for <code>{location.pathname}</code>
        </Typography>
        <hr/>
      </div>
    );
  }
}

export default withStyles(styles)(NoMatch);