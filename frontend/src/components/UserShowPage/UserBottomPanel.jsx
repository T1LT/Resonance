import React, { useEffect, useState } from "react";
import randomColor from "../../utils/logocolor";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff";
import HeadsetIcon from "@mui/icons-material/Headset";
import SettingsIcon from "@mui/icons-material/Settings";

const UserBottomPanel = () => {
  const sessionUser = useSelector((store) => store.session.user);
  const [micToggle, setMicToggle] = useState(true);
  const [deafenToggle, setDeafenToggle] = useState(true);
  if (
    !sessionUser ||
    location.pathname === "/error" ||
    location.pathname === "/"
  ) {
    return null;
  } else {
    return (
      <div className="user-info-bottom">
        <div className="user-button">
          <div className="user-squircle" id={randomColor(sessionUser.id)}>
            <img src={logo} alt="logo" className="user-logo" />
          </div>
          <div className="user-info-details">
            <h4 className="username">{sessionUser.username}</h4>
            <p className="usertag">#{sessionUser.tag}</p>
          </div>
        </div>
        <div className="settings">
          {micToggle ? (
            <MicIcon
              fontSize="small"
              className="settings-icon"
              onClick={() => setMicToggle(false)}
            />
          ) : (
            <MicOffIcon
              fontSize="small"
              className="settings-icon"
              sx={{ transform: "scaleX(-1)" }}
              onClick={() => setMicToggle(true)}
            />
          )}
          {deafenToggle ? (
            <HeadsetIcon
              fontSize="small"
              className="settings-icon"
              onClick={() => {
                setDeafenToggle((prev) => !prev);
                setMicToggle(false);
              }}
            />
          ) : (
            <HeadsetOffIcon
              fontSize="small"
              className="settings-icon"
              sx={{ transform: "scaleX(-1)" }}
              onClick={() => {
                setDeafenToggle((prev) => !prev);
                setMicToggle(true);
              }}
            />
          )}
          <SettingsIcon fontSize="small" className="settings-icon" />
        </div>
      </div>
    );
  }
};

export default UserBottomPanel;
