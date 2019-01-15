import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {styles} from '../styles/form';
import ErrorIcon from '@material-ui/icons/Error';

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      title: {
        value: '',
        empty: false
      },
      price: {
        value: '',
        empty: false
      },
      description: {
        value: '',
        empty: false
      },
      logo: {
        value: null,
        empty: false
      },
      error: false
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    const {product} = this.props;

    if (product) {
      this.initState();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {product} = this.props;

    if (prevProps.product !== product && product) {
      this.initState();
    }
  }

  initState = () => {
    const {product} = this.props;

    this.setState({
      title: {
        value: product.title,
        empty: false
      },
      price: {
        value: product.price,
        empty: false
      },
      description: {
        value: product.description,
        empty: false
      }
    });
  };

  handleChange = name => ({target: {value}}) => {
    this.setState({
      [name]: {
        value,
        empty: value.length === 0
      }
    });
  };

  handleFileChange = ({target: {files}}) => {
    this.setState({
      logo: {
        value: files.length > 0 ? files : null,
        empty: false
      }
    })
  };

  setError = name => {
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        empty: true
      }
    }))
  };

  resetState = () => {
    this.setState(this.initialState);
  };

  checkForEmptyFields = () => {
    const {title, price, description, logo} = this.state;
    const {product} = this.props;
    let count = 0;

    if (title.value === '') {
      this.setError('title');
      count++;
    }

    if (price.value === '') {
      this.setError('price');
      count++;
    }

    if (description.value === '') {
      this.setError('description');
      count++;
    }

    if (logo.value === null && !product) {
      count++;
    }

    if (count > 0) {
      this.setState({
        error: true
      });
    }

    return count === 0;
  };

  handleSubmit = event => {
    const {title, price, description, logo} = this.state;
    const {product, onEdit, onAdd, history} = this.props;

    event.preventDefault();

    if (this.checkForEmptyFields()) {
      const values = {
        title: title.value,
        price: price.value,
        description: description.value,
        logo: logo.value
      };

      if (product) {
        onEdit({
          ...values,
          id: product.id
        });
      } else {
        onAdd(values);
      }

      this.resetState();
      history.push('/games');
    }
  };

  render() {
    const {classes, id, product} = this.props;
    const {title, price, description, logo, error} = this.state;

    if (id && !product) {
      return (
        <Typography variant="h6">
          Tokio žaidimo nėra
        </Typography>
      )
    } else {
      return (
        <div className={`${classes.root} container`}>
          <h1 className="title">
            Žaidimo forma
          </h1>
          <hr/>
          <Paper className={classes.body}>
            {error && (
              <SnackbarContent
                className={classes.error}
                message={
                  <span>
                  <ErrorIcon className={classes.errorIcon}/>
                  Formoje negali būti tuščių laukų ir nepasirinkto paveikslėlio
                </span>
                }
              />
            )}
            <form onSubmit={this.handleSubmit} noValidate>
              <TextField
                error={title.empty}
                defaultValue={product && product.title}
                id="title"
                label="Pavadinimas"
                autoComplete="off"
                margin="normal"
                onChange={this.handleChange("title")}
                variant="outlined"
                fullWidth
              />
              <TextField
                error={price.empty}
                defaultValue={product && product.price}
                id="price"
                label="Kaina"
                autoComplete="off"
                margin="normal"
                type="number"
                inputProps={{ min: "0", step: "1" }}
                onChange={this.handleChange("price")}
                variant="outlined"
                fullWidth
              />
              <TextField
                error={description.empty}
                defaultValue={product && product.description}
                id="description"
                label="Aprašymas"
                autoComplete="off"
                margin="normal"
                onChange={this.handleChange("description")}
                variant="outlined"
                fullWidth
                multiline
              />
              <input
                type="file"
                alt="Product Logo"
                accept="image/png,image/jpeg"
                style={{ display: 'none' }}
                id="logo"
                onChange={this.handleFileChange}
              />
              <label htmlFor="logo" className={classes.label}>
                <Button
                  component="span"
                  variant="outlined"
                >
                  Pasirinkti paveikslėlį
                </Button>
              </label>
              {logo.value && (
                <Typography className={classes.fileName} variant="body2">
                  {logo.value[0].name}
                </Typography>
              )}
              <div className={classes.submitWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  className={classes.submit}
                  align="center"
                >
                  Patvirtinti
                </Button>
              </div>
            </form>
          </Paper>
        </div>
      )
    }
  }
}

export default withStyles(styles)(ProductForm);