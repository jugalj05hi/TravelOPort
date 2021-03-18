import React from "react";
import RegistrationContent from "./RegistrationContent";

export const RegistrationModalComponent = ({history}) =>
    <div className="modal fade"
         id="registrationModal"
         tabIndex="-1"
         role="dialog"
         aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered"
           role="document">
        <div className="modal-content">
          <div className="modal-header dark-theme">
            <h5 className="modal-title"
                id="exampleModalCenterTitle">
              Register
            </h5>
            <button type="button"
                    className="close color-white"
                    data-dismiss="modal"
                    aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <RegistrationContent
                history={history}/>
          </div>
          <div className="modal-footer">
            <button type="button"
                    className="btn btn-dark"
                    data-dismiss="modal">Close
            </button>
          </div>
        </div>
      </div>
    </div>;


