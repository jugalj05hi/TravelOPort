import React from "react";

export const PassengerDetailsModal = ({index, passengers}) =>

    <>
      <button type="button" className="btn btn-primary" data-toggle="modal"
              data-target={`#passenger_${index}`}>
        View
      </button>
      <div className="modal fade"
           id={`passenger_${index}`} tabIndex="-1"
           role="dialog"
           aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered"
             role="document">
          <div className="modal-content">
            <div className="modal-header dark-theme">
              <h5 className="modal-title">
                Passenger Details
              </h5>
              <button type="button" className="close" data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row ml-3 mr-3">
                <table className="table table-hover table-bordered">
                  <thead className="thead-dark">
                  <tr>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Age</th>
                  </tr>
                  </thead>
                  <tbody>
                  {passengers.map(passenger => {
                    return <tr>
                      <th scope="row">{passenger.first}</th>
                      <td>{passenger.last}</td>
                      <td>{passenger.sex}</td>
                      <td>{passenger.age}</td>
                    </tr>
                  })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button"
                      className="btn btn-dark"
                      data-dismiss="modal">Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>;
