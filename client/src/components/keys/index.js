import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Grid from "@material-ui/core/Grid";
import Pagination from "../pagination";
import Loading from "../loading";
import { styles } from "../../styles/tables";
import { config, url } from "../../server";

class Keys extends Component {
  state = {
    paginatedKeys: [],
    keys: [],
    isLoading: false
  };

  componentDidMount() {
    this.getKeys();
  }

  getKeys = async () => {
    this.setState({ isLoading: true });
    const { token } = this.props;
    const { data } = await axios.get(`${url}/keys`, config(token));
    this.setState({
      keys: data,
      isLoading: false
    });
  };

  handleRemove = async id => {
    const { token } = this.props;
    await axios({
      method: "delete",
      url: `${url}/keys`,
      data: { id },
      ...config(token)
    });
    this.getKeys();
  };

  handleKeysChange = paginatedKeys => {
    this.setState({
      paginatedKeys
    });
  };

  renderKey = ({ id, createdAt, steam_key, Product: { title }, isUsed }) => {
    const { classes } = this.props;
    return (
      <TableRow className={classes.row} key={id}>
        <TableCell>{id}</TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{steam_key}</TableCell>
        <TableCell>Sukurtas: {new Date(createdAt).toLocaleString()}</TableCell>
        <TableCell>
          {isUsed ? (
            <Button disabled className={classes.error}>
              <span className={classes.message}>
                <ErrorIcon className={classes.icon} />
                Panaudotas
              </span>
            </Button>
          ) : (
            <Button disabled className={classes.success}>
              <span className={classes.message}>
                <CheckCircleIcon className={classes.icon} />
                Nepanaudotas
              </span>
            </Button>
          )}
        </TableCell>
        <TableCell>
          {!isUsed && (
            <Grid container>
              <Grid item xs={6}>
                <Link to={`/key-upload/${id}`}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <IconButton onClick={() => this.handleRemove(id)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </TableCell>
      </TableRow>
    );
  };

  render() {
    const { classes } = this.props;
    const { paginatedKeys, keys, isLoading } = this.state;
    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">Raktai</h1>
        <hr />
        {keys.length > 0 ? (
          <Paper className={classes.tableWrapper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Žaidimas</TableCell>
                  <TableCell>Raktas</TableCell>
                  <TableCell>Sukūrimo data</TableCell>
                  <TableCell>Būklė</TableCell>
                  <TableCell>Veiksmai</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{paginatedKeys.map(this.renderKey)}</TableBody>
            </Table>
            <Pagination
              tablePagination={true}
              itemLength={keys.length}
              itemsPerPage={10}
              data={keys}
              returnData={this.handleKeysChange}
            />
          </Paper>
        ) : !isLoading ? (
          <Typography variant="h6">Raktų kol kas dar nėra</Typography>
        ) : (
          <Loading size={100} />
        )}
      </div>
    );
  }
}

Keys.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
};

export default withStyles(styles)(Keys);
