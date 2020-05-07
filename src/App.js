import React from "react";
import "./styles.css";
import WorldClock from "./WorldClock.js";
import TimeConverter from "./TimeConverter.js";
import Calendar from "./Calendar.js";

export default function App() {
  return (
    <div className="App">
      <div className="topBlock">
        <div className="title">WORLD CLOCKS</div>
        <WorldClock />
      </div>
      <div className="topBlock">
        <div className="title">TIME CONVERTER</div>
        <TimeConverter />
      </div>
      <div className="topBlock">
        <div className="title">CALENDAR</div>
        <Calendar />
      </div>
    </div>
  );
}
