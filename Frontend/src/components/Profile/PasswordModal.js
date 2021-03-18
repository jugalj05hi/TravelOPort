import React from "react";

export default class PasswordModal extends React.Component {

  state = {
    password: "",
    confirmPassword: "",
    match: ''
  };

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    }, () => this.validatePassword())
  };

  handleConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value
    }, () => this.validatePassword())
  };

  validatePassword = () => {
    if (!(/^\s*$/.test(this.state.password)) && this.state.password
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

  render() {
    return (
        <>
          <button className="btn btn-success btn-block"
                  data-toggle="modal"
                  data-target={`#${this.props.id}`}>
            Change Password
          </button>
          <div className="modal fade"
               id={this.props.id}
               tabIndex="-1" role="dialog"
               aria-labelledby="passwordModalLabel"
               aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header dark-theme">
                  <h5 className="modal-title"
                      id="passwordModalLabel">Change
                    password</h5>
                  <button type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              password: "",
                              confirmPassword: ""
                            })
                          }}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group row">
                    <label htmlFor="password"
                           className="col-sm-2 col-form-label text-left">
                      Password </label>
                    <div className="col-sm-10">
                      <input className="form-control"
                             id="password"
                             type="password"
                             placeholder="****"
                             value={this.state.password}
                             onChange={this.handlePassword}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="confirmPassword"
                           className="col-sm-2 col-form-label text-left">
                      Verify Password </label>
                    <div className="col-sm-10">
                      <input className="form-control"
                             id="confirmPassword"
                             type="password"
                             placeholder="****"
                             value={this.state.confirmPassword}
                             onChange={this.handleConfirmPassword}
                      />
                      {this.state.match &&
                      <p className="color-green mb-0 float-right">passwords
                        match!!</p>
                      }
                      {!this.state.match &&
                      <p className="red mb-0 float-right">passwords do not
                        match!!</p>
                      }
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              password: "",
                              confirmPassword: ""
                            })
                          }}
                  >Close
                  </button>
                  <button type="button"
                          className="btn btn-primary"
                          disabled={!this.state.match}
                          onClick={(e) => {
                            e.preventDefault();
                            this.props.updatePassword(this.state.password);
                            this.setState({
                              password: "",
                              confirmPassword: ""
                            })
                          }}
                  >Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
    )
  }
}
