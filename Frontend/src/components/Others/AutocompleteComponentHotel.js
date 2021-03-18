import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {server} from "../../services/services";

class AutocompleteComponentHotel extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  componentDidMount() {
    this.setState({
      userInput: this.props.dataValue
    });
  }

  // Event fired when the input value is changed
  onChange = e => {
    const {suggestions} = this.props;
    const userInput = e.currentTarget.value;
    var suggestionsdata = [];

    if (userInput != "") {
      this.setState({
        userInput: userInput
      });

      this.props.onDataChange(userInput);

      fetch(
          `${server}/api/search/airport/code/`
          + e.currentTarget.value)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        suggestionsdata = data;
        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestionsdata.filter(
            suggestion =>
                suggestion.detailedName.toLowerCase().indexOf(
                    userInput.toLowerCase()) > -1
        );
        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
          activeSuggestion: 0,
          filteredSuggestions: filteredSuggestions,
          showSuggestions: true
        });
      });
    } else {
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: true,
        userInput: userInput
      });

      this.props.onDataChange("null");
    }

  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });

    this.props.onDataChange(e.currentTarget.innerText);
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const {activeSuggestion, filteredSuggestions} = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      if (filteredSuggestions[activeSuggestion]) {
        let suggestion = filteredSuggestions[activeSuggestion].name + " - "
            + filteredSuggestions[activeSuggestion].iataCode;
        this.setState({
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: suggestion
        });
        this.props.onDataChange(suggestion);
      }
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({activeSuggestion: activeSuggestion - 1});
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({activeSuggestion: activeSuggestion + 1});
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
            <ul className="list-group suggestions overlap">
              {filteredSuggestions.map((suggestion, index) => {
                let className = ["list-group-item"];

                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className.push("active");
                }
                return (
                    <li
                        className={className.join(' ')}
                        onClick={onClick}
                    >
                      {suggestion.address.cityName} - {suggestion.iataCode}
                    </li>
                );
              })}
            </ul>
        );
      } else {
        suggestionsListComponent = (
            <div className="no-suggestions">
              <em>No suggestions!</em>
            </div>
        );
      }
    }

    return (
        <Fragment>
          <input
              type="text"
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder="Enter city"
              value={userInput}
              className="form-control"
              required
          />
          {suggestionsListComponent}
        </Fragment>
    );
  }
}

export default AutocompleteComponentHotel;
