import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { deleteServer } from "../../store/server";
import "./ServerShowPage.css";

const ServerHeader = ({
  server,
  setIsOpen,
  isDropOpen,
  setIsDropOpen,
  setIsEdit,
  handleOutsideClick,
}) => {
  const sessionUser = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDrawerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropOpen((prev) => !prev);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteServer(server.id));
    history.push("/me");
  };
  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push("/me");
  };
  return (
    <div className="server-header" onClick={handleOutsideClick}>
      <div className="header-left">
        <h4>{server.serverName}</h4>
        <div onClick={handleDrawerClick}>
          {isDropOpen ? (
            <CloseIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </div>
        {isDropOpen ? (
          <div className="menu-container">
            <ul className="menu">
              <li className="menu-item">
                <button id="invite-button">
                  Invite People
                  <PersonAddIcon fontSize="small" sx={{ mt: 0, pr: 0 }} />
                </button>
              </li>
              {server.ownerId === sessionUser.id ? (
                <>
                  <li className="menu-item">
                    <button
                      onClick={() => {
                        setIsDropOpen(false);
                        setIsEdit(true);
                        setIsOpen(true);
                      }}
                    >
                      Edit Server
                      <EditIcon fontSize="small" sx={{ mt: 0, pr: 0 }} />
                    </button>
                  </li>
                  <li>
                    <div className="options-divider"></div>
                  </li>
                  <li className="menu-item">
                    <button id="delete-button" onClick={handleDelete}>
                      Delete Server
                      <DeleteIcon fontSize="small" sx={{ mt: 0, pr: 0 }} />
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <div className="options-divider"></div>
                  </li>
                  <li className="menu-item">
                    <button id="delete-button" onClick={handleLeave}>
                      Leave Server
                      <ArrowCircleLeftIcon
                        fontSize="small"
                        sx={{ mt: 0, pr: 0 }}
                      />
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="rest-of-the-header"></div>
    </div>
  );
};

export default ServerHeader;
