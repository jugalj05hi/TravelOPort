import React from "react";
import HeaderComponent from "../Headers/HeaderComponent";
import {fetchProfile, searchHotels} from "../../services/services";
import Loader from "../../images/loader2.gif";
import HotelContentComponent from "./HotelContentComponent";
import AutocompleteComponentHotel from "../Others/AutocompleteComponentHotel";

export default class HotelComponent extends React.Component {

  state = {
    user: {
      email: '',
      first: '',
      last: '',
      type: '',
      ticketsBooked: []
    },
    login: false,
    loading: false,
    destination: '',
    hotels: [],
    results: ''
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
    if (this.props.destination) {
      this.setState({
        destination: this.props.destination,
        loading: true
      }, () => {
        searchHotels(this.props.destination).then(r => {
          if (r) {
            this.setState({
              hotels: r,
              loading: false,
              results: true
            })
          } else {
            this.setState({
              loading: false,
              results: false
            })
          }
        })
      })
    }
  }

  handleDestChange = (value) => {
    if (value == "null") {
      this.setState({
        destination: ""
      })
    } else {
      this.setState({
        destination: value
      })
    }
  };

  loadSpinner = () => {
    this.setState({
      loading: true
    })
  };

  search = () => {
    let destination;
    if (this.state.destination) {
      destination = this.state.destination.split("-", 2);
    }
    if (destination && destination[1]) {
      this.props.history.push(`/search/hotels/${destination[1].trim()}`)
    } else {
      this.props.history.push(`/search/hotels/${this.state.destination}`)
    }
  };

  render() {
    return (
        <>
          <HeaderComponent
              history={this.props.history}
              login={this.state.login}
              user={this.state.user}
          />
          <div className='container container-background'>
            <div className="row pt-3">
              <div className='col'>
                <h4>Search for Hotels</h4>
                <p>There ain't no place like home, but there ain't place like
                  a magnificent hotel either. Get the best
                  rates for your stay with our hand picked hotels with
                  guaranteed satisfaction.</p>
              </div>
            </div>
            <hr/>
            <div className='row pb-3'>
              <div className='col-lg-10 pt-3'>
                <AutocompleteComponentHotel
                    suggestions={[]}
                    onDataChange={this.handleDestChange}
                    dataValue={this.props.destination}
                />
              </div>
              <div className='col-lg-2 pt-3'>
                <button className='btn btn-success btn-block'
                        onClick={this.search}
                >Search
                </button>
              </div>
            </div>
            <div className='row mt-3 pb-3'>
              {
                this.state.loading &&
                <div className="col">
                  <img src={Loader} alt="Loading..."
                       className="custom-align"/>
                </div>
              }
              {
                (!this.state.loading && this.state.hotels.length !== 0) &&
                <HotelContentComponent
                    results={this.state.results}
                    hotels={this.state.hotels}
                    login={this.state.login}
                    history={this.props.history}
                />
              }
            </div>
          </div>
        </>
    )
  }
}
