import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Alert from "@mui/material/Alert";
import CryptoJS from "crypto-js";
import "./ServerShowPage.css";
import { ModalContext } from "../../App";

const ServerHeader = ({
  server,
  isDropOpen,
  setIsDropOpen,
  handleOutsideClick,
}) => {
  const { setIsOpen, setIsEdit, setIsDeleteOpen, setIsLeave } =
    useContext(ModalContext);
  const [copiedAlert, setCopiedAlert] = useState(false);
  const sessionUser = useSelector((store) => store.session.user);
  const handleDrawerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropOpen((prev) => !prev);
  };
  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLeave(true);
    setIsDeleteOpen(true);
  };
  const handleInvite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const hash = CryptoJS.AES.encrypt(
      JSON.stringify(`${server.id}/channels/${server.defaultChannel.id}`),
      process.env.REACT_APP_SECRET_KEY
    );
    const url = `http://localhost:3000/invite/${hash}`;
    await navigator.clipboard.writeText(url);
    setCopiedAlert(true);
    setTimeout(() => {
      setCopiedAlert(false);
    }, 2000);
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
        <h4 className="truncate">{server.serverName}</h4>
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
                      onClick={() => {
                        setIsLeave(false);
                        setIsDeleteOpen(true);
                      }}
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
