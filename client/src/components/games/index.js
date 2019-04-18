import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Range from "../../containers/range";
import Sort from "../../containers/sort";
import Pagination from "../pagination";
import Loading from "../loading";
import PaginatedGames from "../paginatedGames";
import { styles } from "../../styles/list";

class Games extends Component {
  state = {
    paginatedGames: []
  };

  componentDidMount() {
    const { onProductsLoad } = this.props;
    onProductsLoad();
  }

  componentDidUpdate({ games: prevGames }) {
    const { games } = this.props;
    prevGames !== games &&
      games.length > 0 &&
      this.pagination &&
      this.pagination.resetPage();
  }

  handleGamesChange = paginatedGames => {
    this.setState({
      paginatedGames
    });
  };

  render() {
    const { classes, isLoading, games } = this.props;
    const { paginatedGames } = this.state;
    return (
      <div className={classes.games + " container"}>
        <h1 className="title">Žaidimai</h1>
        <hr />
        {isLoading ? (
          <Loading size={100} />
        ) : (
          <Fragment>
            <Grid container className={classes.filters}>
              <Grid item xs={12} md={4}>
                <Range />
              </Grid>
              <Grid item xs={12} md={8}>
                <Sort />
              </Grid>
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
                    itemLength={games.length}
                    itemsPerPage={9}
                    data={games}
                    returnData={this.handleGamesChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        )}
      </div>
    );
  }
}

Games.propTypes = {
  games: PropTypes.array.isRequired,
  onProductsLoad: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(Games);
