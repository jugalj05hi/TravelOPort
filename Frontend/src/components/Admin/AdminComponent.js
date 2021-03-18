import React from "react";
import {
  adminPassUpdate,
  deleteUser,
  fetchProfile,
  findAllUsers,
  updateUser
} from "../../services/services";
import HeaderComponent from "../Headers/HeaderComponent";
import AdminContentComponent from "./AdminContentComponent";
import crypto from "crypto-js";

export default class AdminComponent extends React.Component {

  state = {
    user: {
      email: '',
      first: '',
      last: '',
      type: '',
      feedback: [],
      ticketsBooked: []
    },
    login: false,
    admin: false,
    users: []
  };

  componentDidMount() {
    fetchProfile().then(user => {
      if (user && user.type === 'ADMIN') {
        this.setState({
          user: user,
          login: true
        }, () => {
          findAllUsers().then(users => {
            if (users) {
              this.setState({
                users: users
              })
            }
          })
        })
      } else {
        this.props.history.push('/')
      }
    })
  }

  fetchUsers = () => {
    findAllUsers().then(users => {
      if (users) {
        this.setState({
          users: users
        })
      }
    })
  };

  updatePwd = (uid, newPassword) => {
    let encryptedPassword = this.encryptPassword(newPassword);
    adminPassUpdate(uid, encryptedPassword).then(r => {
      alert('saved successfully!!');
    })
  };

  encryptPassword = (password) => {
    return crypto.AES.encrypt(
        JSON.stringify(password), 'DEFcon777').toString();
  };

  update = (user) => {
    // removed password because BE tries to hash the hash code
    const {password, ...userPass} = user;
    updateUser(userPass).then(response => {
      if (response) {
        this.fetchUsers()
      }
    })
  };

  delete = (userId) => {
    if (window.confirm("Are you sure, you want to delete this user?")) {
      deleteUser(userId).then(r => {
        alert("User deleted successfully!!");
        this.fetchUsers()
      })
    }
  };

  render() {
    return (
        <>
          <HeaderComponent
              user={this.state.user}
              login={this.state.login}
              history={this.props.history}
          />
          <div className='container container-background'>
            <div className="row pt-3">
              <div className='col'>
                <h3>Admin Dashboard</h3>
              </div>
            </div>
            <hr/>
            <div className='row'>
              <div className='col table-responsive-sm'>
                <table className="table table-bordered table-dark">
                  <thead>
                  <tr>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Type</th>
                    <th scope="col">Bookings</th>
                    <th scope="col">Feedback</th>
                    <th scope="col">Remove</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.users.map(user =>
                        <AdminContentComponent
                            updateUserService={this.update}
                            updatePwd={this.updatePwd}
                            delete={this.delete}
                            user={user}
                        />
                    )
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
    )
  }
}
