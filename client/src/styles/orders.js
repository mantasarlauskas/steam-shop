import green from "@material-ui/core/colors/green";

export const styles = theme => ({
  root: {
    marginTop: 30
  },
  row: {
    height: 65
  },
  button: {
    float: 'right'
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    }
  },
  success: {
    backgroundColor: green[600]
  },
  message: {
    color: '#FFF'
  },
  icon: {
    marginRight: 5
  },
  paper: {
    padding: 20
  },
  text: {
    marginBottom: 10
  },
  editButton: {
    marginRight: 5
  }
});