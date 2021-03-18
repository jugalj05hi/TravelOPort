import React from "react";
import {fetchProfile, searchFlights} from "../../services/services";
import FlightContentComponent from "./FlightContentComponent";
import Loader from '../../images/loader2.gif'
import SearchComponent from "../Headers/SearchComponent";
import {AboutComponent} from "../Dashboard/AboutComponent";

class FlightComponent extends React.Component {

  state = {
    user: {
      email: '',
      first: '',
      last: '',
      type: '',
      ticketsBooked: []
    },
    flights: [],
    loading: false
  };

  componentDidMount() {
    fetchProfile().then(user => {
      if (user) {
        this.setState({
          user: user,
          login: true
        })
      }
    });
    const origin = this.props.origin;
    const destination = this.props.destination;
    const adults = this.props.adults;
    const date = this.props.date;
    if (origin && destination && adults && date) {
      this.setState({
        loading: true
      }, () => {
        searchFlights(origin, destination, adults, date).then(flights => {
          this.setState({
            flights: flights,
            loading: false
          })
        })
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.origin !== this.props.origin || (prevProps.destination
        !== this.props.destination) ||
        (prevProps.date !== this.props.date) || (prevProps.adults
            !== this.props.adults)
    ) {
      const origin = this.props.origin;
      const destination = this.props.destination;
      const adults = this.props.adults;
      const date = this.props.date;
      searchFlights(origin, destination, adults, date).then(flights => {
        this.setState({
          flights: flights,
          loading: false
        })
      })
    }
  }

  loadSpinner = () => {
    this.setState({
      loading: true
    })
  };

  render() {

    return (
        <div>
          {!this.props.login &&
          <AboutComponent/>
          }
          <SearchComponent
              history={this.props.history}
              loadSpinner={this.loadSpinner}
              origin={this.props.origin}
              destination={this.props.destination}
              adults={this.props.adults}
              startDate={this.props.date}
              login={this.props.login}
          />
          <div className="row mt-3 mr-3 ml-3">
            {
              this.state.loading &&
              <div className="col">
                <img src={Loader} alt="Loading..."
                     className="custom-align"/>
              </div>
            }
            {
              (!this.state.loading && this.state.flights.length !== 0) &&
              <FlightContentComponent
                  flights={this.state.flights}
                  login={this.props.login}
                  history={this.props.history}
                  origin={this.props.origin}
                  destination={this.props.destination}
                  adults={this.props.adults}
                  startDate={this.props.date}
              />
            }
          </div>
        </div>
    )
  }
}

export default FlightComponent

