import React, { Component } from "react";

import "../css/App.css";
import Calculator from "./TriangleCalculator";

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      calculations: [],
      numCalcs: 0,
    };
    this.storeCalculation = this.storeCalculation.bind(this);
    this.errorMessageBox = this.errorMessageBox.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
  }
  clearHistory() {
    this.setState({
      calculations: [],
    });
  }
  errorMessageBox(error) {
    let tempError = error;
    this.setState({
      error: tempError,
    });
  }

  storeCalculation(calcResult) {
    let tempCalculations = this.state.calculations;
    calcResult.id = this.state.numCalcs;
    tempCalculations.unshift(calcResult);
    this.setState({
      calculations: tempCalculations,
      numCalcs: this.state.numCalcs + 1,
    });
  }
  render() {
    return (
      <main>
        <div className="top-messagebox">
          INSTRUCTION: <br /> Provide exactly three inputs and at least one side
          to the input fields. Press calculate to calculate result.
          <div>
            <span className="error-messagebox">{this.state.error}</span>
          </div>
        </div>
        <div className="app-container">
          <Calculator
            storeCalculation={this.storeCalculation}
            errorMessageBox={this.errorMessageBox}
            calculations={this.state.calculations}
            clearHistory={this.clearHistory}
          />
        </div>
      </main>
    );
  }
}

export default App;
