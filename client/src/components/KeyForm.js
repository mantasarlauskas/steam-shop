import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {styles} from '../styles/form';
import ErrorIcon from '@material-ui/icons/Error';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import {config, url} from "../server";

class KeyForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      game_id: {
        value: '',
        empty: false
      },
      steam_key: {
        value: '',
        empty: false
      },
      key: null,
      error: false
    };

    this.state = this.initialState;

    props.id && this.getKey();
  }

  getKey = () => {
    const {token, id} = this.props;

    axios
      .get(`${url}/keys/${id}`, config(token))
      .then(({data}) => {
        this.setState({
          key: data,
          game_id: {
            value: data.game_id,
            empty: false
          },
          steam_key: {
            value: data.steam_key,
            empty: false
          }
        })
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

  setError = name => {
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        empty: true
      }
    }))
  };

  checkForEmptyFields = () => {
    const {game_id, steam_key} = this.state;
    let count = 0;

    if (game_id.value === '') {
      this.setError('game_id');
      count++;
    }

    if (steam_key.value === '') {
      this.setError('steam_key');
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
    const {game_id, steam_key, key} = this.state;
    const {onEdit, onAdd, history} = this.props;

    event.preventDefault();

    if (this.checkForEmptyFields()) {
      const values = {
        game_id: game_id.value,
        steam_key: steam_key.value
      };

      if (key) {
        onEdit({
          ...values,
          id: key.id
        });
      } else {
        onAdd(values);
      }

      this.setState(this.initialState);
      history.push('/keys');
    }
  };

  render() {
    const {classes, id, products} = this.props;
    const {steam_key, game_id, error, key} = this.state;

    if (id && !key) {
      return (
        <Typography variant="h6">
          Tokio rakto nėra
        </Typography>
      )
    } else {
      return (
        <div className={`${classes.root} container`}>
          <h1 className="title">
            Rakto forma
          </h1>
          <hr/>
          <Paper className={classes.body}>
            {error && (
              <SnackbarContent
                className={classes.error}
                message={
                  <span>
                  <ErrorIcon className={classes.errorIcon}/>
                  Formoje negali būti tuščių laukų
                </span>
                }
              />
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
                    id: 'game'
                  }}
                >
                  {products.map(({id, title}, index) => <MenuItem key={id} value={id}>{title}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                error={steam_key.empty}
                defaultValue={key && key.steam_key}
                id="title"
                label="Raktas"
                autoComplete="off"
                margin="normal"
                onChange={this.handleChange("steam_key")}
                variant="outlined"
                fullWidth
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
        </div>
      )
    }
  }
}

export default withStyles(styles)(KeyForm);