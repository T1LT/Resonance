import React from "react";
import logo from "../../assets/logo.png";
import "./MessageItem.css";

const MessageItem = ({ message }) => {
  const colors = ["blue", "mustard", "red", "green", "grey"];
  const randomColor = (id) => colors[id % 5];
  const formatTimestamp = (timestamp) => {
    let dateObj = new Date(timestamp);
    let date = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let meridiem = "AM";
    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours >= 12) {
      hours %= 12;
      meridiem = "PM"
    }
    return `${month}/${date}/${year} ${hours}:${minutes} ${meridiem}`;
  };
  return (
    <>
      {message && (
        <div className="message-item">
          <div
            className="message-user-squircle"
            id={randomColor(message.user.id)}
          >
            <img src={logo} alt="logo" className="message-user-logo" />
          </div>
          <div className="text">
            <h4>
              {message.user.username}
              <span id="timestamp">{formatTimestamp(message.createdAt)}</span>
            </h4>
            <p>{message.body}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageItem;
