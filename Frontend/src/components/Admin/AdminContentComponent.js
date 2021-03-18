import React from "react";
import TicketsModal from "./TicketsModal";
import FeedbackModal from "./FeedbackModal";
import PasswordModal from "../Profile/PasswordModal";

export default class AdminContentComponent extends React.Component {
  state = {
    user: this.props.user,
    editing: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user._id !== prevProps.user._id) {
      this.setState({
        user: this.props.user
      })
    }
  }

  updatePassword = (password) => {
    this.props.updatePwd(this.state.user._id, password);
    window.$(`#${this.state.user.first}`).modal('toggle');
  };

  save = () => {
    this.props.updateUserService(this.state.user);
    this.setState({
      editing: false
    })
  };

  render() {

    return (
        <tr>
          <th scope="row">
            {!this.state.editing &&
            <span>{this.state.user.first}</span>
            }
            {this.state.editing &&
            <span>
              <input className="form-control"
                     value={this.state.user.first}
                     onChange={(e) => this.setState({
                       user: {
                         ...this.state.user,
                         first: e.target.value
                       }
                     })}
              />
            </span>}
          </th>

          <td>
            {!this.state.editing &&
            <span>{this.state.user.last}</span>
            }
            {this.state.editing &&
            <span>
              <input className="form-control"
                     value={this.state.user.last}
                     onChange={(e) => this.setState({
                       user: {
                         ...this.state.user,
                         last: e.target.value
                       }
                     })}
              />
            </span>}
          </td>

          <td className="text-center">
            {!this.state.editing &&
            <i className="fas fa-pencil-alt"
               onClick={() => this.setState({
                 editing: true
               })}
            />}
            {this.state.editing &&
            <i className="fas fa-check color-green"
               onClick={this.save}/>
            }
          </td>

          <td>{this.state.user.email}</td>
          <td>
            <PasswordModal
                id={this.state.user.first}
                updatePassword={this.updatePassword}/>
          </td>
          <td>
            {this.state.user.type}
          </td>
          <td>
            <TicketsModal
                id={this.state.user.first}
                tickets={this.props.user.ticketsBooked}
            />
          </td>
          <td>
            <FeedbackModal
                id={this.state.user.first}
                feedback={this.props.user.feedback}
            />
          </td>
          <td className="text-center">
            <i className="fas fa-trash-alt"
               onClick={() => this.props.delete(this.state.user._id)}/></td>
        </tr>
    )
  }
}
