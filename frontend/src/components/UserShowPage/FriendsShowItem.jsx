import { capitalize } from "@mui/material";
import React from "react";
import logo from "../../assets/logo.png";
import randomColor from "../../utils/logocolor";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BootstrapTooltip from "./BootstrapTooltip";
import YesIcon from "@mui/icons-material/Check";
import NoIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { deleteFriendship, updateFriendship } from "../../store/friendship";

const FriendsShowItem = ({ friendTab, friendObj, friendships }) => {
  const friend = friendObj.friend;
  const dispatch = useDispatch();
  const friendshipReceiver = !!friendObj.friend.user2Id;

  const handleAcceptInvite = (e) => {
    e.preventDefault();
    const friendship = friendships.find(el => el.id === friendObj.friendshipId);
    console.log(friendships);
    const friendshipData = { ...friendship, status: "friends" };
    dispatch(updateFriendship(friendshipData));
  };

  const handleIgnoreInvite = (e) => {
    e.preventDefault();
    dispatch(deleteFriendship(friendObj.friendshipId));
  };

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
                    >
                      <YesIcon
                        sx={{ fontSize: "18px", color: "#DCDDDE" }}
                        className="accept-icon"
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
                    >
                      <NoIcon
                        sx={{ fontSize: "18px", color: "#DCDDDE" }}
                        className="ignore-icon"
                      />
                    </div>
                  </BootstrapTooltip>
                </>
              )}
            </>
          ) : (
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
          )}
        </div>
      </li>
    </>
  );
};

export default FriendsShowItem;
