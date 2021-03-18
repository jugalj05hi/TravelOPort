import React from "react";

const TicketsModal = ({id, tickets}) =>

    <>
      <button type="button" className="btn btn-primary" data-toggle="modal"
              data-target={`#${id}_tickets`}>
        View Tickets
      </button>

      <div className="modal fade bd-example-modal-xl"
           id={`${id}_tickets`}
           tabIndex="-1"
           role="dialog"
           aria-labelledby="TicketsModalTitleDiv"
           aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl"
             role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"
                  id="TicketsModalTitle"
                  style={{"color": "black"}}>
                Flight Details
              </h5>
              <button type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col table-responsive">
                  {tickets.length !== 0 && <table className="table table-dark">
                    <thead className="thead-light">
                    <tr>
                      <th scope="col">Airlines</th>
                      <th scope="col">Departure</th>
                      <th scope="col">Time</th>
                      <th scope="col">Arrival</th>
                      <th scope="col">Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map(x =>
                        <tr>
                          <th scope="row">{x.carrier}</th>
                          <td>{x.departure}, {x.depCity}</td>
                          <td>{x.depTime}</td>
                          <td>{x.arrival}, {x.arrivalCity}</td>
                          <td>{x.arrivalTime}</td>
                        </tr>)}
                    </tbody>
                  </table>}
                  {tickets.length === 0 &&
                  <h5 style={{"color": "black"}}>No booking history...</h5>
                  }
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary"
                      data-dismiss="modal">Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>;

export default TicketsModal
