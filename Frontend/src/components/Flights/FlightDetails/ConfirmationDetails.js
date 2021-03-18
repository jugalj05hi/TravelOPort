import React from "react";
import {fetchProfile} from "../../../services/services";
import HeaderComponent from "../../Headers/HeaderComponent";

export default class ConfirmationDetails extends React.Component {

  state = {
    user: {
      email: '',
      first: '',
      last: '',
      type: '',
      ticketsBooked: []
    },
    login: false
  };

  componentDidMount() {
    fetchProfile().then(user => {
      if (user) {
        this.setState({
          user: user,
          login: true,
        })
      } else {
        this.props.history.push('/')
      }
    });
  }

  render() {
    return (
        <>
          <HeaderComponent
              login={this.state.login}
              history={this.props.history}
              user={this.state.user}
          />
          <div className="container container-background confirm-center">
            <div className='row mt-5 ml-2'>
              <h4 className="mt-3 mb-0">
                Your booking was successful, a mail will be sent
                to {this.state.user.email}. We wish you a safe and wonderful
                flight!!
              </h4>
            </div>
            <hr/>
            <div className="row">
              <div className="col pb-3">
                <button className="btn btn-primary"
                        onClick={() => this.props.history.push('/search')}
                >Book another ticket
                </button>
                <button className="btn btn-primary float-right"
                        onclose={() => this.props.history.push(
                            '/user-dashboard')}
                >Back home
                </button>
              </div>
            </div>
          </div>
        </>
    )
  }
}
