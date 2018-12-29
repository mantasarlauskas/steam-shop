import React, {Component, Fragment} from 'react';
import CartCard from './CartCard';
import Button from '@material-ui/core/Button';

class Cart extends Component {
  render() {
    const {products, addToCart, removeFromCart, addOrder} = this.props;
    return (
      <div className="app container cart">
        <h1 className="title">Mano krepšelis</h1>
        <hr/>
        {products.length > 0 ?
          (
            <Fragment>
              <div className="cart-body">
                <p>Logo</p>
                <p>Name</p>
                <p>Vieneto kaina</p>
                <p>Kiekis</p>
                <p>Bendra kaina</p>
              </div>
              {products.map(({id, ...product}) =>
                <CartCard
                  key={id} {...product}
                  onAdd={() => addToCart(id)}
                  onRemove={() => removeFromCart(id)}
                />)
              }
              <Button onClick={addOrder} className="float-right" variant="contained" color="primary">
                Formuoti užsakymą
              </Button>
            </Fragment>
          ) :
          (
            <h6>
              Prekių krepšelyje kol kas nėra
            </h6>
          )
        }
      </div>
    )
  }
}

export default Cart;