import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Range } from "rc-slider";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Pagination from "../pagination";
import Loading from "../loading";
import Sort from "../sort";
import PaginatedGames from "../paginatedGames";
import { styles } from "../../styles/list";
import "rc-slider/assets/index.css";

class Games extends Component {
  state = {
    selectedGames: [],
    paginatedGames: [],
    defaultMinPrice: 0,
    defaultMaxPrice: 0,
    minPrice: 0,
    maxPrice: 0,
    gamesLength: 0,
    sort: "NAME_ASC"
  };

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  componentDidUpdate({ games: prevGames }) {
    const { games } = this.props;
    prevGames !== games && games.length > 0 && this.initState();
  }

  initState = () => {
    const { games } = this.props;
    const minPrice = Math.floor(
      games.reduce(
        (min, { price }) => (min > price ? price : min),
        games[0].price
      )
    );
    const maxPrice = Math.ceil(
      games.reduce((max, { price }) => (max < price ? price : max), 0)
    );
    this.setState(
      {
        defaultMinPrice: minPrice,
        defaultMaxPrice: maxPrice,
        gamesLength: games.length,
        minPrice,
        maxPrice
      },
      this.selectGames
    );
  };

  handlePriceChange = prices => {
    const { games } = this.props;
    this.setState(
      {
        minPrice: prices[0],
        maxPrice: prices[1],
        gamesLength: games.filter(
          ({ price }) => price >= prices[0] && price <= prices[1]
        ).length
      },
      this.selectGames
    );
  };

  handleSortChange = ({ target: { value } }) => {
    this.setState(
      {
        sort: value
      },
      this.selectGames
    );
  };

  handleGamesChange = paginatedGames => {
    this.setState({
      paginatedGames
    });
  };

  selectGamesByPrice = () => {
    const { games } = this.props;
    const { minPrice, maxPrice } = this.state;
    return games.filter(({ price }) => price >= minPrice && price <= maxPrice);
  };

  selectGamesBySort = () => {
    const { sort } = this.state;
    const games = this.selectGamesByPrice();
    switch (sort) {
      case "NAME_DESC":
        return games.sort((a, b) =>
          a.title.toUpperCase() < b.title.toUpperCase()
            ? 1
            : b.title.toUpperCase() < a.title.toUpperCase()
            ? -1
            : 0
        );
      case "PRICE_ASC":
        return games.sort((a, b) => a.price - b.price);
      case "PRICE_DESC":
        return games.sort((a, b) => b.price - a.price);
      default:
        return games.sort((a, b) =>
          a.title.toUpperCase() > b.title.toUpperCase()
            ? 1
            : b.title.toUpperCase() > a.title.toUpperCase()
            ? -1
            : 0
        );
    }
  };

  selectGames = () => {
    this.setState(
      {
        selectedGames: this.selectGamesBySort()
      },
      () => this.pagination && this.pagination.resetPage()
    );
  };

  render() {
    const { classes, isLoading } = this.props;
    const {
      paginatedGames,
      defaultMinPrice,
      defaultMaxPrice,
      minPrice,
      maxPrice,
      gamesLength,
      selectedGames
    } = this.state;
    return (
      <div className={classes.games + " container"}>
        <h1 className="title">Žaidimai</h1>
        <hr />
        {selectedGames.length > 0 ? (
          <Fragment>
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
              <Sort handleSortChange={this.handleSortChange} />
            </Grid>
            <Grid container spacing={24}>
              {paginatedGames.length > 0 ? (
                paginatedGames.map(data => (
                  <PaginatedGames key={data.id} {...data} />
                ))
              ) : (
                <Typography className={classes.empty} variant="h6">
                  Prekių nerasta
                </Typography>
              )}
              <Grid container>
                <Grid item xs={12}>
                  <Pagination
                    ref={x => (this.pagination = x)}
                    itemLength={gamesLength}
                    itemsPerPage={9}
                    data={selectedGames}
                    returnData={this.handleGamesChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        ) : !isLoading ? (
          <Typography variant="h6">Žaidimų kol kas dar nėra</Typography>
        ) : (
          <Loading size={100} />
        )}
      </div>
    );
  }
}

Games.propTypes = {
  games: PropTypes.array.isRequired,
  onLoad: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(Games);
