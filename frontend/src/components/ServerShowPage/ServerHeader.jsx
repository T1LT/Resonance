import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Alert from "@mui/material/Alert";
import CryptoJS from "crypto-js";
import "./ServerShowPage.css";
import { removeMembership } from "../../store/server";

const ServerHeader = ({
  server,
  setIsOpen,
  isDropOpen,
  setIsDropOpen,
  setIsEdit,
  handleOutsideClick,
  setIsDeleteOpen,
}) => {
  const [copiedAlert, setCopiedAlert] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  const history = useHistory();
  const handleDrawerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropOpen((prev) => !prev);
  };
  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeMembership(server.id, server.users[sessionUser.id].membershipId));
    history.push("/me");
  };
  const handleInvite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const hash = CryptoJS.AES.encrypt(JSON.stringify(server.id), "secret");
    const url = `http://localhost:3000/invite/${hash}`;
    await navigator.clipboard.writeText(url);
    setCopiedAlert(true);
    setTimeout(() => {
      setCopiedAlert(false);
    }, 3000);
  };
  const unmountedStyle = {
    width: "120px",
    fontFamily: "gg-sans-med",
    fontWeight: "bold",
    opacity: 0,
    transition: "opacity 0.5s",
  };
  const mountedStyle = {
    width: "120px",
    fontFamily: "gg-sans-med",
    fontWeight: "bold",
    opacity: 1,
    transition: "opacity 0.5s",
  };

  return (
    <div className="server-header" onClick={handleOutsideClick}>
      <div className="header-left">
        <h4>{server.serverName}</h4>
        <div onClick={handleDrawerClick}>
          {isDropOpen ? (
            <CloseIcon className="svg" fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon className="svg" fontSize="small" />
          )}
        </div>
        {isDropOpen ? (
          <div className="menu-container">
            <ul className="menu">
              <li className="menu-item">
                <button id="invite-button" onClick={handleInvite}>
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
                    <button
                      id="delete-button"
                      onClick={() => setIsDeleteOpen(true)}
                    >
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
      <div className="rest-of-the-header">
        <Alert sx={copiedAlert ? mountedStyle : unmountedStyle} severity="info">
          Link Copied!
        </Alert>
      </div>
    </div>
  );
};

export default ServerHeader;
