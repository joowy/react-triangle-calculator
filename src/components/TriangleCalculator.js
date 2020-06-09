import React, { Component } from "react";

import CalculateButton from "../images/calculatePointer.png";
import ClearButton from "../images/clear.jpg";
import { solve } from "./solveInputs.js";
import Sidebar from "./SideBar";

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      angleA: "",
      angleB: "",
      angleC: "",
      sideA: "",
      sideB: "",
      sideC: "",
      ObtuseAngleA: "",
      ObtuseAngleB: "",
      ObtuseAngleC: "",
      ObtuseSideA: "",
      ObtuseSideB: "",
      ObtuseSideC: "",
      displayObtuse: false,
      calculationMode: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.setInputFields = this.setInputFields.bind(this);
    this.setMode = this.setMode.bind(this);
  }

  setMode(e) {
    let bool = false;
    if (e.target.value === "true") {
      bool = true;
    }
    this.setState({
      calculationMode: bool,
    });
  }

  setInputFields(angleA, angleB, angleC, sideA, sideB, sideC) {
    this.setState({
      sideA: sideA,
      sideB: sideB,
      sideC: sideC,
      angleA: angleA,
      angleB: angleB,
      angleC: angleC,
    });
  }

  handleCalculate(e) {
    if (e) {
      e.preventDefault();
    }
    let tempCalc = {
      angleA: this.state.angleA,
      angleB: this.state.angleB,
      angleC: this.state.angleC,
      sideA: this.state.sideA,
      sideB: this.state.sideB,
      sideC: this.state.sideC,
      calculationMode: this.state.calculationMode,
    };
    this.props.storeCalculation(tempCalc);
    let result;
    try {
      result = solve(
        tempCalc["angleA"],
        tempCalc["angleB"],
        tempCalc["angleC"],
        tempCalc["sideA"],
        tempCalc["sideB"],
        tempCalc["sideC"],
        tempCalc["calculationMode"]
      );
      this.props.errorMessageBox(result[0][6]);
      if (!result[1]) {
        this.setState({
          displayObtuse: false,
          sideA: result[0][0],
          sideB: result[0][1],
          sideC: result[0][2],
          angleA: result[0][3],
          angleB: result[0][4],
          angleC: result[0][5],
        });
      } else {
        this.setState({
          displayObtuse: true,
          sideA: result[0][0],
          sideB: result[0][1],
          sideC: result[0][2],
          angleA: result[0][3],
          angleB: result[0][4],
          angleC: result[0][5],
          ObtuseSideA: result[1][0],
          ObtuseSideB: result[1][1],
          ObtuseSideC: result[1][2],
          ObtuseAngleA: result[1][3],
          ObtuseAngleB: result[1][4],
          ObtuseAngleC: result[1][5],
        });
      }
    } catch (err) {
      //catch error and set error message
      this.props.errorMessageBox(err.message);
      console.log(err);
    }
  }
  handleClear(e) {
    e.preventDefault();
    this.props.errorMessageBox(""); // clear the error message
    this.setState({
      sideA: "",
      sideB: "",
      sideC: "",
      angleA: "",
      angleB: "",
      angleC: "",
      displayObtuse: false,
    });
  }
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div className="triangle-app">
        <div className="trianglePic">
          <form noValidate>
            <div className=" input-divide ">
              <input
                autocomplete="off"
                style={{ position: "relative", top: "5%", left: "242px" }}
                type="text"
                className="triangle-input"
                placeholder="AngleC"
                name="angleC"
                value={this.state.angleC}
                onChange={this.handleChange}
              />
            </div>
            <div
              className="input-divide"
              style={{ width: "400px", margin: "0 auto" }}
            >
              <input
                autocomplete="off"
                style={{ marginLeft: "15px", position: "relative", top: "50%" }}
                type="text"
                className="triangle-input"
                placeholder="SideB"
                name="sideB"
                value={this.state.sideB}
                onChange={this.handleChange}
              />
              <input
                autocomplete="off"
                style={{
                  float: "right",
                  marginRight: "15px",
                  position: "relative",
                  top: "50%",
                }}
                type="text"
                className="triangle-input"
                placeholder="SideA"
                name="sideA"
                value={this.state.sideA}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-divide">
              <input
                autocomplete="off"
                style={{ position: "relative", top: "60%" }}
                type="text"
                className="triangle-input"
                placeholder="AngleA"
                name="angleA"
                value={this.state.angleA}
                onChange={this.handleChange}
              />
              <input
                autocomplete="off"
                style={{ position: "relative", top: "75%", left: " 171px" }}
                type="text"
                className="triangle-input"
                placeholder="SideC"
                name="sideC"
                value={this.state.sideC}
                onChange={this.handleChange}
              />
              <input
                autocomplete="off"
                style={{ position: " relative", top: "60%", float: "right" }}
                type="text"
                className="triangle-input"
                placeholder="AngleB"
                name="angleB"
                value={this.state.angleB}
                onChange={this.handleChange}
              />
            </div>
            <div className="calculate-clear-div">
              <label className="calculate-clear-button">
                Calculate
                <input
                  type="image"
                  alt="submit"
                  src={CalculateButton}
                  width="70"
                  height="70"
                  name="calculate-button"
                  onClick={this.handleCalculate}
                />
              </label>
              <label className="calculate-clear-button">
                Clear
                <input
                  type="image"
                  src={ClearButton}
                  alt=""
                  width="70"
                  height="70"
                  name="clear-button"
                  onClick={this.handleClear}
                />
              </label>
            </div>
          </form>
          <br />
          <div
            className={
              "obtuse-case " + (this.state.displayObtuse ? "" : "hidden")
            }
          >
            <div className="error-messagebox">Second Possibility</div>
            <form noValidate>
              <div className=" input-divide ">
                <input
                  style={{ position: "relative", top: "5%", left: "242px" }}
                  type="text"
                  className="triangle-input"
                  placeholder="AngleC"
                  name="angleC"
                  value={this.state.ObtuseAngleC}
                  onChange={this.handleChange}
                />
              </div>
              <div
                className="input-divide"
                style={{ width: "400px", margin: "0 auto" }}
              >
                <input
                  style={{
                    marginLeft: "15px",
                    position: "relative",
                    top: "50%",
                  }}
                  type="text"
                  className="triangle-input"
                  placeholder="SideB"
                  name="sideB"
                  value={this.state.ObtuseSideB}
                  onChange={this.handleChange}
                />
                <input
                  style={{
                    float: "right",
                    marginRight: "15px",
                    position: "relative",
                    top: "50%",
                  }}
                  type="text"
                  className="triangle-input"
                  placeholder="SideA"
                  name="sideA"
                  value={this.state.ObtuseSideA}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-divide">
                <input
                  style={{ position: "relative", top: "60%" }}
                  type="text"
                  className="triangle-input"
                  placeholder="AngleA"
                  name="angleA"
                  value={this.state.ObtuseAngleA}
                  onChange={this.handleChange}
                />
                <input
                  style={{ position: "relative", top: "75%", left: " 171px" }}
                  type="text"
                  className="triangle-input"
                  placeholder="SideC"
                  name="sideC"
                  value={this.state.ObtuseSideC}
                  onChange={this.handleChange}
                />
                <input
                  style={{ position: " relative", top: "60%", float: "right" }}
                  type="text"
                  className="triangle-input"
                  placeholder="AngleB"
                  name="angleB"
                  value={this.state.ObtuseAngleB}
                  onChange={this.handleChange}
                />
              </div>
            </form>
          </div>
        </div>
        <Sidebar
          calculations={this.props.calculations}
          setInputFields={this.setInputFields}
          clearHistory={this.props.clearHistory}
          setMode={this.setMode}
        />
      </div>
    );
  }
}

export default Calculator;
