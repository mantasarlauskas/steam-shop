export const styles = theme => ({
  card: {
    maxWidth: 345,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 300
    },
    border: '1px #bdbdbd solid',
    left: '50%',
    transform: 'translateX(-50%)',
    position: 'relative'
  },
  media: {
    height: 200
  },
  content: {
    height: 150
  },
  games: {
    padding: '50px 10px 0 10px'
  },
  filters: {
    marginBottom: 15
  },
  filter: {
    marginTop: 10,
    [theme.breakpoints.up('md')]: {
      float: 'right',
      marginTop: 0
    }
  },
  range: {
    top: '50%',
    transform: 'translateY(-50%)'
  },
  main: {
    padding: 25
  }
});