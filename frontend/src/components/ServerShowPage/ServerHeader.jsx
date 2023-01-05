import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import TagIcon from "@mui/icons-material/Tag";
import Alert from "@mui/material/Alert";
import CryptoJS from "crypto-js";
import "./ServerShowPage.css";
import { ModalContext } from "../../App";
import { useParams } from "react-router-dom";

const ServerHeader = ({
  server,
  isDropOpen,
  setIsDropOpen,
  handleOutsideClick,
}) => {
  const {
    setIsOpen,
    setIsEdit,
    setIsDeleteOpen,
    setIsLeave,
    setConfirmationType,
    setIsChannelModalOpen,
    setIsChannelEdit,
  } = useContext(ModalContext);
  const { serverId, channelId } = useParams();
  const [copiedAlert, setCopiedAlert] = useState(false);
  const sessionUser = useSelector((store) => store.session.user);
  const channel = useSelector((store) => store.channels[channelId]);
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
    }, 1500);
  };
  const unmountedStyle = {
    width: "120px",
    fontFamily: "gg-sans-med",
    fontWeight: "bold",
    display: "none",
    opacity: 0,
    transition: "opacity 0.5s",
  };
  const mountedStyle = {
    width: "120px",
    fontFamily: "gg-sans-med",
    fontWeight: "bold",
    display: "flex",
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
                        setConfirmationType("server");
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
        <div className="channel-name">
          {channel && (
            <>
              <TagIcon
                sx={{ mr: "5px", transform: "skew(-10deg)", opacity: "0.5" }}
              />
              <h4>{channel.channelName}</h4>
            </>
          )}
        </div>
        {server.ownerId === sessionUser.id && (
          <div className="channel-buttons">
            <div
              className="channel-edit-button"
              onClick={() => {
                setIsChannelEdit(true);
                setIsChannelModalOpen(true);
              }}
            >
              <EditIcon sx={{ opacity: "0.7" }} />
            </div>
            {channel.id !== server.defaultChannel.id && (<div
              className="channel-delete-button"
              onClick={() => {
                setConfirmationType("channel");
                setIsDeleteOpen(true);
              }}
            >
              <DeleteIcon sx={{ opacity: "0.7" }} />
            </div>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerHeader;
