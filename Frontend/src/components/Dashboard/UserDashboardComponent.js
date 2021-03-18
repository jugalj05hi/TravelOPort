import React from "react";
import HeaderComponent from "../Headers/HeaderComponent";
import hotel from '../../images/hotel.jpg'
import flights from '../../images/flight.jpg'
import currency from '../../images/currency.jpg'
import {Carousal} from "./Carousal";
import {fetchProfile} from "../../services/services";
import './dashboard-styles.css';

export default class UserDashboardComponent extends React.Component {

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
      } else {
        this.props.history.push('/')
      }
    })
  }

  render() {
    return (
        <>
          <HeaderComponent
              user={this.state.user}
              login={this.state.login}
              history={this.props.history}
          />
          <div className='container container-background'>
            <div className='row'>
              <Carousal/>
            </div>
            <div className='row mt-3 pb-3'>
              <div className='col-md-4 col-sm-12 mb-3'>
                <div className="card">
                  <img className="card-img-top"
                       src={flights}
                       alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Book Flights</h5>
                    <p className="card-text">Wanna-get-away prices to almost
                      anywhere in the world.
                      Found a lower price elsewhere? No problem, we will match
                      it. What are you waiting for? Get going? Get going and
                      take it to the skies.</p>
                    <button className="btn btn-primary"
                            onClick={() => this.props.history.push('/search')}>
                      To the skies
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-md-4 col-sm-12 mb-3'>
                <div className="card">
                  <img className="card-img-top"
                       src={hotel}
                       alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Search Hotels</h5>
                    <p align="justify" className="card-text">
                      There ain't no place like home, but there ain't place like
                      a magnificent hotel either. Get the best
                      rates for your stay with our hand picked hotels with
                      guaranteed satisfaction.
                    </p>
                    <a href="/search/hotels"
                       className="btn btn-primary">
                      To the heavens</a>
                  </div>
                </div>
              </div>
              <div className='col-md-4 col-sm-12 mb-3'>
                <div className="card">
                  <img className="card-img-top"
                       src={currency}
                       alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Currency Rates</h5>
                    <p align="justify"
                       className="card-text">Flights done!
                      Hotels done! Are you forgetting something?
                      Money! Who doesn't want it? Well we can give you the exact
                      rates for the Foreign Exchange to help you plan
                      your travel with ease.
                    </p>
                    <a href="/currency" className="btn btn-primary">Show me the
                      money</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
  }
}
