import React from "react";
import HeaderComponent from "../Headers/HeaderComponent";
import {deleteUser, fetchProfile, updateUser} from "../../services/services";
import './profile-styles.css';
import UserTabsComponent from "./UserTabsComponent";
import {TicketComponent} from "./TicketComponent";
import PasswordModal from "./PasswordModal";
import crypto from "crypto-js";

export default class ProfileComponent extends React.Component {

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
    comment: ''
  };

  componentDidMount() {
    fetchProfile().then(user => {
      if (user) {
        this.setState({
          user: user,
          login: true
        })
      } else {
        this.props.history.push('/')
      }
    });
  }

  deleteAccount = () => {
    if (window.confirm('Are you sure?')) {
      // console.log(this.state.user._id)
      deleteUser(this.state.user._id).then(r => {
        if (r) {
          alert(`Your account with ${r.email} has been deleted!`);
          this.props.history.push('/')
        }
      })
    }
  };

  addFeedback = () => {
    if (!(/^\s*$/.test(this.state.comment))) {
      this.setState({
        user: {
          ...this.state.user,
          feedback: [
            ...this.state.user.feedback,
            this.state.comment
          ]
        }
      }, () => this.updateUser(this.state.user))
    } else {
      alert("Please add your valuable input!!")
    }
  };

  mergeUser = (editedValue) => {
    let modifiedUser = Object.assign(this.state.user, editedValue);
    this.updateUser(modifiedUser)
  };

  updateUser = (user) => {
    updateUser(user).then(user => {
      this.setState({
        user: user,
        comment: ''
      }, () => alert("Saved successfully!!"))
    })
  };

  encryptPassword = (password) => {
    return crypto.AES.encrypt(
        JSON.stringify(password), 'DEFcon777').toString();
  };

  updatePassword = (password) => {
    window.$(`#${this.state.user.first}`).modal('toggle');
    let encryptedPassword = this.encryptPassword(password);
    let updatedUser = this.state.user;
    updatedUser.password = encryptedPassword;
    updateUser(updatedUser).then(user => {
      this.setState({
        user: user
      }, () => alert("Password updated successfully!!"))
    })
  };

  deleteTicket = (ticket) => {
    if (window.confirm("Are you sure?")) {
      let currentTickets = JSON.parse(
          JSON.stringify(this.state.user.ticketsBooked));
      let updatedTickets = currentTickets.filter(t => t.id !== ticket.id);
      this.setState({
        user: {
          ...this.state.user,
          ticketsBooked: updatedTickets
        }
      }, () => updateUser(this.state.user))
    }
  };

  render() {

    let {_id, ticketsBooked, created, feedback, ...userDetails} = this.state.user;

    return (
        <>
          <HeaderComponent
              user={this.state.user}
              login={this.state.login}
              history={this.props.history}
          />
          <div className='container container-background'>
            <div className='row pt-3'>
              <div className='col-10' style={{"display": "inline"}}>
                <h2>Hello {this.state.user.first}!</h2>
              </div>
              <div className='col-2'>
                <button className='btn btn-link color-red float-right'
                        onClick={this.deleteAccount}
                >Delete
                  Account <i className="fas fa-times"/></button>
              </div>
            </div>
            <div className="row">
              <div className="col-10">
                <h5>Profile type: {this.state.user.type}</h5>
              </div>
              <div className="col-2">
                <PasswordModal
                    id={this.state.user.first}
                    updatePassword={this.updatePassword}/>
              </div>
            </div>
            <hr/>
            <h4>My Details</h4>
            <div className='row'>
              {Object.keys(userDetails).map(key =>
                  <UserTabsComponent
                      key={key}
                      title={key}
                      userDetail={userDetails[key]}
                      updateUser={this.mergeUser}
                  />
              )}
            </div>
            <hr/>
            {this.state.user.ticketsBooked.length !== 0 && <>
              <div className='row pt-3'>
                <div className='col-12'>
                  <h4>Booking History</h4>
                  <p className="color-red font-italic">**Deleting booking
                    history does not cancel the booking <br/>**Tickets once
                    deleted cannot be retrieved</p>
                </div>
              </div>
              <hr/>
              <div className='row pl-3 pr-3'>
                {this.state.user.ticketsBooked.map((ticket, index) =>
                    <TicketComponent
                        id={index}
                        deleteTicket={this.deleteTicket}
                        ticket={ticket}/>
                )}
              </div>
              <hr/>
            </>}

            {(this.state.user.type === 'USER' || this.state.user.type
                === 'AGENT')
            && <div className="row">
              <div className="col-10 pb-3">
                <input className="form-control"
                       value={this.state.comment}
                       placeholder="Have any queries or suggestions!!"
                       onChange={(e) => this.setState(
                           {comment: e.target.value})}
                />
              </div>
              <div className="col-2 pb-3">
                <button className="btn btn-primary btn-block"
                        onClick={this.addFeedback}>
                  Post
                </button>
              </div>
            </div>}
          </div>
        </>
    )
  }
}
