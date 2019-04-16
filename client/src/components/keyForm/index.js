import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { withStyles } from "@material-ui/core/styles";
import TextField from "../textField";
import Loading from "../loading";
import { styles } from "../../styles/form";
import { config, url } from "../../server";

class KeyForm extends Component {
  state = {
    game_id: {
      value: "",
      empty: false
    },
    steam_key: {
      value: "",
      id: "steam_key",
      label: "Raktas",
      empty: false
    },
    key: null,
    error: false,
    success: false,
    isLoading: false
  };

  componentDidMount() {
    const { id } = this.props;
    id &&
      this.setState(
        {
          isLoading: true
        },
        this.getKey
      );
  }

  addKey = async key => {
    const { token } = this.props;
    await axios.post(`${url}/keys`, key, config(token));
  };

  editKey = async key => {
    const { token } = this.props;
    await axios.put(`${url}/keys`, key, config(token));
  };

  getKey = async () => {
    const { token, id } = this.props;
    const { data } = await axios.get(`${url}/keys/${id}`, config(token));
    data &&
      this.setState(prevState => ({
        key: data,
        game_id: {
          ...prevState.game_id,
          value: data.game_id
        },
        steam_key: {
          ...prevState.steam_key,
          value: data.steam_key
        },
        isLoading: false
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
        }
      }));
      return false;
    }
    return true;
  };

  validateForm = () => {
    const { game_id, steam_key } = this.state;
    let count = 0;
    !this.validateField(game_id) && count++;
    !this.validateField(steam_key) && count++;
    count > 0 &&
      this.setState({
        error: true,
        success: false
      });
    return count === 0;
  };

  handleSubmit = event => {
    const { game_id, steam_key, key } = this.state;
    event.preventDefault();
    if (this.validateForm()) {
      const values = {
        game_id: game_id.value,
        steam_key: steam_key.value
      };
      key
        ? this.editKey({
            ...values,
            id: key.id
          })
        : this.addKey(values);
      this.setState({
        error: false,
        success: true
      });
    }
  };

  renderMessage = (className, message, Icon) => {
    const { classes } = this.props;
    return (
      <SnackbarContent
        className={className}
        message={
          <span>
            <Icon className={classes.errorIcon} />
            {message}
          </span>
        }
      />
    );
  };

  render() {
    const { classes, id, products, isProductsLoading } = this.props;
    const { steam_key, game_id, error, key, success, isLoading } = this.state;
    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">Rakto forma</h1>
        <hr />
        {isProductsLoading || (id && isLoading) ? (
          <Loading size={100} />
        ) : id && !isLoading && !key ? (
          <Typography variant="h6">Tokio rakto nėra</Typography>
        ) : (
          <Paper className={classes.body}>
            {error &&
              this.renderMessage(
                classes.error,
                "Formoje negali būti tuščių laukų",
                ErrorIcon
              )}
            {success &&
              this.renderMessage(
                classes.success,
                "Raktas sėkmingai pridėtas",
                CheckCircleIcon
              )}
            <form onSubmit={this.handleSubmit} noValidate>
              <FormControl>
                <InputLabel htmlFor="game">Pasirinkite žaidimą</InputLabel>
                <Select
                  className={classes.select}
                  value={game_id.value}
                  displayEmpty
                  onChange={this.handleChange("game_id")}
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
                field={steam_key}
                onChange={this.handleChange}
                item={key}
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
          </Paper>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(KeyForm);
