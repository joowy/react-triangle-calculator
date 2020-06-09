import React, { Component } from "react";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      shown: {},
    };
    this.togglePanel = this.togglePanel.bind(this);
    this.displayHistory = this.displayHistory.bind(this);
  }
  togglePanel(panelNumber) {
    this.setState({
      shown: {
        ...this.state.shown,
        [panelNumber]: !this.state.shown[panelNumber],
      },
    });
  }

  displayHistory() {
    if (this.props.calculations.length > 0) {
      return this.props.calculations.map((item) => (
        <div
          key={item.id}
          className="calc-instance"
          onClick={this.props.setInputFields.bind(
            this,
            item.angleA,
            item.angleB,
            item.angleC,
            item.sideA,
            item.sideB,
            item.sideC
          )}
        >
          {item.angleA ? "AngleA: " + item.angleA + ";" : ""}
          {item.angleB ? " AngleB: " + item.angleB + ";" : ""}
          {item.angleC ? " AngleC: " + item.angleC + ";" : ""}
          {item.sideA ? " SideA: " + item.sideA + ";" : ""}
          {item.sideB ? " SideB: " + item.sideB + ";" : ""}
          {item.sideC ? " SideC: " + item.sideC + ";" : ""}
        </div>
      ));
    } else {
      return <div>No History</div>;
    }
  }
  render() {
    return (
      <div className="sidebar">
        <div className="accordion" onClick={() => this.togglePanel(1)}>
          HISTORY
        </div>
        <div
          className={"history-panel " + (this.state.shown[1] ? "" : "hidden")}
        >
          <this.displayHistory />
        </div>
        <div className="accordion" onClick={() => this.togglePanel(2)}>
          OPTIONS
        </div>
        <div
          className={"setting-panel " + (this.state.shown[2] ? "" : "hidden")}
        >
          <button onClick={this.props.clearHistory}>Clear History</button>
          <div
            onChange={this.props.setMode.bind(this)}
            className="calculation-mode"
          >
            <br />
            Input & Output Mode: <br />
            <input type="radio" value='false' name="mode" defaultChecked />
            Degree
            <span> &nbsp; </span>
            <input type="radio" value='true' name="mode" />
            Radian
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
