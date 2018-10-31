import { connect } from 'react-redux';
import Product from '../components/Product';

const mapStateToProps = ({ products: { games } }, { match: { params: { id } } }) => ({
  product: games.find(game =>  game.id === parseInt(id))
});

export default connect(mapStateToProps)(Product);
