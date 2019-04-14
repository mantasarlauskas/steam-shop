import green from "@material-ui/core/colors/green";

export default theme => ({
  root: {
    marginTop: 30
  },
  error: {
    color: theme.palette.error.dark,
    margin: "25px 0"
  },
  price: {
    color: theme.palette.error.dark,
    marginTop: 30
  },
  success: {
    color: green[600],
    margin: "25px 0"
  },
  submit: {
    background: green[600],
    width: "75%",
    padding: "10px 0",
    "&:hover": {
      backgroundColor: green[700]
    },
    color: "white"
  },
  paper: {
    padding: 25,
    marginBottom: 20,
    minHeight: 600,
    position: "relative"
  },
  image: {
    width: 400,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
    [theme.breakpoints.down("md")]: {
      maxWidth: 280,
      width: "90%"
    }
  },
  imageWrapper: {
    [theme.breakpoints.down("md")]: {
      position: "relative",
      height: 370
    }
  },
  smallInfo: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  info: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  reviewButton: {
    margin: "20px 0"
  }
});
