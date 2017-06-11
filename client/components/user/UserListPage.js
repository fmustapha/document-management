import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { addFlashMessage } from '../../actions/flashMessages';
// import '../../../node_modules/sweetalert/dist/sweetalert.css';
import { SearchBar } from '../../components/searchBar/searchBar';
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
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to update user' });
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
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to delete user' });
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
    this.setState({ offset }, () => {
      this.props.actions.listUsers(this.state.limit, offset);
    });
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
    const pagination = this.props.users.pagination ?
     this.props.users.pagination : 1;
    const totalUsers = this.props.users.totalUsers;
    let allUsers = this.props.users.users ? this.props.users.users.rows : null;
    allUsers = this.props.search.user ? this.props.search.user.user.rows : allUsers;
    return (
      <div>
        <SearchBar
        searchFor="user"
        loadUsers="{this.props.actions.listUsers(limit, offset)}"
        performSearch={this.props.searchAction} />
        <div className="welcome-message"><h4>Welcome Admin</h4><p>No of Users:
          {`${totalUsers}`}</p></div>
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
              {allUsers ? allUsers.map(user => (
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
                       value="select role"
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
                )) : <span />}
            </tbody>
          </table>
          <div id="pagination">
            <ReactPaginate
            previousLabel={'previous'}
                           nextLabel={'next'}
                           breakLabel={<a href="">...</a>}
                           breakClassName={'break-me'}
                           pageCount={pagination.page_count}
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
  users: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  searchAction: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

/**
 *
 *
 * @param {func} dispatch
 * @returns {Object} containing the action property
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listUsers, dispatch),
    searchAction: bindActionCreators(searchAction.searchUser, dispatch),
    swal: bindActionCreators(swal, dispatch),
    close: bindActionCreators(close, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
}

const mapStateToProps = state => ({
  users: state.users,
  totalUsers: state.totalUsers,
  pagination: state.pagination,
  search: state.search
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
