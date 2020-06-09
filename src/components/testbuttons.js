import React, { Component } from "react";

class TestButtons extends Component {
  render() {
    return (
      <div>
        <button
          onClick={this.props.testButtonSetState.bind(
            this,
            "30",
            "",
            "",
            "20",
            "",
            "16",
            false
          )}
        >
          ONE TRIANGLE
        </button>
        <button
          onClick={this.props.testButtonSetState.bind(
            this,
            "30",
            "",
            "",
            "10",
            "16",
            "",
            false
          )}
        >
          AMBIGUOUS CASE
        </button>
        <br />
        <button
          onClick={this.props.testButtonSetState.bind(
            this,
            "0.523599",
            "",
            "",
            "20",
            "",
            "16",
            true
          )}
        >
          ONE TRIANGLE RAD
        </button>
        <button
          onClick={this.props.testButtonSetState.bind(
            this,
            "0.523599",
            "",
            "",
            "10",
            "16",
            "",
            true
          )}
        >
          AMBIGUOUS CASE RAD
        </button>
      </div>
    );
  }
}

export default TestButtons;
