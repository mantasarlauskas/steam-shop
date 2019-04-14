export default theme => ({
  filter: {
    marginTop: 10,
    [theme.breakpoints.up("md")]: {
      float: "right",
      marginTop: 0
    }
  }
});
