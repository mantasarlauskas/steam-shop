import React, {Component, Fragment} from 'react';
import CartCard from "./CartCard";

class Order extends Component {
  constructor(props) {
    super(props);
    props.onLoad();
  }

  render() {
    const { products } = this.props;

    return (
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
          />)
        }
      </Fragment>
    )
  }
}

export default Order;