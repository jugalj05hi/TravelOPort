import React, {useState} from "react";
import Pagination from "../Others/Pagination";
import {AmenitiesModal} from "./AmenitiesModal";

const HotelContentComponent = ({results, hotels, login, history}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage, setHotelsPerPage] = useState(5);

  //Get current flights
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstFlight = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstFlight, indexOfLastHotel);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const book = (flight, data) => {
    localStorage.setItem("flight", JSON.stringify(flight));
    localStorage.setItem("data", JSON.stringify(data));
    history.push('/hotel-details')
  };

  let data = {
    duration: '',
    carrier: '',
    departure: '',
    depCity: '',
    depTime: '',
    arrival: '',
    arrivalCity: '',
    arrivalTime: '',
    price: ''
  };

  const phone = (hotel) => {
    if (hotel.hotel.contact) {
      return hotel.hotel.contact.phone
    } else {
      return 'Not Available'
    }
  };

  const fax = (hotel) => {
    if (hotel.hotel.contact) {
      return hotel.hotel.contact.fax
    } else {
      return 'Not Available'
    }
  };

  const rating = (hotel) => {
    if (hotel.hotel.rating || hotel.hotel.rating !== ' ') {
      return hotel.hotel.rating
    } else {
      return 'NA'
    }
  };

  return (
      <React.Fragment>
        {results && <div className='col table-responsive-sm'>
          <table className="table table-striped">
            <thead className="thead-dark tableFixHead">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Contact</th>
              <th scope="col">Amenities</th>
              <th scope="col">Rating</th>
              <th scope="col">Price</th>
              {/* {login &&
              <th scope="col">Select</th>}*/}
            </tr>
            </thead>
            <tbody>
            {currentHotels.map((hotel, index) =>
                <tr key={index}>
                  <th>{hotel.hotel.name}</th>
                  <td>{hotel.hotel.address.lines[0]},{hotel.hotel.address.cityName}</td>
                  <td>Phone: {phone(hotel)}
                    <br/> Fax: {fax(hotel)}</td>
                  <td>
                    <button className='btn btn-light'
                            data-toggle="modal"
                            data-target="#amenitiesModal"
                    >View Amenities
                    </button>
                    <AmenitiesModal
                        title={hotel.hotel.name}
                        amenities={hotel.hotel.amenities}
                    />
                  </td>
                  <td className="text-center">{rating(hotel)}</td>
                  <td>{hotel.offers[0].price.total} {hotel.offers[0].price.currency}</td>
                  {/* <td>
                    <button className='btn btn-dark'>Book</button>
                  </td>*/}
                </tr>
            )}
            <div className="pl-3 pt-3">
              <Pagination
                  flightsPerPage={hotelsPerPage}
                  totalFlights={hotels.length}
                  paginate={paginate}
              />
            </div>
            </tbody>
          </table>
        </div>
        }{
        !results &&
        <div className="row pt-3 pl-3">
          <div className="col">
            <h3>No results found...</h3>
          </div>
        </div>
      }
      </React.Fragment>
  )
};

export default HotelContentComponent
