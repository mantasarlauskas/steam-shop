import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Pagination from '../components/Pagination';
import {styles} from '../styles/list';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      itemsPerPage: 9,
      paginatedGames: []
    };

    props.onLoad();
  }

  componentDidMount() {
    const {games} = this.props;

    if (games.length > 0) {
      this.paginateGames();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {games} = this.props;

    if (prevProps.games !== games && games) {
      this.paginateGames();
    }
  }

  paginateGames = () => {
    const {games} = this.props;

    this.setState(({page, itemsPerPage}) => ({
      paginatedGames: games.filter((game, index) => index >= page * itemsPerPage &&
        index < page * itemsPerPage + itemsPerPage)
    }))
  };

  handlePriceChange = prices => {
    const {onMinPriceChange, onMaxPriceChange} = this.props;

    onMinPriceChange(prices[0]);
    onMaxPriceChange(prices[1]);
  };

  handleSortChange = ({target: {value}}) => {
    const {onSortChange} = this.props;

    onSortChange(value);
  };

  handlePageChange = ({selected}) => {
    this.setState({
      page: selected
    }, this.paginateGames)
  };

  render() {
    const {
      classes,
      gamesLength,
      defaultMinPrice,
      defaultMaxPrice,
      minPrice,
      maxPrice
    } = this.props;

    const {itemsPerPage, paginatedGames} = this.state;

    const pagination = (
      <Grid container>
        <Grid item xs={12}>
          <Pagination
            pageCount={Math.ceil(gamesLength / itemsPerPage)}
            changePage={this.handlePageChange}
          />
        </Grid>
      </Grid>
    );

    if (minPrice !== null && maxPrice !== null) {
      return (
        <div className={classes.games + ' container'}>
          <h1 className="title">
            Žaidimai
          </h1>
          <hr/>
          <Grid container className={classes.filters}>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                Kaina:
              </Typography>
              <Grid container spacing={16}>
                <Grid item xs={2} align={"center"}>
                  {minPrice}$
                </Grid>
                <Grid item xs={8}>
                  <Range
                    className={classes.range}
                    defaultValue={[defaultMinPrice, defaultMaxPrice]}
                    allowCross={false}
                    value={[minPrice, maxPrice]}
                    min={defaultMinPrice}
                    max={defaultMaxPrice}
                    onChange={this.handlePriceChange}
                  />
                </Grid>
                <Grid item xs={2} align={"center"}>
                  {maxPrice}$
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
              <div className={classes.filter}>
                <Typography variant="body2" gutterBottom>
                  Rikiavimas:
                </Typography>
                <select onChange={this.handleSortChange}>
                  <option value="NAME_ASC">Pagal pavadinimą didėjimo tvarka</option>
                  <option value="NAME_DESC">Pagal pavadinimą mažėjimo tvarka</option>
                  <option value="PRICE_ASC">Pagal kainą didėjimo tvarka</option>
                  <option value="PRICE_DESC">Pagal kainą mažėjimo tvarka</option>
                </select>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={24}>
            {paginatedGames.length > 0 ? (
              paginatedGames.map(({id, logo, title, price}) => {
                return (
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
                )
              })
            ) : (
              <Typography className={classes.empty} variant="h6">
                Prekių nerasta
              </Typography>
            )}
            {paginatedGames.length > 0 && pagination}
          </Grid>
        </div>
      )
    } else {
      return <div>Laukiama...</div>
    }

  }
}

export default withStyles(styles)(Games);