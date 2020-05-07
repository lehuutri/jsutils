import React, { useState } from "react";
import "./styles.css";

export default function TimeConverter(props) {
  const [hour, setHour] = useState(new Date().getUTCHours());

  function handleChange(theHour) {
    setHour(theHour);
  }

  return (
    <div>
      <TimeInput
        name="Vietnam"
        timeZone={+7}
        hour={hour}
        onChange={handleChange}
      />
      <TimeInput
        name="New York"
        timeZone={-4}
        hour={hour}
        onChange={handleChange}
      />
      <TimeInput
        name="Los Angeles"
        timeZone={-7}
        hour={hour}
        onChange={handleChange}
      />
    </div>
  );
}

function TimeInput(props) {
  function onChange(event) {
    const newHour =
      (24 + parseInt(event.target.value, 10) - props.timeZone) % 24;
    props.onChange(newHour);
  }

  function localeHour() {
    const hour = (24 + parseInt(props.hour, 10) + props.timeZone) % 24;
    return hour;
  }

  function hourOptions() {
    const options = [...Array(24).keys()].map(v => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
    return options;
  }

  return (
    <div className="TimeInput">
      <div className="text">
        <label>{props.name}</label>
      </div>
      <div className="hour">
        ({props.timeZone}){" "}
        <select className="hour" value={localeHour()} onChange={onChange}>
          {hourOptions()}
        </select>
      </div>
    </div>
  );
}
