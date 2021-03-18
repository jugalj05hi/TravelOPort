import React from "react";

const Pagination = ({flightsPerPage, totalFlights, paginate}) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalFlights / flightsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
      <div className="row">
        <div className="col">
          <nav >
            <ul className="pagination">
              {pageNumbers.map(number => (
                  <li key={number}
                      className="page-item">
                    <a className="page-link mouse-over"
                       onClick={() => paginate(number)}
                    >{number}</a>
                  </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
  )
};

export default Pagination
