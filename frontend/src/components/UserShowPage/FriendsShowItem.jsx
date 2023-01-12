import { capitalize } from "@mui/material";
import React from "react";
import logo from "../../assets/logo.png";
import randomColor from "../../utils/logocolor";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BootstrapTooltip from "./BootstrapTooltip";
import YesIcon from "@mui/icons-material/Check";
import NoIcon from "@mui/icons-material/Close";
import { deleteFriendship, updateFriendship } from "../../store/friendship";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const FriendsShowItem = ({ friendTab, friendObj, friendships }) => {
  const history = useHistory();
  const friend = friendObj.friend;
  const friendshipReceiver = !!friendObj.friend.user2Id;
  const [hovered, setHovered] = useState(false);
  const [acceptHovered, setAcceptHovered] = useState(false);
  const [ignoreHovered, setIgnoreHovered] = useState(false);

  const handleAcceptInvite = (e) => {
    e.preventDefault();
    const friendship = friendships.find(
      (el) => el.id === friendObj.friendshipId
    );
    const friendshipData = { ...friendship, status: "friends" };
    updateFriendship(friendshipData);
  };

  const handleIgnoreInvite = (e) => {
    e.preventDefault();
    deleteFriendship(friendObj.friendshipId);
  };

  return (
    <>
      <div className="options-divider" id="user-divider"></div>
      <li
        className="friend-show-li"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="friend-item-left">
          <div className="user-squircle" id={randomColor(friend.id)}>
            <img src={logo} alt="logo" className="user-logo" />
          </div>
          <div className="li-user-details">
            <p className="user-text">
              {friend.username}
              <span
                className="hidden-user-tag"
                id={hovered ? "show-element" : undefined}
              >
                #{friend.tag}
              </span>
            </p>
            {friendTab === "pending" ? (
              <>
                {friendshipReceiver ? (
                  <p className="user-status">Incoming Friend Request</p>
                ) : (
                  <p className="user-status">Outgoing Friend Request</p>
                )}
              </>
            ) : (
              <p className="user-status">{capitalize(friend.status)}</p>
            )}
          </div>
        </div>
        <div className="friend-item-right">
          {friendTab === "pending" ? (
            <>
              {friendshipReceiver && (
                <>
                  <BootstrapTooltip
                    title="Accept"
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <div
                      className="user-squircle user-item-option"
                      onClick={handleAcceptInvite}
                      onMouseEnter={() => setAcceptHovered(true)}
                      onMouseLeave={() => setAcceptHovered(false)}
                    >
                      <YesIcon
                        sx={{ fontSize: "18px" }}
                        className={
                          acceptHovered ? "accept-icon-hover" : "accept-icon"
                        }
                      />
                    </div>
                  </BootstrapTooltip>
                  <BootstrapTooltip
                    title="Ignore"
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <div
                      className="user-squircle user-item-option"
                      onClick={handleIgnoreInvite}
                      onMouseEnter={() => setIgnoreHovered(true)}
                      onMouseLeave={() => setIgnoreHovered(false)}
                    >
                      <NoIcon
                        sx={{ fontSize: "18px" }}
                        className={
                          ignoreHovered ? "ignore-icon-hover" : "ignore-icon"
                        }
                      />
                    </div>
                  </BootstrapTooltip>
                </>
              )}
            </>
          ) : (
            <>
              {friendTab !== "blocked" && (
                <BootstrapTooltip
                  title="Message"
                  arrow
                  placement="top"
                  disableInteractive
                >
                  <div
                    className="user-squircle user-item-option"
                    onClick={() =>
                      history.push(`/me/channels/${friendObj.dmChannelId}`)
                    }
                  >
                    <ChatBubbleIcon
                      sx={{ fontSize: "18px", color: "#DCDDDE" }}
                    />
                  </div>
                </BootstrapTooltip>
              )}
            </>
          )}
        </div>
      </li>
    </>
  );
};

export default FriendsShowItem;
