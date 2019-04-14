export default theme => ({
  review: {
    padding: 10,
    margin: "20px 0"
  },
  rating: {
    display: "inline-block",
    marginLeft: 10,
    height: 25,
    fontSize: 15
  },
  date: {
    [theme.breakpoints.up("sm")]: {
      float: "right"
    }
  }
});
