import React, { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import "./MessageItem.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModalContext } from "../../App";
import { useSelector } from "react-redux";

const MessageItem = ({ server, message }) => {
  const { setIsDeleteOpen, setConfirmationType } = useContext(ModalContext);
  const colors = ["blue", "mustard", "red", "green", "grey"];
  const randomColor = (id) => colors[id % 5];
  const [msgcrudActive, setMsgcrudActive] = useState(false);
  const hidden = { opacity: 0 };
  const active = { opacity: 1 };
  const sessionUser = useSelector((store) => store.session.user);
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
      meridiem = "PM";
    }
    return `${month}/${date}/${year} ${hours}:${minutes} ${meridiem}`;
  };
  return (
    <>
      {message && (
        <div
          className="message-item"
          onMouseEnter={() => setMsgcrudActive(true)}
          onMouseLeave={() => setMsgcrudActive(false)}
        >
          <div
            className="message-user-squircle"
            id={randomColor(message.user.id)}
          >
            <img src={logo} alt="logo" className="message-user-logo" />
          </div>
          <div className="text">
            <div className="message-top">
              <h4>
                {message.user.username}
                <span id="timestamp">{formatTimestamp(message.createdAt)}</span>
              </h4>
              {(message.user.id === sessionUser.id ||
                server.ownerId === sessionUser.id) && (
                <div
                  className="message-buttons"
                  style={msgcrudActive ? active : hidden}
                >
                  <div className="message-edit-button" onClick={() => {}}>
                    <EditIcon fontSize="small" sx={{ m: "0 2px" }} />
                  </div>
                  <div
                    className="message-delete-button"
                    onClick={() => {
                      setConfirmationType("message");
                      setIsDeleteOpen(message.id);
                    }}
                  >
                    <DeleteIcon fontSize="small" sx={{ m: "0 2px" }} />
                  </div>
                </div>
              )}
            </div>
            <p>{message.body}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageItem;
