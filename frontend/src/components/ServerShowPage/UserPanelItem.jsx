import React, { useState } from "react";
import logo from "../../assets/logo.png";
import randomColor from "../../utils/logocolor";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import YesIcon from "@mui/icons-material/Check";
import NoIcon from "@mui/icons-material/Close";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  createFriendship,
  deleteFriendship,
  updateFriendship,
} from "../../store/friendship";
import BootstrapTooltip from "../UserShowPage/BootstrapTooltip";

const UserPanelItem = ({ user, friendIds, friendships, blockedIds }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [confirmType, setConfirmType] = useState("");
  const { serverId, channelId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const sessionUser = useSelector((store) => store.session.user);
  const friendship = friendships.find(el => el.friend.id === user.id);

  const handleYes = (e) => {
    e.stopPropagation();
    if (confirmType === "remove" || confirmType === "unblock") {
      const friendshipId = friendships.find(
        (el) => el.friend.id === user.id
      ).id;
      deleteFriendship(friendshipId);
      setConfirmation(false);
    } else {
      if (friendIds.includes(user.id)) {
        const friendship = friendships.find((el) => el.friend.id === user.id);
        const friendshipData = { ...friendship, status: "blocked" };
        updateFriendship(friendshipData)
        setConfirmation(false);
      } else {
        const friendshipData = {
          user1_id: sessionUser.id,
          user2_id: user.id,
          status: "blocked",
        };
        createFriendship(friendshipData)
        setConfirmation(false);
      }
    }
  };

  const handleAddFriend = () => {
    e.stopPropagation();
    const friendshipData = { user1_id: sessionUser.id, user2_id: user.id };
    createFriendship(friendshipData);
  };

  const isBlocked = () => {
    if (blockedIds.includes(user.id)) return true;
    else return false;
  };

  if (!sessionUser) return null;
  return (
    <li
      key={user.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (!serverId && user.id !== sessionUser.id) {
          history.push(`/me/channels/${friendship.dmChannelId}`);
        }
      }}
    >
      <div className="user-panel-item-container">
        <div className="user-panel-item-left">
          <div className="user-squircle" id={randomColor(user.id)}>
            <img src={logo} alt="logo" className="user-logo" />
          </div>
          <p className="user-text">{user.username}</p>
        </div>
        {user.id !== sessionUser.id && hovered && (
          <div className="user-panel-item-right">
            {confirmation ? (
              <>
                <BootstrapTooltip
                  title="Confirm"
                  arrow
                  placement="top"
                  disableInteractive
                >
                  <YesIcon fontSize="small" onClick={handleYes} />
                </BootstrapTooltip>
                <BootstrapTooltip
                  title="Cancel"
                  arrow
                  placement="top"
                  disableInteractive
                >
                  <NoIcon
                    fontSize="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmation(false);
                    }}
                  />
                </BootstrapTooltip>
              </>
            ) : (
              <>
                {location.pathname === "/me" || friendIds.includes(user.id) ? (
                  <BootstrapTooltip
                    title="Remove Friend"
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <PersonRemoveAlt1Icon
                      fontSize="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmType("remove");
                        setConfirmation(true);
                      }}
                    />
                  </BootstrapTooltip>
                ) : (
                  <BootstrapTooltip
                    title="Add Friend"
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <PersonAddAlt1Icon
                      fontSize="small"
                      onClick={handleAddFriend}
                    />
                  </BootstrapTooltip>
                )}
                {isBlocked() ? (
                  <BootstrapTooltip
                    title="Unblock User"
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <CheckCircleOutlineIcon
                      sx={{ fontSize: "16px", mt: "2px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmType("unblock");
                        setConfirmation(true);
                      }}
                    />
                  </BootstrapTooltip>
                ) : (
                  <BootstrapTooltip
                    title="Block User"
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <BlockIcon
                      sx={{ fontSize: "16px", mt: "2px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmType("block");
                        setConfirmation(true);
                      }}
                    />
                  </BootstrapTooltip>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default UserPanelItem;
