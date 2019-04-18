export const styles = theme => ({
  card: {
    maxWidth: 345,
    [theme.breakpoints.down("xs")]: {
      maxWidth: 300
    },
    border: "1px #bdbdbd solid",
    left: "50%",
    transform: "translateX(-50%)",
    position: "relative"
  },
  media: {
    height: 200
  },
  content: {
    height: 150
  },
  games: {
    padding: "50px 10px 0 10px"
  },
  filters: {
    marginBottom: 15
  },
  main: {
    padding: 25
  },
  empty: {
    marginLeft: 10
  }
});
