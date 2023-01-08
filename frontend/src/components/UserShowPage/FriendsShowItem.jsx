import { capitalize } from "@mui/material";
import React from "react";
import logo from "../../assets/logo.png";
import randomColor from "../../utils/logocolor";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BootstrapTooltip from "./BootstrapTooltip";


const FriendsShowItem = ({ friend }) => {
  return (
    <>
      <div className="options-divider" id="user-divider"></div>
      <li className="friend-show-li">
        <div className="friend-item-left">
          <div className="user-squircle" id={randomColor(friend.id)}>
            <img src={logo} alt="logo" className="user-logo" />
          </div>
          <div className="li-user-details">
            <p className="user-text">{friend.username}</p>
            <p className="user-status">{capitalize(friend.status)}</p>
          </div>
        </div>
        <div className="friend-item-right">
          <BootstrapTooltip
            title="Message"
            arrow
            placement="top"
            disableInteractive
          >
            <div className="user-squircle user-item-option">
              <ChatBubbleIcon sx={{ fontSize: "18px", color: "#DCDDDE" }} />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip
            title="More"
            arrow
            placement="top"
            disableInteractive
          >
            <div className="user-squircle user-item-option">
              <MoreVertIcon sx={{ fontSize: "18px", color: "#DCDDDE" }} />
            </div>
          </BootstrapTooltip>
        </div>
      </li>
    </>
  );
};

export default FriendsShowItem;
