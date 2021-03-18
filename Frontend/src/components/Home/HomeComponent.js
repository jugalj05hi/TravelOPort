import React from "react";
import Background from '../../images/home.jpg';
import './home-styles.css'
import {RegistrationModalComponent} from "../Register/RegistrationModalComponent";
import LoginModalComponent from "../Login/LoginModalComponent";
import {fetchProfile} from "../../services/services";
import {Pulse} from "react-reveal";

export default class HomeComponent extends React.Component {

  componentDidMount() {
    fetchProfile().then(user => {
      if (user) {
        this.props.history.push('/user-dashboard')
      }
    })
  }

  render() {
    return (
        <div className="backdrop"
             style={{backgroundImage: `url(${Background})`}}>
          <div className="row">
            <div className="col text-right">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <button className="nav-link btn btn-link"
                          data-toggle="modal"
                          data-target="#loginModal">Login
                  </button>
                </li>
                <LoginModalComponent
                    history={this.props.history}
                />
                <li className="nav-item">
                  <button className="nav-link btn btn-link"
                          data-toggle="modal"
                          data-target="#registrationModal">Register
                  </button>
                </li>
                <RegistrationModalComponent
                    history={this.props.history}
                />
                <li className="nav-item">
                  <button className="nav-link btn btn-link"
                          onClick={() => this.props.history.push('/dashboard')}
                  >About Us
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link"
                          onClick={() => this.props.history.push(
                              '/privacy')}
                  >Privacy
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="row search-btn">
            <div className="col">
                <button className="btn btn-warning font"
                        onClick={() => this.props.history.push('/dashboard')}>
                  Explore
                </button>
            </div>
          </div>
        </div>
    )
  }
}
