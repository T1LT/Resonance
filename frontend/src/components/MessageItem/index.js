import React, { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import "./MessageItem.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModalContext } from "../../App";
import { useSelector } from "react-redux";
import { updateMessage } from "../../store/message";
import { formatTimestamp } from "../../utils/formattime";
import randomColor from "../../utils/logocolor";
import Linkify from "react-linkify";

const MessageItem = ({ server, message }) => {
  const { setIsDeleteOpen, setConfirmationType } = useContext(ModalContext);
  const [msgcrudActive, setMsgcrudActive] = useState(false);
  const [msgEdit, setMsgEdit] = useState(false);
  const [msgInput, setMsgInput] = useState(message?.body);
  const hidden = { opacity: 0 };
  const active = { opacity: 1 };
  const sessionUser = useSelector((store) => store.session.user);

  const handleEditMessage = (e) => {
    e.preventDefault();
    const messageData = { ...message, body: msgInput };
    setMsgEdit(false);
    updateMessage(messageData);
  };
  const handleCloseEdit = (e) => {
    if (e.keyCode === 27) {
      setMsgEdit(false);
      setMsgInput(message.body);
    }
  };
  return (
    <>
      {message && (
        <div
          className="message-item"
          id={msgEdit ? "message-edit-active" : undefined}
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
                server?.ownerId === sessionUser.id) && (
                <div
                  className="message-buttons"
                  style={msgcrudActive ? active : hidden}
                >
                  {message.user.id === sessionUser.id && (
                    <div
                      className="message-edit-button"
                      onClick={() => setMsgEdit(true)}
                    >
                      <EditIcon fontSize="small" sx={{ m: "0 2px" }} />
                    </div>
                  )}
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
            {msgEdit ? (
              <form className="edit-message-form" onSubmit={handleEditMessage}>
                <input
                  type="text"
                  name="content"
                  id="message"
                  autoComplete="off"
                  autoFocus
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  onKeyDown={handleCloseEdit}
                />
                <p className="msg-edit-info">
                  escape to{" "}
                  <span
                    onClick={() => {
                      setMsgEdit(false);
                      setMsgInput(message.body);
                    }}
                  >
                    cancel
                  </span>{" "}
                  &bull; enter to <span onClick={handleEditMessage}>save</span>
                </p>
              </form>
            ) : (
              <Linkify>
                <p className="linkify-link">{message.body}</p>
              </Linkify>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageItem;
