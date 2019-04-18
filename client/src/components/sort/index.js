import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const Sort = ({ classes, setSort }) => (
  <div className={classes.filter}>
    <Typography variant="body2" gutterBottom>
      Rikiavimas:
    </Typography>
    <select onChange={({ target: { value } }) => setSort(value)}>
      <option value="NAME_ASC">Pagal pavadinimą didėjimo tvarka</option>
      <option value="NAME_DESC">Pagal pavadinimą mažėjimo tvarka</option>
      <option value="PRICE_ASC">Pagal kainą didėjimo tvarka</option>
      <option value="PRICE_DESC">Pagal kainą mažėjimo tvarka</option>
    </select>
  </div>
);

Sort.propTypes = {
  classes: PropTypes.object.isRequired,
  setSort: PropTypes.func.isRequired
};

export default withStyles(styles)(Sort);
