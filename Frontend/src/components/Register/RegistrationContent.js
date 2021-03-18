import React from "react";
import {registerUser} from "../../services/services";
import crypto from 'crypto-js'

class RegistrationContent extends React.Component {

  state = {
    user: {
      first: "",
      last: "",
      email: "",
      type: "USER",
      password: ""
    },
    confirmPassword: "",
    match: "",
    exists: ""
  };

  handlePassword = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        password: e.target.value
      }
    }, () => this.validatePassword())
  };

  handleConfirmPassword = (e) => {

    this.setState({
      confirmPassword: e.target.value
    }, () => this.validatePassword())
  };

  validatePassword = () => {
    if (!(/^\s*$/.test(this.state.user.password)) && this.state.user.password
        === this.state.confirmPassword) {
      this.setState({
        match: true
      })
    } else {
      this.setState({
        match: false
      })
    }
  };

  validate = () => {
    return (this.state.user.first && this.state.user.last
        && this.state.user.email && this.state.user.password);
  };

  // TODO Decryption
  decryptPassword = (encryptedPassword) => {
    /*let bytes = crypto.AES.decrypt(encryptedPassword, 'DEFcon777');
    let decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
    console.log('decryptedData',decryptedData)*/
  };

  register = (e) => {
    e.preventDefault();
    let encryptedPassword = crypto.AES.encrypt(
        JSON.stringify(this.state.user.password), 'DEFcon777').toString();
    if (this.validate()) {
      this.setState({
        user: {
          ...this.state.user,
          password: encryptedPassword
        }
      }, async () => {
        const user = await registerUser(this.state.user);
        if (user) {
          window.$('#registrationModal').modal('toggle');
          this.props.history.push('/user-dashboard')
        } else {
          this.setState({
            user: {
              ...this.state.user,
              password: ""
            },
            confirmPassword: "",
            match: false,
            exists: true
          })
        }
      });
    } else {
      alert('All fields are mandatory!!')
    }
  };

  render() {

    return (
        <form className="wbdv-dtl">
          <div className="form-group row">
            <label htmlFor="first"
                   className="col-sm-2 col-form-label text-left">
              First </label>
            <div className="col-sm-10">
              <input className="form-control"
                     type="text"
                     id="first"
                     placeholder="first name"
                     value={this.state.user.first}
                     onChange={(e) =>
                         this.setState({
                           user: {
                             ...this.state.user,
                             first: e.target.value
                           }
                         })}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="last"
                   className="col-sm-2 col-form-label text-left">
              Last </label>
            <div className="col-sm-10">
              <input className="form-control"
                     id="last"
                     type="text"
                     placeholder="last name"
                     value={this.state.user.last}
                     onChange={(e) => this.setState({
                       user: {
                         ...this.state.user,
                         last: e.target.value
                       }
                     })}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email"
                   className="col-sm-2 col-form-label text-left">
              Email </label>
            <div className="col-sm-10">
              <input className="form-control"
                     id="email"
                     type="email"
                     required
                     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                     placeholder="someone@something.com"
                     value={this.state.user.email}
                     onChange={(e) => this.setState({
                       user: {
                         ...this.state.user,
                         email: e.target.value
                       }
                     })}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="type"
                   className="col-sm-2 col-form-label text-left">
              Type </label>
            <div className="col-sm-10">
              <select className="form-control"
                      id="type"
                      placeholder="someone@something.com"
                      value={this.state.user.type}
                      onChange={(e) => this.setState({
                        user: {
                          ...this.state.user,
                          type: e.target.value
                        }
                      })}>
                <option className="form-control"
                        value="USER">User
                </option>
                <option className="form-control"
                        value="AGENT">Agent
                </option>
                {/*<option className="form-control"
                        value="ADMIN">Admin
                </option>*/}
              </select>
             {/* <p className='mb-0' style={{"fontSize": "0.7rem"}}>Agent types
                will require admin approvals and may take some time. <br/>
                Admin types will require approval from present admin.
              </p>*/}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password"
                   className="col-sm-2 col-form-label text-left">
              Password </label>
            <div className="col-sm-10">
              <input type="password"
                     className="form-control"
                     id="password"
                     placeholder="password"
                     value={this.state.user.password}
                     onChange={this.handlePassword}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password"
                   className="col-sm-2 col-form-label text-left">
              Verify Password </label>
            <div className="col-sm-10">
              <input type="password"
                     className="form-control"
                     id="verifyPassword"
                     placeholder="retype password"
                     value={this.state.confirmPassword}
                     onChange={this.handleConfirmPassword}
              />
              {this.state.match && this.state.match !== "" &&
              <p className="color-green mb-0">passwords match!!</p>
              }
            {!this.state.match && this.state.match !== "" &&
              <p className="red mb-0">passwords do not match!!</p>
            }
            </div>
          </div>

          {this.state.exists &&
          <div className="form-group row pl-3 pr-3 pt-1 text-left">
            <div className="col-sm-12 error pt-2 pb-2">
              <span>User Already Exists!!</span>
            </div>
          </div>}

          <div className="form-group row">
            <div className="col-sm-12">
              <button
                  className="btn btn-success btn-block"
                  onClick={this.register}
                  disabled={!this.state.match}>
                Register
              </button>
              <p className="red mb-0" style={{"fontSize": "0.7rem"}}>*All fields
                are mandatory</p>
            </div>
          </div>
        </form>
    )
  }
}

export default RegistrationContent
