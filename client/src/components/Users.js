import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, banUser, unbanUser } from '../actions/auth';
import { usersPaginationSelector } from '../selectors/users';
import Pagination from './Pagination';
import { setPage } from '../actions/pagination';
import Modal from './Modal';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banUserID: null,
      unbanUserID: null
    }
  }

  componentDidMount() {
    const { dispatch, users } = this.props;
    users.length === 0 && dispatch(getUsers());
  }

  showPagination() {
    const { users, dispatch, pagination: { itemsPerPage } } = this.props;
    return (
      <Pagination 
        pageCount={Math.ceil(users.length/itemsPerPage)} 
        changePage={({ selected }) => dispatch(setPage(selected))} 
      />
    );
  }

  showModal() {
    const { banUserID, unbanUserID } = this.state;
    const { dispatch } = this.props;
    return (
      <Modal 
        title={"Ar tikrai norite " + (banUserID ? "užblokuoti" : "atblokuoti") + " šį vartotoją?"} 
        text={banUserID ? banUserID : unbanUserID} 
        onSubmit={() => banUserID ? dispatch(banUser({ id: banUserID })) : dispatch(unbanUser({ id: unbanUserID })) } 
      />
    )
  }

  render() {
    const { isFetching, filteredUsers, pagination: { currentPage } } = this.props;
    if(isFetching === false) {
      return (
        <div className="app">
          <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Slapyvardis</th>
              <th scope="col">El. paštas</th>
              <th scope="col">Rolė</th>
              <th scope="col">Ar užblokuotas?</th>
              <th scope="col">Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            { filteredUsers.map(({ username, email, role, isBanned }, index) => (
                <tr key={username}>
                  <th scope="row">{ currentPage * 10 + index + 1 }</th>
                  <td>{ username }</td>
                  <td>{ email }</td>
                  <td>{ role }</td>
                  <td>{ isBanned }</td>
                  <td>
                    { role === 0 && isBanned === 0 ? 
                        <button 
                          className="btn btn-warning" 
                          data-toggle="modal" 
                          data-target="#modalWindow"
                          onClick={() => this.setState({ banUserID: username, unbanUserID: null })}
                        >
                          Blokuoti
                        </button> :
                        role === 0 && isBanned === 1 ?
                        <button 
                          className="btn btn-warning"
                          data-toggle="modal" 
                          data-target="#modalWindow"
                          onClick={() => this.setState({ banUserID: null, unbanUserID: username })} 
                        >
                          Atblokuoti
                        </button> : null
                    }
                  </td>
                </tr>
              )) 
            }
          </tbody>
        </table>
        { this.showPagination() }
        { this.showModal() }
      </div>
      );
    } else {
      return <h5>Loading...</h5>;
    }
  }
};

export default connect(state => ({
  pagination: state.pagination,
  users: state.auth.users,
  filteredUsers: usersPaginationSelector(state),
  isFetching: state.auth.isFetching
}))(Users); 