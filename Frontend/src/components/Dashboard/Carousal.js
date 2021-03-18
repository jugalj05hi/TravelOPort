import React from "react";
import flights from "../../images/flight.jpg";
import currency from "../../images/currency.jpg";
import hotel from "../../images/hotel.jpg";

export const Carousal = () =>

    <div id="carouselExampleIndicators"
         className="carousel slide "
         data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0"
            className="active"/>
        <li data-target="#carouselExampleIndicators"
            data-slide-to="1"/>
        <li data-target="#carouselExampleIndicators"
            data-slide-to="2"/>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={flights} alt="..."
               className='image'/>
          <div className="carousel-caption d-none d-md-block"
               style={{'color': 'black'}}>
            <button className='btn btn-dark'>Book Flights</button>
            <p className="text-white">"Live with no excuses and travel with no
              regrets"~Oscar Wilde. Don't wait for the opportunity to arise,
              make that opportunity yourself. Go ahead and book the travel you
              always postponed.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={hotel} alt="..."
               className='image'/>
          <div className="carousel-caption d-none d-md-block">
            <button className='btn btn-light'>Search Hotels</button>
            <p className="">Better to see something once than hear about it a
              thousand times. Go and book your dream destination right away.</p>
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <img src={currency} alt="..."
             className='image'/>
        <div className="carousel-caption d-none d-md-block">
          <button className='btn btn-light'>Check Latest Currency Rates
          </button>
          <p>In today's fluctuating market, don't let the right prices go by.
            Check the the rates and get your foreign exchanges at the best
            rates.
          </p>
        </div>
      </div>
      <a className="carousel-control-prev"
         href="#carouselExampleIndicators"
         role="button"
         data-slide="prev">
                  <span className="carousel-control-prev-icon"
                        aria-hidden="true"/>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next"
         href="#carouselExampleIndicators"
         role="button"
         data-slide="next">
                  <span className="carousel-control-next-icon"
                        aria-hidden="true"/>
        <span className="sr-only">Next</span>
      </a>
    </div>;
