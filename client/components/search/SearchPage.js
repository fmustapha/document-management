import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFlashMessage } from '../../actions/flashMessages';
import * as searchAction from '../../actions/searchAction';

/**
 *
 *
 * @class ViewDocumentPage
 * @extends {React.Component}
 */
class SearchPage
 extends React.Component {
  /**
   * Creates an instance of ViewDocumentPage.
   * @param {Object} props
   * @param {Object} context
   *
   * @memberof SearchPage
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      term: '',
      type: '',
    };
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onTermChange = this.onTermChange.bind(this);
  }

 onTermChange(event) {
   const term = event.target.value;
   console.log(term);
   this.setState({ term });
 }
  /**
   *
   *
   * @param {Object} event
   * @returns {void}
   * @memberof UpdateDocumentPage
   */
  onTypeChange(event) {
    const type = event.target.value;
    console.log(type, 'term is', this.state.term);
    if (type === 'user') {
      this.props.searchAction.searchUser(this.state.term);
    } else {
      this.props.searchAction.searchDocument(this.state.term);
    }
  }

  render() {
    console.log(this.props.search.document);
    const allUsers = this.props.search.user ?
     this.props.search.user.user : null;
    return (
      <div className="body search_style">
        <div>
          <h2>SEARCH</h2>
          <i>Type in the box below to search</i>
        </div>
        <nav className="search_nav">
          <div className="nav-wrapper">
            <form>
              <div className="input-field">
                <input id="search" type="search" required value={this.state.term} onChange={this.onTermChange}/>
                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
        <div
          className="search_type"
           id="select">
          <select
              value="select role"
                onChange={this.onTypeChange}>
            <option value="" selected>Select what to search</option>
            <option value="user">User</option>
            <option value="document">Document</option>
          </select>
        </div>
        <div><h5>documents</h5>
        <div id="allDocuments" className="col s12">
              <div className="row">
                {(!this.props.search.document) ?
                  <div className="col s12 m12" key={document.id}>
                    <div className="card">
                      <div className="card-content teal-text lighten-1">
                        <div className="card-title">
                          <div className="document-title">
                            <p>No Documents yet! CLick create icon below</p>
                          </div>
                          <div className="clear" />
                        </div>
                      </div>
                    </div>
                  </div>
                :
                this.props.search.document.document.map((document) => (
                  <div className="col s12 m12" key={document.id}>
                    <div className="card">
                      <div className="card-content green-text">
                        <div className="card-title">
                          <div className="document-title">
                            <i id="float-icons-left" className="fa fa-file-text" aria-hidden="true" />
                            <Link to={`/dms/document/${document.id}`}>{document.title}</Link>
                          </div>
                          <div className="action-icons">
                            <i id="float-icons-left" className="fa fa-pencil-square-o" aria-hidden="true" />
                            <i id="float-icons-left" className="fa fa-trash" aria-hidden="true" />
                          </div>
                          <div className="clear" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                }
        </div>
        </div>
        <div><h5>Users</h5>
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
                      onClick={() => this.onClickDelete(user.id)} />
                  </td>
                </tr>
                )) : <span />}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state)
  return {
    search: state.search
  };
}

function MapDispatchToProps(dispatch) {
  return {
    searchAction: bindActionCreators(searchAction, dispatch)
  };
}


export default connect(mapStateToProps, MapDispatchToProps)(SearchPage);
