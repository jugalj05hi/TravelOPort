import React from "react";
import {bookTicket, fetchProfile} from "../../../services/services";
import HeaderComponent from "../../Headers/HeaderComponent";
import PassengerDetailsComponent from "./PassengerDetailsComponent";

export default class FlightDetailComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flight: "",
      user: {
        email: '',
        first: '',
        last: '',
        type: '',
        ticketsBooked: []
      },
      login: false,
      error: false,
      passengers: []
    }
  }

  componentDidMount() {
    let passengers = [];
    for (let i = 0; i < this.props.adults; i++) {
      passengers.push({id: i, first: "", last: "", sex: "", age: ""})
    }
    fetchProfile().then(user => {
      if (user) {
        let data = JSON.parse(localStorage.getItem('flight'));
        this.setState({
          flight: data,
          user: user,
          login: true,
          passengers: passengers
        })
      } else {
        this.props.history.push('/')
      }
    });
  }

  //TODO updating newly added passenger does not work :((
  handleCheck = (e) => {
    if (e.target.checked) {
      let passengers = JSON.parse(JSON.stringify(this.state.passengers));
      let updatedPassengers = passengers.filter(p => (p.id !== 0));
      this.setState({
        passengers: updatedPassengers
      }, () => {
        let user = {
          id: 0,
          first: this.state.user.first,
          last: this.state.user.last,
          sex: "",
          age: ""
        };
        updatedPassengers.push(user);
        this.setState({
          passengers: updatedPassengers
        })
      })
    } else {
      let passengers = JSON.parse(JSON.stringify(this.state.passengers));
      let updatedPassengers = passengers.filter(p => (p.id !== 0));
      this.setState({
        passengers: updatedPassengers
      }, () => {
        let user = {
          id: 0,
          first: "",
          last: "",
          sex: "",
          age: ""
        };
        updatedPassengers.push(user);
        this.setState({
          passengers: updatedPassengers
        })
      });
    }
  };

  handlePassengerChange = (passenger) => {
    let passengers = JSON.parse(JSON.stringify(this.state.passengers));
    let updatedPassengers = passengers.filter(p => (p.id !== passenger.id));
    updatedPassengers = [...updatedPassengers, passenger];
    this.setState({
      passengers: updatedPassengers
    })
  };

  validateDetails = () => {
    let isValid = false;
    this.state.passengers.forEach(p => {
      for (let key in p) {
        if (p[key] !== null && p[key] !== "") {
          isValid = true;
        } else {
          isValid = false;
        }
      }
    });
    return isValid;
  };

  confirmReservation = (details, data) => {
    const bookingDetails = {...details, ...data};
    bookingDetails.passengers = this.state.passengers;
    bookingDetails.id = (new Date).getTime();
    // console.log(bookingDetails)
    if (this.validateDetails()) {
      this.setState({
        user: {
          ...this.state.user,
          ticketsBooked: [...this.state.user.ticketsBooked, bookingDetails]
        }
      }, () => {
        bookTicket(this.state.user).then(r => {
          this.props.history.push('/confirmation')
        })
      });
    } else {
      this.setState({
        error: true
      })
    }
  };

  render() {

    let {id, itineraries, instantTicketingRequired, price, pricingOptions, source, travelerPricings, validatingAirlineCodes, ...details} = this.state.flight;
    let data = {};
    let flight = JSON.parse((localStorage.getItem('flight')));
    let oneWay = 'No';
    if (flight.oneWay) {
      oneWay = 'Yes'
    }

    return (
        <div>
          <HeaderComponent
              login={this.state.login}
              history={this.props.history}
              user={this.state.user}
          />
          <div className="container container-background">
            <div className='row'>
              <h5 className='ml-3 mt-3'>User Details</h5>
            </div>
            <div className="row">
              <table className="table table-bordered mr-3 ml-3">
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Type</th>
                </tr>
                <tbody>
                <tr>
                  <td>{this.state.user.first}</td>
                  <td>{this.state.user.last}</td>
                  <td>{this.state.user.email}</td>
                  <td>{this.state.user.type}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className='row'>
              <h5 className='ml-3 '>Flight Details</h5>
            </div>
            <hr/>
            <div className="row">
              <h3 className='ml-3'>
                {flight.itineraries && flight.itineraries.map(
                    iti => iti.segments[0].carrierCode)}
              </h3>
            </div>
            <div className='row'>
              <div className='container'>
                <div className='table-responsive'>
                  <table className="table table-bordered mr-3 p-3">
                    <tr>
                      <th scope="col">Departure</th>
                      <th scope="col">Departure Time (Local)</th>
                      <th scope="col">Arrival</th>
                      <th scope="col">Arrival Time (Local)</th>
                    </tr>
                    <tbody>
                    <tr>
                      <td scope="row">
                        {flight.itineraries.map(iti =>
                            iti.segments.map(seg => {
                                  data.departure = seg.departure.airportName;
                                  data.depCity = seg.departure.city;
                                  return <div className="mb-2">
                                    <span>{seg.departure.airportName}, {seg.departure.city}</span>
                                  </div>
                                }
                            ))}
                      </td>
                      <td>
                        {flight.itineraries.map(iti =>
                            iti.segments.map(seg => {
                                  data.depTime = seg.departure.at;
                                  return <div className="mb-2">
                                    <span>{seg.departure.at}</span>
                                  </div>
                                }
                            ))}
                      </td>
                      <td>
                        {flight.itineraries.map(iti =>
                            iti.segments.map(seg => {
                                  data.arrival = seg.arrival.airportName;
                                  data.arrivalCity = seg.arrival.city;
                                  return <div className="mb-2">
                                    <span>{seg.arrival.airportName}, {seg.arrival.city}</span>
                                  </div>
                                }
                            ))}
                      </td>
                      <td>
                        {flight.itineraries.map(iti =>
                            iti.segments.map(seg => {
                                  data.arrivalTime = seg.arrival.at;
                                  return <div className="mb-2">
                                    <span>{seg.arrival.at}</span>
                                  </div>
                                }
                            ))}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Book by</th>
                      {this.state.user.type === "AGENT" &&
                      <>
                        <th>No. of Seats Available</th>
                        <th>One-way</th>
                      </>
                      }
                      {this.state.user.type !== "AGENT" &&
                      <th colSpan="2">One-way</th>}
                      <th>Passengers</th>
                    </tr>
                    <tr>
                      <td scope="row">{flight.lastTicketingDate}</td>
                      {this.state.user.type === "AGENT" &&
                      <>
                        <td>{details.numberOfBookableSeats}</td>
                        <td>{oneWay}</td>
                      </>
                      }
                      {this.state.user.type !== "AGENT" &&
                      <td colSpan="2">{oneWay}</td>}
                      <td>{this.props.adults}</td>
                    </tr>
                    <tr>
                      <th scope="row">Duration</th>
                      <th>Cabin Class</th>
                      <th>Baggage</th>
                      <th>Price (inclusive of taxes)</th>
                    </tr>
                    <tr>
                      <td scope="row">
                        {flight.itineraries.map(iti => {
                          data.duration = iti.duration
                          return iti.duration
                        })}
                      </td>
                      <td>Economy</td>
                      <td>Check-in</td>
                      <td>$ {flight.price.total}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col mb-2">
                <h4 className=''>Enter passenger details</h4>
                <span className="color-red font-italic mb-2">**(Please enter all passengers details)</span>
                {/* <label style={{"font-weight": "100"}}>
                  <input type="checkbox" name="include"
                         onChange={(e) => this.handleCheck(e)}/> I am
                  travelling.</label>
                <span className="color-red font-italic">**(Check to add your details as traveller)</span>*/}
              </div>
            </div>

            {this.state.passengers.map(
                (passenger, index) => <PassengerDetailsComponent
                    index={index}
                    passenger={passenger}
                    handlePassengerChange={this.handlePassengerChange}
                />)}

            {this.state.error &&
            <div className="alert alert-danger"
                 role="alert">
              Please fill out all the passenger details!
            </div>}

            <div className='row pb-3'>
              <div className='col-12'>
                <button className='btn btn-dark float-right'
                        onClick={() => this.confirmReservation(details, data)}
                >Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
