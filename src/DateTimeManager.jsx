import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import weekOfYear from "dayjs/plugin/weekOfYear";

// Extend Day.js with plugins
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(weekOfYear);

const DateTimeManager = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [eventDate, setEventDate] = useState(dayjs().add(7, "day"));
  const [timeUntilEvent, setTimeUntilEvent] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateTimeUntilEvent = () => {
      const now = dayjs();
      const diff = eventDate.diff(now);
      const durationObj = dayjs.duration(diff);

      setTimeUntilEvent(
        `${durationObj.days()}d ${durationObj.hours()}h ${durationObj.minutes()}m ${durationObj.seconds()}s`
      );
    };

    updateTimeUntilEvent();
    const timer = setInterval(updateTimeUntilEvent, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const handleDateChange = (e) => {
    setEventDate(dayjs(e.target.value));
  };

  return (
    <div>
      <h1>DayJS Example</h1>
      <h2>Current Time: {currentTime.format("YYYY-MM-DD HH:mm:ss")}</h2>
      <p>
        Current Time in New York:{" "}
        {currentTime.tz("America/New_York").format("YYYY-MM-DD HH:mm:ss z")}
      </p>
      <p>
        Current Time in Tokyo:{" "}
        {currentTime.tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss z")}
      </p>

      <h3>Event Countdown</h3>
      <input
        type="datetime-local"
        value={eventDate.format("YYYY-MM-DDTHH:mm")}
        onChange={handleDateChange}
      />
      <p>Time until event: {timeUntilEvent}</p>

      <h3>Date Formatting Examples</h3>
      <p>Week of Year: {currentTime.week()}</p>
      <p>Quarter: {currentTime.format("Qo [quarter of] YYYY")}</p>
      <p>Day of Year: {currentTime.format("DDDo")}</p>
    </div>
  );
};

export default DateTimeManager;
