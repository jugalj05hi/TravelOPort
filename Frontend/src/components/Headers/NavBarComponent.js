import React from "react";
import logo from "../../images/logo.png"
import './header-styles.css'
import {RegistrationModalComponent} from "../Register/RegistrationModalComponent";
import LoginModalComponent from "../Login/LoginModalComponent";
import {logoutUser} from "../../services/services";

export default class NavBarComponent extends React.Component {

  logout = () => {
    logoutUser().then(response => {
      this.props.history.push('/')
    })
  };

  render() {

    let pathVariable = '';
    if (this.props.login) {
      pathVariable = 'user-dashboard'
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand"
             href="#"
             onClick={() => this.props.history.push(`/${pathVariable}`)}
          >
            <img src={logo}
                 style={{"height": "40px"}}
                 alt="logo"/>
          </a>
          <div className="spacer"/>
          {!this.props.login &&
          <>
            <div className="mr-2">
              <button className="btn btn-secondary"
                      data-toggle="modal"
                      data-target="#registrationModal">Register
              </button>
            </div>
            <RegistrationModalComponent
                history={this.props.history}
            />
            <div>
              <button className="btn btn-light"
                      data-toggle="modal"
                      data-target="#loginModal">Login
              </button>
            </div>
            <LoginModalComponent
                history={this.props.history}
            />
          </>}
          {this.props.login &&
          <div className='color-white d-none d-md-block'>
            <div className="btn-group" style={{"width": "max-content"}}>
              <button type="button"
                      className="btn btn-transparent color-white profile-name"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
              >
                Hi {this.props.user.first}! <i className="fas fa-caret-down"/>
              </button>
              <div className="dropdown-menu">
                {this.props.user.type === "ADMIN" &&
                <a className="dropdown-item drop admin" href="#"
                   onClick={() => this.props.history.push(
                       '/admin')}
                ><i className="fas fa-user-shield"/> Admin</a>
                }
                <a className="dropdown-item drop currency" href="#"
                   onClick={() => this.props.history.push(
                       '/currency')}
                ><i className="fas fa-coins"/> Currency</a>
                <a className="dropdown-item drop flights" href="#"
                   onClick={() => this.props.history.push(
                       '/search')}
                ><i className="fas fa-plane-departure"/> Book Flights</a>
                <a className="dropdown-item drop home" href="#"
                   onClick={() => this.props.history.push(
                       '/')}
                ><i className="fas fa-home"/> Home</a>
                <a className="dropdown-item drop hotels" href="#"
                   onClick={() => this.props.history.push(
                       '/search/hotels')}
                ><i className="fas fa-hotel"/> Hotels</a>

                <a className="dropdown-item drop profile" href="#"
                   onClick={() => this.props.history.push('/profile')}>
                  <i className="fas fa-user"/> Profile</a>

                <a className="dropdown-item drop" href="#"
                   onClick={() => this.props.history.push(
                       '/privacy')}
                ><i className="fas fa-user-secret"/> Privacy</a>
                <a className="dropdown-item drop logout" href="#"
                   onClick={this.logout}><i className="fas fa-power-off"/> Logout</a>
              </div>
            </div>
          </div>
          }
        </nav>
    )
  }
}
