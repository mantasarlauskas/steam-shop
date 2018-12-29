import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Orders extends Component {
  constructor(props) {
    super(props);
    props.onLoad();
  }

  render() {
    const { orders } = this.props;
    return (
      <div>
        {orders.map(({id, createdAt}) => (
          <div key={id}>
            <h6>{id}</h6>
            <p>Sukurtas: {createdAt}</p>
            <Link to={`/order/${id}`}>
              <Button variant="contained" color="primary">
                Peržiūrėti užsakymą
              </Button>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

export default Orders;