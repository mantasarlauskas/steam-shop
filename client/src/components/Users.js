import React, { Component } from 'react';
import Pagination from './Pagination';

class Users extends Component {
  constructor(props) {
    super(props);
    props.onUsersLoad();
  }

  showPagination() {
    const { users, pagination: { itemsPerPage }, onPageChange } = this.props;
    return (
      <Pagination 
        pageCount={Math.ceil(users.length/itemsPerPage)} 
        changePage={({ selected }) => onPageChange(selected)}
      />
    );
  }

  render() {
    const { filteredUsers, pagination: { currentPage }, onUserUnban, onUserBan } = this.props;
    return (
      <div className="app users">
        <table className="users__table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Slapyvardis</th>
            <th scope="col">El. paštas</th>
            <th scope="col">Rolė</th>
            <th scope="col">Veiksmai</th>
          </tr>
          </thead>
          <tbody>
          { filteredUsers.map(({ username, email, role, isBanned, id }, index) => (
            <tr key={username}>
              <th scope="row">{ currentPage * 10 + index + 1 }</th>
              <td>{ username }</td>
              <td>{ email }</td>
              <td>{ role }</td>
              <td>
                {
                  role === 0 && isBanned === false &&
                    <button className="btn btn-warning" onClick={() => onUserBan({id})}>
                      Blokuoti
                    </button>
                }
                {
                  role === 0 && isBanned === true &&
                    <button className="btn btn-warning" onClick={() => onUserUnban({ id })}>
                      Atblokuoti
                    </button>
                }
              </td>
            </tr>
          ))
          }
          </tbody>
        </table>
        { this.showPagination() }
      </div>
    );
  }
};

export default Users;