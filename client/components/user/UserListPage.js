import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { SearchBar } from '../../components/searchBar/SearchBar';
import * as listUsers from '../../actions/userAction';
import * as searchAction from '../../actions/searchAction';


/**
 *
 *
 * @class UserListPage
 * @extends {React.Component}
 */
export class UserListPage extends React.Component {
  /**
   * Creates an instance of UserListPage.
   * @param {Object} props
   * @param {Object} context
   *
   * @memberof UserListPage
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      users: {
        id: props.users.id,
        username: props.users.username,
        firstname: props.users.firstname,
        lastname: props.users.lastname,
        email: props.users.email,
        role: props.users.role,
        createdAt: props.users.createdAt,
        updatedAt: props.users.updatedAt,
      },
      searching: true,
      id: 0,
      offset: 0,
      limit: 10
    };
    this.onRoleChange = this.onRoleChange.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

/**
   *
   *
   * @returns {void}
   * @memberof DocumentsListPage
   */
  componentWillMount() {
    this.props.actions.listUsers(this.state.limit, this.state.offset);
  }

  /**
   *
   * @returns {void|Response} response object or void
   * @param {Object} event
   * @param {Number} id
   *
   * @memberof UserListPage
   */
  onRoleChange(event, id) {
    this.props.actions.updateUser(id, { roleId: event.target.value })
    .then(() => toastr.success('User Successfully updated'))
    .catch(() => {
      toastr.error(
        'Unable to update user');
    });
  }

  /**
   *
   * @returns {void|Response} response object or void
   * @param {Number} id
   *
   * @memberof UserListPage
   */
  onClickDelete(id) {
    this.props.actions.deleteUser(id)
    .then(() => toastr.success('User Successfully Deleted'))
    .catch(() => {
      toastr.error(
        'Unable to delete user');
    });
    this.setState({ id: 0 });
  }

  /**
   *
   *
   * @param {Object} data
   * @returns {void}
   * @memberof UserListPage
   */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.limit);
    this.setState({ offset });
    this.props.actions.listUsers(this.state.limit, offset);
  }

  /**
   *
   *
   * @param {Number} userId
   * @returns {func} call to onClickDelete
   * @memberof UserListPage
   */
  renderAlert(userId) {
    event.preventDefault();
    this.props.swal({
      title: 'Warning!',
      text: 'Are you sure you want to delete user?',
      type: 'info',
      showCancelButton: true,
      onConfirm: (() => this.onClickDelete(userId)),
      onCancel: this.props.close,
    });
  }

  /**
   *
   *
   * @returns {Object} conataining JSX
   *
   * @memberof UserListPage
   */
  render() {
    return (
      <div>
        <SearchBar
        offset={this.state.offset}
        performSearch={this.props.searchAction} />
        <div className="welcome-message"><h4>Welcome Admin</h4><p>No of Users:
          {`${this.props.totalUsers}`}</p></div>
        <div className="table-div">
          <table id="page-padding" className="striped table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Change Role</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.length ? this.props.users.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{(parseInt(user.roleId, 10) === 1) ? 'Admin' : 'Regular'}</td>
                  <td>{new Date(user.createdAt).toDateString()}</td>
                  <td>{new Date(user.updatedAt).toDateString()}</td>
                  <td>{(user.id === 1) ?
                     'Super Admin' : <div className="" id="select">
                       <select
                       value="select-role"
                       onChange={event => this.onRoleChange(event, user.id)}>
                         <option value={0}>Select Access Type</option>
                         <option value={1} >Admin</option>
                         <option value={2} >Regular</option>
                       </select>
                     </div>
                    }
                  </td>
                  <td>
                    {(user.id === 1) ?
                     'N/A' : <i
                      id="float-icons-left"
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => this.renderAlert(user.id)} />
                    }
                  </td>
                </tr>
                )) : null}
            </tbody>
          </table>
          <div id="pagination">
            <ReactPaginate
            previousLabel={'previous'}
                           nextLabel={'next'}
                           breakLabel={<a href="">...</a>}
                           breakClassName={'break-me'}
                           pageCount={this.props.pagination.page_count ?
                            this.props.pagination.page_count : null}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={this.handlePageClick}
                           containerClassName={'pagination'}
                           subContainerClassName={'pages pagination'}
                           pageClassName={'waves-effect'}
                           activeClassName={'active'} />
          </div>
        </div>
        <ReduxSweetAlert />
      </div>
    );
  }
}

UserListPage.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  searchAction: PropTypes.func.isRequired
};

/**
 *
 *
 * @param {func} dispatch
 * @returns {Object} containing the list users, search, swal and close actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listUsers, dispatch),
    searchAction: bindActionCreators(searchAction.searchUser, dispatch),
    swal: bindActionCreators(swal, dispatch),
    close: bindActionCreators(close, dispatch)
  };
}

/**
 *
 *
 * @param {Object} state
 * @returns {Object} users, totalUsers, pagination and search states
 */
function mapStateToProps(state) {
  return {
    users: state.users.rows,
    totalUsers: state.users.totalUsers,
    pagination: state.users.pagination,
    search: state.search
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
