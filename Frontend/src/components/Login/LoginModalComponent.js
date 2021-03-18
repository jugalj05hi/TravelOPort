import React from "react";
import LoginModalContent from "./LoginModalContent";

export default class LoginModalComponent extends React.Component {

  render() {
    return (
        <div className="modal fade"
             id="loginModal"
             tabIndex="-1"
             role="dialog"
             aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered"
               role="document">
            <div className="modal-content">
              <div className="modal-header dark-theme">
                <h5 className="modal-title"
                    id="exampleModalCenterTitle">
                  Login
                </h5>
                <button type="button"
                        className="close color-white"
                        data-dismiss="modal"
                        aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <LoginModalContent
                    history={this.props.history}
                />
              </div>
              <div className="modal-footer">
                <button type="button"
                        className="btn btn-dark"
                        data-dismiss="modal">Close
                </button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

