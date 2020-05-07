import React, { useEffect, useState } from "react";
import "./styles.css";

export default function WorldClock(props) {
  return (
    <div>
      <Clock className="Clock" name="Vietnam" timeZone="Asia/Ho_Chi_Minh" />
      <Clock className="Clock" name="New York" timeZone="America/New_York" />
      <Clock
        className="Clock"
        name="Los Angeles"
        timeZone="America/Los_Angeles"
      />
    </div>
  );
}

function Clock(props) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  });
  function tick() {
    setTime(new Date());
  }
  return (
    <div className={props.className}>
      <div className="text">{props.name}</div>
      <div className="time">
        {time.toLocaleTimeString("en-US", {
          timeZone: props.timeZone
        })}
      </div>
    </div>
  );
}
