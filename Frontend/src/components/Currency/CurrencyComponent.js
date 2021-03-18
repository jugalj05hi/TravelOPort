import React, {Component} from 'react';
import {
  convertCurrency,
  fetchCurrencyList,
  fetchProfile
} from '../../services/services';
import HeaderComponent from '../Headers/HeaderComponent';

export default class CurrencyComponent extends Component {

  state = {
    user: {
      email: '',
      first: '',
      last: '',
      type: '',
      ticketsBooked: []
    },
    login: false,
    currencyList: [],
    from: 'CAD',
    to: 'CAD',
    amount: 'none',
    convertedCurrency: ''
  };

  componentDidMount() {
    fetchProfile().then((user) => {
      if (user) {
        this.setState({
          user: user,
          login: true
        });
      } else {
        this.props.history.push('/')
      }
    });

    fetchCurrencyList().then((list) => {
      this.setState({currencyList: list});
    });
  }

  convertButton = () => {
    !this.state.amount ? alert("Please enter the amount") :
        this.state.from === this.state.to ? alert(
            "You have selected the same currency to convert.") :
            convertCurrency(this.state.from, this.state.to,
                Number(this.state.amount)).then((response) => {
                  this.setState({convertedCurrency: response})
                }
            );
  };

  render() {
    return (
        <>
          <HeaderComponent user={this.state.user}
                           login={this.state.login}
                           history={this.props.history}/>
          <div className="container container-background">
            <div className="row pt-3">
              <div className="col">
                <h4>Convert Currency</h4>
                <hr/>
                <p align="justify">Flights done!
                  Hotels done! Are you forgetting something?
                  Money! Who doesn't want it? Well can't give you money but
                  we can give you the exact
                  rates for the Foreign Exchange to help you plan
                  your travel with ease.
                </p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-3">
                <input type="number"
                       className="form-control"
                       placeholder="Convert From"
                       onChange={(e) => this.setState(
                           {amount: e.target.value})}/>
              </div>
              <div className="col-2">
                <select
                    className="form-control"
                    onChange={(e) => this.setState({from: e.target.value})}>
                  {Object.entries(this.state.currencyList).map(
                      ([key, value]) => (
                          <option value={key}>
                            {key}
                          </option>
                      ))}
                </select>
              </div>
              <div className="col-2 text-center">
                <i className="fa-2x fas fa-arrows-alt-h"/>
              </div>
              <div className="col-2">
                <select
                    className="form-control"
                    onChange={(e) => this.setState({to: e.target.value})}>
                  {Object.entries(this.state.currencyList).map(
                      ([key, value]) => (
                          <option value={key}>
                            {key}
                          </option>
                      ))}
                </select>
              </div>
              <div className="col-3">
                <input readOnly type="text"
                       className="form-control"
                       value={this.state.convertedCurrency}/>
              </div>
            </div>
            <div className="row pt-3 pb-3">
              <div className="col">
                <button className="btn btn-success btn-block"
                        onClick={this.convertButton}>
                  Convert
                </button>
              </div>
            </div>
          </div>
        </>
    );
  }
}
