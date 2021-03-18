import React from "react";
import {loginUser} from "../../services/services";
import crypto from "crypto-js";

export default class LoginModalContent extends React.Component {
  state = {
    user: {
      email: "",
      password: ""
    },
    incorrectPassword: false,
    allFields: false
  };

  login = (e) => {
    e.preventDefault();
    if (this.state.user.email && this.state.user.password) {
      let encryptedPassword = crypto.AES.encrypt(
          JSON.stringify(this.state.user.password), 'DEFcon777').toString();
      this.setState({
        user: {
          ...this.state.user,
          password: encryptedPassword
        }
      }, async () => {
        const user = await loginUser(this.state.user)
        if (user) {
          this.setState({
            incorrectPassword: false,
            allFields: false
          }, () => {
            window.$('#loginModal').modal('toggle');
            this.props.history.push('/user-dashboard')
          });
        } else {
          this.setState({
            incorrectPassword: true
          })
        }
      })
    } else {
      this.setState({
        allFields: true
      })
    }
  };

  render() {
    return (
        <form className="wbdv-dtl">
          <div className="form-group row">
            <label htmlFor="email"
                   className="col-sm-2 col-form-label text-left">
              Email </label>
            <div className="col-sm-10">
              <input className="form-control"
                     id="loginUsername"
                     type="email"
                     placeholder="someone"
                     value={this.state.email}
                     onChange={(e) =>
                         this.setState({
                           user: {
                             ...this.state.user,
                             email: e.target.value
                           }
                         })}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password </label>
            <div className="col-sm-10">
              <input type="password"
                     className="form-control"
                     id="loginPassword"
                     placeholder="password"
                     value={this.state.password}
                     onChange={(e) =>
                         this.setState({
                           user: {
                             ...this.state.user,
                             password: e.target.value
                           }
                         })}
              />
            </div>
          </div>

          {this.state.incorrectPassword &&
          <div className="form-group row pl-3 pr-3 pt-1 text-left">
            <div className="col-sm-12 error pt-2 pb-2">
              <span>Incorrect email or password!!</span>
            </div>
          </div>}

          {this.state.allFields &&
          <div className="form-group row pl-3 pr-3 pt-1 ">
            <div className="col-sm-12 error pt-2 pb-2 text-left">
              <span>All fields are required!</span>
            </div>
          </div>}

          <div className="form-group row">
            <div className="col-sm-12">
              <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  formAction=""
                  onClick={this.login}
              >
                Sign in
              </button>
              {/*<div className="row">
                <div className="col text-right">
                  <a href="#">Forgot Password?</a>
                </div>
              </div>*/}
            </div>
          </div>
        </form>
    )
  }
}

