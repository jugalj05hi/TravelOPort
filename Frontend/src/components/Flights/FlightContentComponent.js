import React, {useState} from "react";
import Pagination from "../Others/Pagination";

const FlightContentComponent = ({flights, login, history, origin, destination, adults, startDate}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage, setFlightsPerPage] = useState(5);

  //Get current flights
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const book = (flight, data) => {
    localStorage.setItem("flight", JSON.stringify(flight));
    history.push(
        `/flight-details/${origin}/${destination}/${adults}/${startDate}`)
  };

  return (
      <React.Fragment>
        <div className="row fix-height mb-3">
          <table className="table table-striped">
            <thead className="thead-dark">
            <tr>
              <th scope="col">Airlines</th>
              <th scope="col">Departure</th>
              <th scope="col">Dep Time</th>
              <th scope="col">Trip Time</th>
              <th scope="col">Arrival Time</th>
              <th scope="col">Arrival</th>
              <th scope="col">Fare</th>
              {login &&
              <th scope="col">Select</th>}
            </tr>
            </thead>
            <tbody>
            {currentFlights.map((flight, index) =>
                <tr key={index}>
                  <th scope="row">
                    {flight.itineraries && flight.itineraries.map(
                        iti =>
                            iti.segments.map(seg => {
                                  return <div className="mb-3">
                                    <span>{flight.carrier = seg.carrierCode}</span>
                                  </div>
                                }
                            ))}</th>
                  <td>
                    {flight.itineraries.map(iti =>
                        iti.segments.map(seg => {
                              return <div className="mb-3">
                                <span>{seg.departure.airportName}, {seg.departure.city}</span>
                              </div>
                            }
                        ))}
                  </td>
                  <td>
                    {flight.itineraries.map(iti =>
                        iti.segments.map(seg => {
                              return <div className="mb-3">
                                <span>{seg.departure.at}</span>
                              </div>
                            }
                        ))}
                  </td>
                  <td>{flight.itineraries.map(iti => {
                    return iti.duration
                  })}</td>
                  <td>
                    {flight.itineraries.map(iti =>
                        iti.segments.map(seg => {
                              return <div className="mb-3">
                                <span>{seg.arrival.at}</span>
                              </div>
                            }
                        ))}
                  </td>
                  <td>
                    {flight.itineraries.map(iti =>
                        iti.segments.map(seg => {
                              return <div className="mb-3">
                                <span>{seg.arrival.airportName}, {seg.arrival.city}</span>
                              </div>
                            }
                        ))}
                  </td>
                  <td>${flight.price.total}</td>
                  {login &&
                  <td>
                    <button className="btn btn-dark"
                            onClick={() => book(flight)}
                    >Book
                    </button>
                  </td>}
                </tr>
            )}
            </tbody>
          </table>
        </div>
        <Pagination
            flightsPerPage={flightsPerPage}
            totalFlights={flights.length}
            paginate={paginate}
        />
      </React.Fragment>
  )
};

export default FlightContentComponent
