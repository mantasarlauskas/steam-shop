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
    paginatedGames: []
  };

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  handlePriceChange = prices => {
    const { onMinPriceChange, onMaxPriceChange } = this.props;
    onMinPriceChange(prices[0]);
    onMaxPriceChange(prices[1]);
    this.pagination.resetPage();
  };

  handleSortChange = ({ target: { value } }) => {
    const { onSortChange } = this.props;
    onSortChange(value);
    this.pagination.resetPage();
  };

  handleGamesChange = paginatedGames => {
    this.setState({
      paginatedGames
    });
  };

  render() {
    const {
      classes,
      gamesLength,
      defaultMinPrice,
      defaultMaxPrice,
      minPrice,
      maxPrice,
      isLoading,
      games
    } = this.props;
    const { paginatedGames } = this.state;
    return (
      <div className={classes.games + " container"}>
        <h1 className="title">Žaidimai</h1>
        <hr />
        {games.length > 0 ? (
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
                    data={games}
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
  onMinPriceChange: PropTypes.func.isRequired,
  onMaxPriceChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  gamesLength: PropTypes.number.isRequired,
  defaultMinPrice: PropTypes.number.isRequired,
  defaultMaxPrice: PropTypes.number.isRequired,
  minPrice: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(Games);
