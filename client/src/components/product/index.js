import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Loading from '../loading';
import styles from './styles';
import Reviews from '../../containers/reviews';
import ReviewForm from '../../containers/reviewForm';

class Product extends Component {
	state = {
		isFormOpen: false
	};

	componentDidMount() {
		const {onProductLoad, id} = this.props;
		onProductLoad(id);
	}

	toggleReviewForm = () => {
		this.setState(prevState => ({
			isFormOpen: !prevState.isFormOpen
		}));
	};

	handleRemove = async id => {
		const {history, removeProduct} = this.props;
		await removeProduct(id);
		history.push('/games');
	};

	renderForm = () => {
		const {
			token,
			classes,
			product: {id}
		} = this.props;
		const {isFormOpen} = this.state;
		return (
			token && (
				<Fragment>
					<Button
						className={classes.reviewButton}
						type="submit"
						variant="contained"
						color="primary"
						onClick={this.toggleReviewForm}
					>
						{isFormOpen ? 'Close form' : 'Write review'}
					</Button>
					{isFormOpen && (
						<ReviewForm id={id} closeForm={this.toggleReviewForm}/>
					)}
				</Fragment>
			)
		);
	};

	renderActions = () => {
		const {
			token,
			product: {id, totalCount}
		} = this.props;
		return (
			token &&
			jwt.decode(token).role === 1 && (
				<Grid item xs={totalCount === 0 ? 4 : 2} sm={totalCount === 0 ? 2 : 1}>
					<Grid container>
						<Grid item xs={totalCount === 0 ? 6 : 12}>
							<Link to={`/product-upload/${id}`}>
								<IconButton>
									<EditIcon/>
								</IconButton>
							</Link>
						</Grid>
						<Grid item xs={6}>
							{totalCount === 0 && (
								<IconButton onClick={() => this.handleRemove(id)}>
									<DeleteIcon/>
								</IconButton>
							)}
						</Grid>
					</Grid>
				</Grid>
			)
		);
	};

	renderInfo = () => {
		const {
			product: {title, id, totalCount, usedCount, description, price},
			classes,
			token,
			addProductToCart,
			rating
		} = this.props;
		const count = totalCount - (usedCount || 0);
		return (
			<Fragment>
				<Grid container>
					<Grid
						item
						xs={totalCount === 0 ? 8 : 10}
						sm={totalCount === 0 ? 10 : 11}
					>
						<Typography variant="h5" gutterBottom>
							{title}
						</Typography>
					</Grid>
					{this.renderActions()}
				</Grid>
				<StarRatings
					rating={rating}
					starDimension="25px"
					starSpacing="2px"
					starRatedColor="yellow"
				/>
				<Typography className={classes.description} variant="body1">
					{description}
				</Typography>
				<Typography className={classes.price} variant="h4" gutterBottom>
					{price}$
				</Typography>
				{count > 0 ? (
					<Fragment>
						<Typography
							className={classes.success}
							variant="body1"
							gutterBottom
						>
							Number of keys available: {count}.
						</Typography>
						{token ? (
							<div align="center">
								<Button
									className={classes.submit}
									onClick={() => addProductToCart(id)}
								>
									<ShoppingCartIcon spacing={8}/>Add to cart
								</Button>
							</div>
						) : (
							<div className={classes.error}>
								You need to login first
							</div>
						)}
					</Fragment>
				) : (
					<Typography className={classes.error} variant="body1" gutterBottom>
						This game does not have any unused keys
					</Typography>
				)}
			</Fragment>
		);
	};

	render() {
		const {product, classes, isLoading, id} = this.props;
		return (
			<div className={`${classes.root} container`}>
				{isLoading ? (
					<Loading size={100}/>
				) : product ? (
					<Fragment>
						<h1 className="product-title">{product.title}</h1>
						<hr/>
						<Grid container spacing={24}>
							<Grid item xs={12} lg={6}>
								<Paper className={classes.paper}>
									<div className={classes.imageWrapper}>
										<img
											className={classes.image}
											src={product.logo}
											alt="Product cover"
										/>
									</div>
									<span className={classes.smallInfo}>{this.renderInfo()}</span>
								</Paper>
							</Grid>
							<Grid item className={classes.info} lg={6}>
								<Paper className={classes.paper}>{this.renderInfo()}</Paper>
							</Grid>
						</Grid>
						{this.renderForm()}
						<Typography variant="h5" gutterBottom>
							Reviews
						</Typography>
						<hr/>
						<Reviews id={id}/>
					</Fragment>
				) : (
					<Typography variant="h6">Game does not exist</Typography>
				)}
			</div>
		);
	}
}

Product.propTypes = {
	onProductLoad: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	removeProduct: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	token: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	product: PropTypes.object,
	addProductToCart: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	rating: PropTypes.number.isRequired
};

Product.defaultValues = {
	product: null
};

export default withStyles(styles)(Product);
