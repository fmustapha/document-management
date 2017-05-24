import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TinyMCE from 'react-tinymce';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { addFlashMessage } from '../../actions/flashMessages';
import * as listUser from '../../actions/userAction';

/**
 *
 *
 * @class UserListPage
 * @extends {React.Component}
 */
class UserListPage extends React.Component {
  /**
   * Creates an instance of UserListPage.
   * @param {any} props
   * @param {any} context
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
      }
    };
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
  componentWillReceiveProps() {
    this.forceUpdate();
  }

  onRoleChange(event) {
    const users = { ...this.state };
    users.role = event.target.value;
    this.setState({ users });
    alert(this.state);
  }

  /**
   *
   *
   * @param {Number} id
   *
   * @memberof UserListPage
   */
  deleteUser(id) {
    this.props.actions(listUser.deleteUser(id))
    .then(() => toastr.success('User Successfully Deleted'))
    .catch(() => {
      this.props.dispatch(addFlashMessage({
        type: 'error',
        text: 'Unable to delete user' }));
      toastr.error(
        'Unable to delete user');
    });
    this.setState({ id: 0 });
  }


  updateUser(){
    this.props.dispatch(actions.deleteUser(id))
    .then(() => toastr.success('User Successfully Deleted'))
    .catch(() => {
      this.props.dispatch(addFlashMessage({
        type: 'error',
        text: 'Unable to delete user' }));
      toastr.error(
        'Unable to delete user');
    });
    this.setState({ id: 0 });
  }

// /**
//  *
//  *
//  * @param {any} user
//  * @param {any} index
//  * @returns
//  *
//  * @memberof UserListPage
//  */
// userRow(user, index) {
//   return <div key={index}>{user.firstname}</div>;
// }

  /**
   *
   *
   * @returns
   *
   * @memberof UserListPage
   */
  render() {
    const allUsers = this.props.users;
    return (
      <div>
        <div className="welcome-message"><h4>Welcome Admin</h4><h6>No of Users: {allUsers && allUsers.length}{allUsers.lenght}</h6></div>
        <div>
          <table id="page-padding" className="striped">
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
                <th>promote</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length > 0 ? allUsers.map(user => (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{(user.roleId === 1) ? 'Admin' : 'Regular'}</td>
                    <td>{user.createdAt}</td>
                    <td>{user.updatedAt}</td>
                    <td>{(user.id === 1) ?
                     'Super Admin' : <div className="" id="select">
                       <select value="select role" onChange={this.onRoleChange}>
                         <option value="" selected>Select Access Type</option>
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
                      onClick={() => this.deleteUser(user.id)} />
                    </td>
                  </tr>
                )) : <span> {allUsers} </span>}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}



UserListPage.propTypes = {
  actions: React.PropTypes.object.isRequired,
  users: React.PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listUser, dispatch)
  };
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
