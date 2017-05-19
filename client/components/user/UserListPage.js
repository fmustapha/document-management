import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TinyMCE from 'react-tinymce';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import * as userAction from '../../actions/userAction';

class UserListPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: 0
    };
  }

userRow(user, index) {
  return <div key={index}>{user.firstname}</div>;
}

  render() {
    console.log(this.props.users, 'users');
    return (
      <div>
        <div>
          <table className="striped">
            <thead>
              <tr>
                <th>UserName</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Role</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alvin</td>
                <td>Eclair</td>
                <td>$0.87</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


UserListPage.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  console.log(state);
  return {
    documents: state.documents,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(UserListPage);
