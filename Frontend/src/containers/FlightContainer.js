import React from "react";
import './main-style.css'
import HeaderComponent from "../components/Headers/HeaderComponent";
import FlightComponent from "../components/Flights/FlightComponent";
import {fetchProfile} from "../services/services";
import {Fade} from "react-reveal";

export default class FlightContainer extends React.Component {

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
          login: true
        })
      }
    })
  }

  render() {

    return (

        <div>
          <HeaderComponent
              login={this.state.login}
              history={this.props.history}
              user={this.state.user}
          />
            <div className="container container-background">
              <FlightComponent
                  history={this.props.history}
                  origin={this.props.origin}
                  destination={this.props.destination}
                  adults={this.props.adults}
                  date={this.props.date}
                  user={this.state.user}
                  login={this.state.login}
              />
            </div>
        </div>

    )
  }
}

