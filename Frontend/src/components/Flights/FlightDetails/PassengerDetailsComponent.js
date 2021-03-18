import React from "react";

export default class PassengerDetailsComponent extends React.Component {

  state = {
    passenger: this.props.passenger
  };

  render() {
    return (
        <div className="form-group">
          <div className="row pl-3 mb-0">
            <h5>Passenger {this.props.index + 1}</h5>
          </div>
          <hr/>
          <div className="row">
            <div className="col-2 mb-2 d-flex">
              First <span className="d-none d-md-block">&nbsp;Name</span>
            </div>
            <div className="col-10 mb-2">
              <input className="form-control"
                     value={this.state.passenger.first}
                     onChange={(e) => this.setState({
                       passenger: {
                         ...this.state.passenger,
                         first: e.target.value
                       }
                     }, () => this.props.handlePassengerChange(
                         this.state.passenger))}/>
            </div>
          </div>
          <div className="row">
            <div className="col-2 mb-2 d-flex">
              Last <span className="d-none d-md-block">&nbsp;Name</span>
            </div>
            <div className="col-10 mb-2">
              <input className="form-control"
                     value={this.state.passenger.last}
                     onChange={(e) => this.setState({
                       passenger: {
                         ...this.state.passenger,
                         last: e.target.value
                       }
                     }, () => this.props.handlePassengerChange(
                         this.state.passenger))}/>
            </div>
          </div>
          <div className="row">
            <div className="col-2 mb-2">
              Gender
            </div>
            <div className="col-10 mb-2">
              <select className="form-control"
                      value={"M"}
                      onChange={(e) => this.setState({
                        passenger: {
                          ...this.state.passenger,
                          sex: e.target.value
                        }
                      }, () => this.props.handlePassengerChange(
                          this.state.passenger))}>
                <option className="form-control" value="M">Male</option>
                <option className="form-control" value="F">Female</option>
                <option className="form-control" value="O">Other</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-2 mb-2">
              Age
            </div>
            <div className="col-10 mb-2">
              <input className="form-control"
                     type="number"
                     value={this.state.passenger.age}
                     onChange={(e) => this.setState({
                       passenger: {
                         ...this.state.passenger,
                         age: e.target.value
                       }
                     }, () => this.props.handlePassengerChange(
                         this.state.passenger))}/>
            </div>
          </div>
          <hr/>
        </div>
    )
  }
}
