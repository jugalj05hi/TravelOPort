import React from "react";
import './footer-styles.css'

export const FooterComponent = () =>

    <footer className="site-footer pr-0 pl-0">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">At TravelOPort we believe in giving
              users
              unadulterated results without any use of complex
              algorithm that would manipulate search results and show promoted
              content mixed with the results. We do not believe
              in tracking user activity on or off site to manipulate results.
              Our site is completely ad-free and have no
              underlying partnership with any airlines or any third party
              entity. </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li>
                <a href="/user-dashboard">Home</a></li>
              <li>
                <a href="/search">Book flights</a></li>
              <li>
                <a href="/currency">Convert Currency</a>
              </li>
              <li>
                <a href="/search/hotels">Search for hotels</a>
              </li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="/dashboard">About Us</a></li>
              <li><a href="/privacy">Contact Us</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2020 All Rights
              Reserved by
              <a href="#"> Team TravelOPort</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="#">
                <i className="fab fa-facebook-f"/></a></li>
              <li><a className="twitter" href="#">
                <i className="fab fa-twitter"/></a>
              </li>
              <li><a className="dribbble" href="#">
                <i className="fab fa-dribbble"/></a></li>
              <li><a className="linkedin" href="#">
                <i className="fab fa-linkedin"/></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>;
