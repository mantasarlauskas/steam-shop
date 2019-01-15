import React, {Component} from 'react';
import Carousel from './Carousel';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import {styles} from '../styles/list';
import {Link} from 'react-router-dom';

class Main extends Component {

  render() {
    const {games, classes} = this.props;

    return (
      <div className={`${classes.main} container`}>
        <Carousel/>
        <div className={classes.main}>
          <h1 className="title">Populiariausi žaidimai</h1>
          <hr/>
          {games.length > 0 ? (<Grid container spacing={24}>
            {games.map(({id, logo, title, price}) => (
              <Grid key={id} item lg={4} sm={6} xs={12}>
                <Link to={`/product/${id}`}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={logo}
                        title={title}
                      />
                      <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {title}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Kaina: {price}$
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>) : (
            <Typography variant="h6">
              Žaidimų kol kas dar nėra
            </Typography>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);