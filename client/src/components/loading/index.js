import React from "react";
import PropTypes from "prop-types";
import { ClipLoader } from "react-spinners";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

const Loading = ({ size, classes }) => (
  <div className={classes.loading}>
    <ClipLoader sizeUnit={"px"} size={size} color={"#343a40"} loading />
    <div className={classes.text}>Kraunama...</div>
  </div>
);

Loading.propTypes = {
  size: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
