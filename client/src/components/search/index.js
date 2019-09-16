import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Loading from '../loading';
import styles from './styles';

class Search extends Component {
	state = {
		show: false,
		searchResults: []
	};

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	searchForProducts = ({target: {value}}) => {
		const {games} = this.props;
		if (value !== '') {
			this.setState({
				searchResults: games.filter(product => product.title.toUpperCase().includes(value.toUpperCase()))
			});
		} else {
			this.setState({
				searchResults: []
			});
		}
	};

	showSearch = () => {
		this.setState({
			show: true
		});
	};

	handleClickOutside = ({target}) => {
		this.searchRef &&
		!this.searchRef.contains(target) &&
		this.setState({
			show: false
		});
	};

	handleCardClick = (e, id) => {
		e.stopPropagation();
		this.setState({
			show: false
		});
	};

	renderCard = ({id, logo, title}) => {
		const {classes} = this.props;
		return (
			<Link
				key={id}
				to={`/product/${id}`}
				onClick={e => this.handleCardClick(e, id)}
			>
				<Card className={classes.card}>
					<CardActionArea>
						<CardMedia className={classes.media} image={logo} title={title}/>
						<CardContent>
							<Typography gutterBottom component="h4">
								{title}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Link>
		);
	};

	renderEmptyCard = (Child, childProps) => {
		const {classes} = this.props;
		return (
			<Card className={classes.card}>
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom component="h4">
							{typeof Child === 'string' ? Child : <Child {...childProps} />}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		);
	};

	render() {
		const {games, classes, isLoading} = this.props;
		const {show, searchResults} = this.state;
		return (
			<div
				className={classes.search}
				ref={x => (this.searchRef = x)}
				onClick={this.showSearch}
			>
				<div className={classes.searchIcon}>
					<SearchIcon/>
				</div>
				<InputBase
					placeholder="Search…"
					onChange={this.searchForProducts}
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput
					}}
				/>
				{show && (
					<div className={classes.searchResults}>
						{games.length > 0
							? searchResults.length > 0
								? searchResults.map(this.renderCard)
								: this.renderEmptyCard('No results were found')
							: !isLoading
								? this.renderEmptyCard('We dont have any games at the moment')
								: this.renderEmptyCard(Loading, {size: 40})}
					</div>
				)}
			</div>
		);
	}
}

Search.propTypes = {
	games: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired
};

export default withStyles(styles)(Search);
