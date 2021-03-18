import React from "react";

const FeedbackModal = ({id, feedback}) =>
    <>
      <button type="button" className="btn btn-link" data-toggle="modal"
              data-target={`#${id}_feedback`}>
        View Feedback
      </button>

      <div className="modal fade bd-example-modal-xl"
           id={`${id}_feedback`}
           tabIndex="-1"
           role="dialog"
           aria-labelledby="feedbackModalTitleDiv"
           aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl"
             role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"
                  id="feedbackModalTitle"
                  style={{"color": "black"}}>
                Feedbacks
              </h5>
              <button type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  {feedback.length !== 0 &&
                  <ul className="list-group">
                    {feedback.map(x =>
                        <li className="list-group-item font-italic"
                            style={{"color": "black"}}>
                          * {x} *
                        </li>
                    )}
                  </ul>
                  }
                  {feedback.length === 0 &&
                  <h5 style={{"color": "black"}}>No feedback yet...</h5>
                  }
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal">Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>;

export default FeedbackModal
