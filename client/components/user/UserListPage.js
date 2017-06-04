import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import { addFlashMessage } from '../../actions/flashMessages';
import * as listUsers from '../../actions/userAction';

/**
 *
 *
 * @class UserListPage
 * @extends {React.Component}
 */
class UserListPage extends React.Component {
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
        offset: 0
      }
    };
    this.onRoleChange = this.onRoleChange.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

/**
   *
   *
   * @returns {void}
   * @memberof DocumentsListPage
   */
  componentWillMount() {
    this.props.actions.listUsers();
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
   * @returns {Object} conataining JSX
   *
   * @memberof UserListPage
   */
  render() {
    const pagination = this.props.users.pagination ?
     this.props.users.pagination : 1;
     console.log(pagination, '<===pagination');
    const allUsers = this.props.users.users ? this.props.users.users.rows : null;
    return (
      <div>
        <div className="welcome-message"><h4>Welcome Admin</h4><h6>No of Users:
          {` ${this.props.users.totalUsers} `}</h6></div>
        <div className="table-div">
          <table id="page-padding" className="striped table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>UserName</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Role</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
                <th>Change Role</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allUsers ? allUsers.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{(user.roleId === 1) ? 'Admin' : 'Regular'}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.updatedAt}</td>
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
                    <i
                      id="float-icons-left"
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => this.onClickDelete(user.id)} />
                  </td>
                </tr>
                )) : <span />}
            </tbody>
          </table>
          <div>
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
      </div>
    );
  }
}

UserListPage.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
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
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
}

const mapStateToProps = state => ({
  users: state.users,
  totalUsers: state.totalUsers,
  pagination: state.pagination
});


export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
