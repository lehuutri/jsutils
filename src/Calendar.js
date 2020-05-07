import React, { useState } from "react";
import "./styles.css";

function CalendarHeader(props) {
  function header() {
    const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    const hightlight = ["Sat", "Sun"];
    let renderDays = [];
    for (let i = 0; i < days.length; i++) {
      const d = days[i];
      const c = hightlight.includes(d) ? "day highlight" : "day normal";
      renderDays.push(
        <span className={c} key={i}>
          {d}
        </span>
      );
    }
    return renderDays;
  }
  return (
    <div className="header">
      <div className="control">
        {props.title}
        <button type="button" onClick={() => props.onClick([-1, 0])}>
          &#171;
        </button>
        <button type="button" onClick={() => props.onClick([0, -1])}>
          &#8249;
        </button>
        <button type="button" onClick={() => props.onClick([0, 0])}>
          &#10687;
        </button>
        <button type="button" onClick={() => props.onClick([0, 1])}>
          &#8250;
        </button>
        <button type="button" onClick={() => props.onClick([1, 0])}>
          &#187;
        </button>
      </div>
      <div className="days">{header()}</div>
    </div>
  );
}
export default function Calendar(props) {
  const current = new Date();
  const [year, setYear] = useState(current.getFullYear());
  const [month, setMonth] = useState(current.getMonth());

  function isToday(d) {
    const current = new Date();
    return year === current.getFullYear() &&
      month === current.getMonth() &&
      d === current.getDate()
      ? true
      : false;
  }
  function monthName(month) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return months[month];
  }
  function changeToToday() {
    const current = new Date();
    setYear(current.getFullYear());
    setMonth(current.getMonth());
  }
  function changeToMonth(theChange) {
    let [newyear, newmonth] = [year + theChange[0], month + theChange[1]];
    if (newmonth < 0) {
      newmonth = 11;
      newyear -= 1;
    }
    if (newmonth > 11) {
      newmonth = 0;
      newyear += 1;
    }
    setYear(newyear);
    setMonth(newmonth);
  }
  function changeTo(theChange) {
    if (theChange[0] === 0 && theChange[1] === 0) {
      changeToToday();
    } else {
      changeToMonth(theChange);
    }
  }
  function renderBody(year, month) {
    const firstDay = new Date(year, month, 1);
    const firstDOW = firstDay.getDay();
    const thisEOM = new Date(year, month + 1, 0).getDate();
    const previousEOM = new Date(year, month, 0).getDate();

    let days = [];
    for (let d = previousEOM - firstDOW; d <= previousEOM; d++) {
      days.push(
        <span className="day low" key={days.length}>
          {d}
        </span>
      );
    }
    for (let d = 1; d <= thisEOM; d++) {
      const cl = isToday(d) ? "day high" : "day";
      days.push(
        <span className={cl} key={days.length}>
          {d}
        </span>
      );
    }
    for (let d = 1; d <= 6 * 7 - thisEOM - firstDOW; d++) {
      days.push(
        <span className="day low" key={days.length}>
          {d}
        </span>
      );
    }

    let weeks = [];
    for (let w = 0; w <= 5; w++) {
      weeks.push(
        <div className="week" key={w}>
          {days.slice(w * 7, w * 7 + 7)}
        </div>
      );
    }

    return weeks;
  }

  return (
    <div className="Calendar">
      <div className="header">
        <CalendarHeader
          title={" " + monthName(month) + " " + year + " "}
          onClick={changeTo}
        />
      </div>

      <div className="body">{renderBody(year, month)}</div>
    </div>
  );
}

