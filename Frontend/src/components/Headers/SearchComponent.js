import React from "react";
import Autocomplete from "../Others/AutocompleteComponent";

class SearchComponent extends React.Component {

  state = {
    origin: this.props.origin,
    destination: this.props.destination,
    adults: this.props.adults,
    startDate: this.props.startDate
  };

  componentDidMount() {
    if (this.props.origin) {
      const origin = this.props.origin;
      const destination = this.props.destination;
      const adults = this.props.adults;
      const date = this.props.startDate;
      this.setState({
        origin: origin,
        destination: destination,
        adults: adults,
        startDate: date
      });
    }
  }

  handleOriginChange = (value) => {
    if (value == "null") {
      this.setState({
        origin: ""
      })
    } else {
      this.setState({
        origin: value
      })
    }
  };

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

  handleAdultsChange = (e) => {
    this.setState({
      adults: e.target.value
    })
  };

  handleDateChange = (e) => {
    this.setState({
      startDate: e.target.value
    })
  };

  onClickSuggestion = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      origin: e.currentTarget.innerText
    });
  };

  search = (e) => {
    e.preventDefault();
    let origin;
    let destination;
    if (this.state.origin && !(/^\s*$/.test(this.state.origin))) {
      origin = this.state.origin.split("-", 2);
    }
    if (this.state.destination && !(/^\s*$/.test(this.state.destination))) {
      destination = this.state.destination.split("-", 2);
    }
    let adults = this.state.adults;
    let startDate = this.state.startDate;
    if (origin && destination && adults && startDate) {
      this.props.loadSpinner();
      if (origin[1] && destination[1]) {
        this.props.history.push(
            `/search/dashboard/${origin[1].trim()}/${destination[1].trim()}/${this.state.adults}/${this.state.startDate}`)
      } else if (origin[0] && destination[1]) {
        this.props.history.push(
            `/search/dashboard/${origin[0]}/${destination[1].trim()}/${this.state.adults}/${this.state.startDate}`)
      } else if (origin[1] && destination[0]) {
        this.props.history.push(
            `/search/dashboard/${origin[1].trim()}/${destination[0]}/${this.state.adults}/${this.state.startDate}`)
      } else {
        this.props.history.push(
            `/search/dashboard/${this.state.origin}/${this.state.destination}/${this.state.adults}/${this.state.startDate}`)
      }
    } else {
      alert("All fields are mandatory!!")
    }
  };

  render() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let minDate = `${year}-0${month}-${day}`;

    return (
        <>

          <div className="row pt-3">
            <div className="col">
              <h3>Search</h3>
              <p>Wanna-get-away prices to almost anywhere in the world. Found a
                lower price elsewhere? No problem, we will match it. What are
                you waiting for? Get going? Begin your search now.</p>
            </div>
          </div>
          <hr/>
          <div className="row mr-3 ml-3 pb-4">
            <div className="col-lg-3">
              <label htmlFor="origin">Origin</label>
              { /*<input id="origin"
                   className="form-control"
                   type="text"
                   value={this.state.origin}
                   onChange={this.handleOriginChange}
                   required
            />*/}
              <Autocomplete
                  suggestions={[]}
                  onDataChange={this.handleOriginChange}
                  dataValue={this.props.origin}
              />
            </div>
            <div className="col-lg-4">
              <label htmlFor="destination">Destination</label>

              <Autocomplete
                  suggestions={[]}
                  onDataChange={this.handleDestChange}
                  dataValue={this.props.destination}
              />
            </div>
            <div className="col-lg-3">
              <label htmlFor="start">Start Date</label>
              <input type="date"
                     id="start"
                     className="form-control"
                     value={this.state.startDate}
                     onChange={this.handleDateChange}
                     min={minDate}
              />
            </div>
            <div className="col-lg-1">
              <label htmlFor="start">Adults</label>
              <input type="number"
                     id="adults"
                     className="form-control"
                     value={this.state.adults}
                     onChange={this.handleAdultsChange}
                     min="1"
                     max="5"
              /></div>
            <div className="col-lg-1 pt-2">
              {/* <div className="search-spacer"/> */}
              <button
                  className="btn btn-primary mt-4"
                  onClick={this.search}>Search
              </button>
            </div>
          </div>
        </>
    )
  }
}

export default SearchComponent
