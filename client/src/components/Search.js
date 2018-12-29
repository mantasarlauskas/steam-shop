import React, {Component} from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
  media: {
    height: 80,
    width: 80,
    float: 'right'
  },
  card: {
    border: '1px black solid',
    marginBottom: 2
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  searchResults: {
    position: 'absolute',
    top: 40,
    zIndex: 100,
    width: '100%',
    maxHeight: 300,
    overflowY: 'auto'
  }
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  };

  showSearch = () => {
    this.setState({
      show: true
    });
  };

  handleClickOutside = () => {
    this.setState({
      show: false
    });
  };

  displayCard = ({id, logo, title}) => {
    const {classes} = this.props;
    return (
      <Link key={id} to={`/product/${id}`}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={logo}
              title={title}
            />
            <CardContent>
              <Typography gutterBottom component="h4">
                {title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    )
  };

  displayEmptyCard = () => {
    const {classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom component="h4">
              Paieška neatitinka jokių rezultatų
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  };

  render() {
    const {games, searchForProducts, classes} = this.props;
    const {show} = this.state;
    return (
      <div className={classes.search} onClick={this.showSearch}>
        <div className={classes.searchIcon}>
          <SearchIcon/>
        </div>
        <InputBase
          placeholder="Ieškoti…"
          onChange={searchForProducts}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
        {show && (
          <div className={classes.searchResults}>
            {games
              ? games.length > 0
                ? games.map(this.displayCard)
                : this.displayEmptyCard()
              : null
            }
          </div>
        )}
      </div>
    );
  };
}

export default withStyles(styles)(enhanceWithClickOutside(Search));