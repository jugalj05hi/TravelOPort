import React from "react";

export default class UserTabsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      userDetail: props.userDetail,
      editing: false
    };
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.userDetail !== this.props.userDetail) {
      this.setState({
        title: this.props.title,
        userDetail: this.props.userDetail
      })
    }
  }

  save = () => {
    let modifiedUser = {};
    modifiedUser[this.state.title] = this.state.userDetail;
    this.props.updateUser(modifiedUser);
    this.setState({
      editing: false
    })
  };

  render() {

    let type = "text";
    if (this.state.title === "email") {
      type = "email"
    }

    return (
        <div className="col-lg-3 col-sm-12 pb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-capitalize">{this.state.title}</h5>
              {(!this.state.editing) &&
              <h6 className="card-subtitle mb-2 text-muted">
                {this.state.userDetail}
                {(this.state.userDetail !== "USER" && this.state.userDetail
                    !== "ADMIN" && this.state.userDetail !== "AGENT") &&
                <a href="#" className="card-link float-right"
                   onClick={() => this.setState({editing: true})}>Edit</a>
                }
              </h6>}
              {this.state.editing &&
              <span style={{"display": "inline-flex"}}>
                      <input className="form-control"
                             value={this.state.userDetail}
                             type={type}
                             onChange={(e) => this.setState(
                                 {userDetail: e.target.value})}
                      />
                {this.state.userDetail !== 'USER' &&
                <>&nbsp;<i className="fa-2x fas fa-check float-right"
                           style={{"color": "green"}}
                           onClick={this.save}/></>}
                    </span>
              }
            </div>
          </div>
        </div>
    )
  }
}
