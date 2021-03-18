import React from "react";

export const AmenitiesModal = ({title, amenities}) =>

    <div className="modal fade"
         id="amenitiesModal"
         tabIndex="-1"
         role="dialog"
         aria-labelledby="exampleModalScrollableTitle"
         aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable"
           role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"
                id="amenitiesModal">{title}</h5>
            <button type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul className='list-group'>
              {amenities.map(x =>
                  <li className='list-group-item'>{x}</li>
              )}
            </ul>
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
