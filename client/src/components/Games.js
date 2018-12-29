import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Pagination from '../components/Pagination';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  content: {
    height: 100
  },
  games: {
    padding: '50px 10px'
  }
};

class Games extends Component {
  render() {
    const { products, classes, productLength, pagination: { itemsPerPage }, onPageChange  } = this.props;

    const pagination = (
      <Grid container>
        <Grid item xs={12}>
          <Pagination
            pageCount={Math.ceil(productLength/itemsPerPage)}
            changePage={({ selected }) => onPageChange(selected)}
          />
        </Grid>
      </Grid>
    );

    return (
      <div className={classes.games + ' container'}>
        <h1 className="title">Žaidimai</h1>
        <hr />
        <Grid container spacing={24}>
          <Grid item xs={4}>

          </Grid>
          <Grid item xs={8} container spacing={24}>
            {products.map(({id, logo, title}) => {
              return (
                <Grid key={id} item xs={4}>
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
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              )
            })}
            {pagination}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Games);