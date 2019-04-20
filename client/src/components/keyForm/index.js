import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import TextField from "../textField";
import Loading from "../loading";
import { styles } from "../../styles/form";

class KeyForm extends Component {
  state = {
    game_id: {
      value: "",
      empty: false,
      id: "game_id"
    },
    steam_key: {
      value: "",
      id: "steam_key",
      label: "Raktas",
      empty: false
    },
    error: false
  };

  componentDidMount() {
    const { onKeyLoad, id } = this.props;
    id ? onKeyLoad(id) : onKeyLoad();
  }

  componentWillUnmount() {
    const { resetKey, id } = this.props;
    id && resetKey();
  }

  componentDidUpdate({ productKey: prevKey }) {
    const { productKey, id } = this.props;
    id && productKey && prevKey !== productKey && this.initState();
  }

  initState = () => {
    const { productKey } = this.props;
    this.setState(prevState => ({
      game_id: {
        ...prevState.game_id,
        value: productKey.game_id
      },
      steam_key: {
        ...prevState.steam_key,
        value: productKey.steam_key
      }
    }));
  };

  handleChange = name => ({ target: { value } }) => {
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value,
        empty: value.length === 0
      }
    }));
  };

  validateField = field => {
    if (field.value === "") {
      this.setState(prevState => ({
        [field.id]: {
          ...prevState[field.id],
          empty: true
        },
        error: true
      }));
      return false;
    }
    return true;
  };

  validateForm = () => {
    const { game_id, steam_key } = this.state;
    return this.validateField(steam_key) && this.validateField(game_id);
  };

  handleSubmit = async event => {
    const { game_id, steam_key } = this.state;
    const { submitKey, productKey, history } = this.props;
    event.preventDefault();
    if (this.validateForm()) {
      const values = {
        game_id: game_id.value,
        steam_key: steam_key.value
      };
      if (productKey) {
        await submitKey({
          ...values,
          id: productKey.id
        });
      } else {
        await submitKey(values);
      }
      history.push("/keys");
    }
  };

  renderError = () => {
    const { classes } = this.props;
    return (
      <SnackbarContent
        className={classes.error}
        message={
          <span>
            <ErrorIcon className={classes.errorIcon} />
            Formoje negali būti tuščių laukų
          </span>
        }
      />
    );
  };

  renderForm = () => {
    const { classes, products, productKey } = this.props;
    const { steam_key, game_id } = this.state;
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <FormControl>
          <InputLabel htmlFor="game">Pasirinkite žaidimą</InputLabel>
          <Select
            className={classes.select}
            value={game_id.value}
            displayEmpty
            onChange={this.handleChange(game_id.id)}
            inputProps={{
              id: "game"
            }}
          >
            {products.map(({ id, title }) => (
              <MenuItem key={id} value={id}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          {...steam_key}
          onChange={this.handleChange}
          item={productKey}
        />
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
    );
  };

  render() {
    const {
      classes,
      id,
      isProductsLoading,
      isLoading,
      productKey
    } = this.props;
    const { error } = this.state;
    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">Rakto forma</h1>
        <hr />
        {isProductsLoading || (id && isLoading) ? (
          <Loading size={100} />
        ) : id && !isLoading && !productKey ? (
          <Typography variant="h6">Tokio rakto nėra</Typography>
        ) : (
          <Paper className={classes.body}>
            {error && this.renderError()}
            {this.renderForm()}
          </Paper>
        )}
      </div>
    );
  }
}

KeyForm.propTypes = {
  onKeyLoad: PropTypes.func.isRequired,
  id: PropTypes.number,
  resetKey: PropTypes.func,
  productKey: PropTypes.object,
  submitKey: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  isProductsLoading: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool
};

KeyForm.defaultValues = {
  id: null,
  resetKey: null,
  productKey: null,
  isLoading: false
};

export default withStyles(styles)(KeyForm);
