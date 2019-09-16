import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Range from '../../containers/range';
import Sort from '../../containers/sort';
import Pagination from '../pagination';
import Loading from '../loading';
import Game from '../game';
import withPagination from '../withPagination';
import {styles} from '../../styles/list';

const Games = ({
   classes,
   isLoading,
   games,
   paginatedItems,
   handleItemChange
}) => (
	<div className={classes.games + ' container'}>
		<h1 className="title">Games</h1>
		<hr/>
		{isLoading ? (
			<Loading size={100}/>
		) : (
			<Fragment>
				<Grid container className={classes.filters}>
					<Grid item xs={12} md={4}>
						<Range/>
					</Grid>
					<Grid item xs={12} md={8}>
						<Sort/>
					</Grid>
				</Grid>
				<Grid container spacing={24}>
					{paginatedItems.length > 0 ? (
						paginatedItems.map(data => <Game key={data.id} {...data} />)
					) : (
						<Typography className={classes.empty} variant="h6">
							No games were found
						</Typography>
					)}
					<Grid container>
						<Grid item xs={12}>
							<Pagination
								itemLength={games.length}
								itemsPerPage={9}
								data={games}
								returnData={handleItemChange}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Fragment>
		)}
	</div>
);

Games.propTypes = {
	games: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	paginatedItems: PropTypes.array.isRequired,
	handleItemChange: PropTypes.func.isRequired
};

export default withStyles(styles)(withPagination(Games));
